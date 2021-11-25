import { useLayoutEffect, useMemo } from 'react';
import { useGetSet } from '../useGetSet';
import { EventEmitter } from '../utils/event';
import { ResolvableHookState, resolveHookState } from '../utils//resolveHookState';

const eventEmitter = new EventEmitter();

type ResolvableState<S> = ResolvableHookState<S>;
interface RawDispatch {
    (actionName: string, ...params: any[]): any;
}
interface ActionContext<S> {
    state: S;
    commit: (nextState: ResolvableState<S>) => void;
    dispatch: RawDispatch;
}

interface RawAction<S, P> {
    (context: ActionContext<S>, payload: P): any;
}

type RawActions<S, P = any> = Record<string, RawAction<S, P>>;

type PayloadFormatter<T> = T extends (payload: unknown) => void ? () => ReturnType<T> : T;

type Actions<S, RAS> = {
    [actionName in keyof RAS]: PayloadFormatter<
        RAS[actionName] extends (context: ActionContext<S>, ...payload: infer P) => void
            ? (...payload: P) => ReturnType<RAS[actionName]>
            : never
    >;
};

type PickPayload<S, A> = A extends (context: ActionContext<S>, payload: infer P) => void
    ? P
    : never;

type ActionWithoutContext<S, A> = A extends (context: ActionContext<S>, ...payload: infer P) => void
    ? PayloadFormatter<(...payload: P) => ReturnType<A>>
    : never;

export const createStore = <S, RAS extends RawActions<S>>(
    moduleName: string,
    initState: S,
    rawActions: RAS,
) => {
    const getState = (): S => {
        const states = eventEmitter.getPayload(moduleName);

        return states?.[0] ?? initState;
    };

    type Dispatch = <ActionName extends keyof RAS>(
        actionName: ActionName,
        ...params: Parameters<ActionWithoutContext<S, RAS[ActionName]>>
    ) => ReturnType<RAS[ActionName]>;

    const dispatch = ((actionName, payload) => {
        const action = rawActions[actionName];

        return action?.(
            {
                commit: nextState =>
                    eventEmitter.emit(moduleName, resolveHookState(nextState, getState())),
                state: getState(),
                dispatch: dispatch as RawDispatch,
            },
            payload,
        );
    }) as any as Dispatch;

    const useStore = () => {
        const [get, set] = useGetSet<S>(initState);
        const state = get();

        const actions = useMemo(() => {
            return Object.keys(rawActions).reduce((bus, actionName) => {
                const key = actionName as keyof RAS;
                const action = rawActions[key];
                bus[key] = ((payload: PickPayload<S, typeof action>) => {
                    return action(
                        {
                            commit: nextState =>
                                eventEmitter.emit(
                                    moduleName,
                                    resolveHookState(nextState, getState()),
                                ),
                            state: getState(),
                            dispatch: dispatch as RawDispatch,
                        },
                        payload,
                    );
                }) as Actions<S, RAS>[keyof RAS];
                return bus;
            }, {} as Actions<S, RAS>);
        }, []);

        useLayoutEffect(() => {
            eventEmitter.on(moduleName, set);

            return () => eventEmitter.off(moduleName, set);
        }, [set]);

        return { state, actions };
    };

    return [
        useStore,
        {
            getState,
            dispatch,
        },
    ] as const;
};
