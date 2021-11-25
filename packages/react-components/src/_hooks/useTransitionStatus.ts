import { useState, useCallback } from 'react';

interface Options {
    onEnter?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExited?: () => void;
}

export function useTransitionStatus(options: Options) {
    const [isTransitioning, setIsTransitioning] = useState(false); // 是否正在动画中
    const {
        onEnter: _onEnter,
        onEntered: _onEntered,
        onExit: _onExit,
        onExited: _onExited,
    } = options;

    const onEnter = useCallback(() => {
        setIsTransitioning(true);
        _onEnter?.();
    }, [_onEnter]);

    const onEntered = useCallback(() => {
        setIsTransitioning(false);
        _onEntered?.();
    }, [_onEntered]);

    const onExit = useCallback(() => {
        setIsTransitioning(true);
        _onExit?.();
    }, [_onExit]);

    const onExited = useCallback(() => {
        setIsTransitioning(false);

        _onExited?.();
    }, [_onExited]);

    return {
        transitionEvents: {
            onEnter,
            onEntered,
            onExit,
            onExited,
        },
        isTransitioning,
    };
}
