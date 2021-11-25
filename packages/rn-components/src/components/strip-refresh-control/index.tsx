import React, { useRef, useState } from 'react';
import { useDidUpdate, usePrevious, useWillUnMount } from '@kealm/react-hooks';
import NativeRefreshControl from './native-refresh-control';
import { StripRefreshControlProps } from './types';

export const StripRefreshControl: React.FC<StripRefreshControlProps> = props => {
    const { enabled = true, refreshing } = props;
    const lastRefreshEndTimeRef = useRef(0); // 最后一次切换为 enable: false 的时间
    const disableTimerRef = useRef<number>();

    const [controlEnabled, setControlEnabled] = useState(enabled);
    const prevEnable = usePrevious(enabled);
    const prevRefreshing = usePrevious(refreshing);

    useDidUpdate(() => {
        if (prevRefreshing && !refreshing) {
            lastRefreshEndTimeRef.current = Date.now();
        }

        if (prevEnable !== enabled) {
            if (prevEnable && !enabled) {
                // 原本可用，现在不可用
                // 不可以直接禁用下拉刷新，需要预留时间给系统关闭下拉刷新动画，否则 iOS 会出现渲染 bug
                const deltaTime = Date.now() - lastRefreshEndTimeRef.current;
                disableTimerRef.current = setTimeout(() => {
                    disableTimerRef.current = 0;

                    if (controlEnabled !== enabled) setControlEnabled(enabled);
                }, Math.max(500 - deltaTime, 0)) as any as number;
            } else if (!prevEnable && enabled) {
                // 原本不可用，现在可用
                if (disableTimerRef.current) {
                    clearTimeout(disableTimerRef.current);
                    disableTimerRef.current = 0;
                }
                setControlEnabled(enabled);
            }
        }
    }, [refreshing, enabled]);

    useWillUnMount(() => {
        if (disableTimerRef.current) clearTimeout(disableTimerRef.current);
    });

    return <NativeRefreshControl {...props} enabled={controlEnabled} />;
};

export * from './types';
