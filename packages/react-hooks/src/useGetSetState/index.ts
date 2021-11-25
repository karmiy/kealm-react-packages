import { useCallback } from 'react';
import { useGetSet } from '../useGetSet';
import { InitialHookState } from '../utils/resolveHookState';

function useGetSetState<S extends object>(): [
    () => S | undefined,
    (
        patch: Partial<S> | undefined | ((prevState: S | undefined) => Partial<S> | undefined),
    ) => void,
];
function useGetSetState<S extends object>(
    initialState: InitialHookState<S>,
): [() => S, (patch: Partial<S> | ((prevState: S) => Partial<S>)) => void];
function useGetSetState<S extends object>(initialState?: InitialHookState<S>) {
    const [get, set] = useGetSet(initialState);

    const setState = useCallback(
        (patch: Partial<S> | ((prevState: S) => Partial<S>)) => {
            set(prevState => {
                const patchState = typeof patch === 'function' ? patch(prevState as S) : patch;

                if (!patchState) return patchState;

                return {
                    ...prevState,
                    ...patchState,
                } as S;
            });
        },
        [set],
    );

    return [get, setState] as const;
}

export { useGetSetState };
