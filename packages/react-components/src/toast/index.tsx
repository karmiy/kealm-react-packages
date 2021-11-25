import React from 'react';
import { useDidMount, useDidUpdate, useWillUnMount, useTimeoutFn } from '@kealm/react-hooks';
import { ToastProps } from './types';
import { classnames } from '../_utils/base';
import { openPop, CreatePopConfig } from '../_utils/popup';
import Pop from '../pop';
import { LOADING_ICON, SUCCESS_ICON, WARNING_ICON } from '../_images/base64';

const ICONS = {
    loading: LOADING_ICON,
    success: SUCCESS_ICON,
    warning: WARNING_ICON,
};

interface Toast extends React.FC<ToastProps> {
    open: typeof open;
    loading: typeof loading;
    success: typeof success;
    warning: typeof warning;
}

const Toast: Toast = props => {
    const {
        className,
        style,
        visible,
        onVisibleChange,
        type,
        isActionable = true,
        autoClose = !type,
        duration = 3000,
        children,
        ...restProps
    } = props;

    const { setTimer, clearTimer } = useTimeoutFn();

    const runAutoClose = () => {
        if (!visible) return;
        if (!autoClose) return;

        setTimer('my-toast', () => onVisibleChange?.(false), duration);
        setTimeout(() => onVisibleChange?.(false), duration);
    };

    useDidMount(() => runAutoClose());
    useDidUpdate(() => runAutoClose(), [visible]);
    useWillUnMount(() => clearTimer('my-toast'));

    const renderIcon = () => {
        if (!type) return null;

        return (
            <div className={classnames('my-toast__icon', `is-${type}`)}>
                <img src={ICONS[type]} />
            </div>
        );
    };

    return (
        <Pop
            className={classnames('my-toast__root', {
                'is-actionable': isActionable,
            })}
            visible={visible}
            onVisibleChange={onVisibleChange}
            showMask={false}
            lockScrollEnabled={!isActionable}
            {...restProps}
        >
            <div
                className={classnames('my-toast', { 'is-visual': !!type }, className)}
                style={style}
            >
                {renderIcon()}
                <div className='my-toast__content'>{children}</div>
            </div>
        </Pop>
    );
};

function open(config: CreatePopConfig<ToastProps>) {
    return openPop(config, Toast);
}

Toast.open = open;

export function loading(config: CreatePopConfig<ToastProps>) {
    return openPop({ ...config, type: 'loading' }, Toast);
}

Toast.loading = loading;

export function success(config: CreatePopConfig<ToastProps>) {
    return openPop({ ...config, type: 'success' }, Toast);
}

Toast.success = success;

export function warning(config: CreatePopConfig<ToastProps>) {
    return openPop({ ...config, type: 'warning' }, Toast);
}

Toast.warning = warning;

export default Toast;

export * from './types';
