import React, { useCallback, useRef } from 'react';
import { RefreshControl, requireNativeComponent } from 'react-native';
import { useDidUpdate, usePrevious, useUpdate } from '@kealm/react-hooks';
import { isIOS } from '../../utils/utils';
import { NativeRefreshControlProps } from './types';

const _requireNativeComponent = requireNativeComponent as (
    viewName: string,
    Component: React.ComponentType<any>,
) => React.ComponentType<any>;

let NativeRefreshControlComp: any = null;

const NativeRefreshControl: React.FC<NativeRefreshControlProps> = props => {
    const { refreshing = false, onRefresh } = props;
    const nativeRef = useRef<{
        setNativeProps(p: Record<string, any>): void;
    }>(null);
    const lastNativeRefreshingRef = useRef(refreshing);

    const prevRefreshing = usePrevious(refreshing);
    const forceUpdate = useUpdate();

    useDidUpdate(() => {
        // RefreshControl is a controlled component so if the native refreshing
        // value doesn't match the current js refreshing prop update it to
        // the js value.
        if (refreshing !== prevRefreshing) {
            lastNativeRefreshingRef.current = refreshing;
        } else if (refreshing !== lastNativeRefreshingRef.current) {
            nativeRef.current?.setNativeProps({ refreshing });
            lastNativeRefreshingRef.current = refreshing;
        }
    }, [refreshing]);

    const handlerRefresh = useCallback(() => {
        lastNativeRefreshingRef.current = true;

        onRefresh?.();

        // The native component will start refreshing so force an update to
        // make sure it stays in sync with the js component.
        forceUpdate();
    }, [onRefresh, forceUpdate]);

    return (
        <NativeRefreshControlComp
            ref={nativeRef}
            {...props}
            refreshing={refreshing}
            onRefresh={handlerRefresh}
        />
    );
};

if (isIOS) {
    NativeRefreshControlComp = _requireNativeComponent('IMYStripRefresher', NativeRefreshControl);
} else {
    NativeRefreshControlComp = _requireNativeComponent('AMYStripRefresher', NativeRefreshControl);
}

export default NativeRefreshControlComp ? NativeRefreshControl : RefreshControl;
