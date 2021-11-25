import { useState, useCallback } from 'react';
import { InitialHookState, resolveHookState } from '../utils/resolveHookState';

function useSetState<S extends object>(): [
    S | undefined,
    (
        patch: Partial<S> | undefined | ((prevState: S | undefined) => Partial<S> | undefined),
    ) => void,
];
function useSetState<S extends object>(
    initialState: InitialHookState<S>,
): [S, (patch: Partial<S> | ((prevState: S) => Partial<S>)) => void];
function useSetState<S extends object>(initialState?: InitialHookState<S>) {
    const [state, set] = useState(() => resolveHookState(initialState));

    const setState = useCallback((patch: Partial<S> | ((prevState: S) => Partial<S>)) => {
        set(prevState => {
            const patchState = typeof patch === 'function' ? patch(prevState as S) : patch;

            if (!patchState) return patchState;

            return {
                ...prevState,
                ...patchState,
            } as S;
        });
    }, []);

    return [state, setState] as const;
}

export { useSetState };
