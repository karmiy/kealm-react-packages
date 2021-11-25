import React from 'react';
import ReactDOM from 'react-dom';
import { noop } from './base';

export interface AbstractPopProps {
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    afterClose?: () => void;
}

export type CreatePopConfig<T> = Omit<T, 'visible'> & {
    content: React.ReactNode;
};

export type CreatePopUpdateConfig<T> = Omit<T, 'visible'> & {
    content?: React.ReactNode; // 更新时 content 可选
};

export type WithPrompt<T> = T & {
    onOk?: () => void;
    onCancel?: () => void;
    maskClosable?: boolean;
    onMaskClick?: (e: React.MouseEvent) => void;
};

/**
 * @description 函数式开启 Pop
 * @param config
 * @param Comp
 */
export function openPop<T extends AbstractPopProps>(
    config: CreatePopConfig<T>,
    Comp: React.ComponentType<T>,
) {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const { content, onVisibleChange, afterClose, ...others } = config;

    let children = content,
        onVisibleChangeEvent = onVisibleChange,
        afterCloseEvent = afterClose,
        isUnMount = false; // 是否已卸载;

    let currentProps: T = { ...others, visible: true, onVisibleChange: visibleChange } as any as T;

    function destroy() {
        afterCloseEvent?.();
        const unmountResult = ReactDOM.unmountComponentAtNode(div);

        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
            1;
        }
    }

    function close() {
        if (isUnMount) return;
        isUnMount = true;

        currentProps = {
            ...currentProps,
            visible: false,
            afterClose: destroy,
        };

        render(currentProps, children);
    }

    function visibleChange(v: boolean) {
        onVisibleChangeEvent?.(v);

        !v && close();
    }

    function update(newConfig: CreatePopUpdateConfig<T>) {
        if (isUnMount) return;

        const {
            content: _content,
            onVisibleChange: _onVisibleChange,
            afterClose: _afterClose,
            ..._others
        } = newConfig;

        currentProps = {
            ...currentProps,
            ..._others,
        };

        children = _content ?? children;
        onVisibleChangeEvent = _onVisibleChange ?? onVisibleChangeEvent;
        afterCloseEvent = _afterClose ?? afterCloseEvent;

        render(currentProps, children);
    }

    function render(props: T, contentChildren: React.ReactNode) {
        ReactDOM.render(<Comp {...props}>{contentChildren}</Comp>, div);
    }

    render(currentProps, children);

    return {
        destroy: close,
        update,
    };
}

export function openPopWithPromisify<T extends AbstractPopProps>(
    config: WithPrompt<CreatePopConfig<T>>,
    Comp: React.ComponentType<T>,
) {
    const { onOk, onCancel, maskClosable = true, onMaskClick } = config;
    let next: (result: boolean) => void = noop;
    const promisify = () => {
        return new Promise<boolean>(resolve => {
            next = resolve;
        });
    };
    const popUtils = openPop(
        {
            ...config,
            onOk() {
                onOk?.();
                next(true);
            },
            onCancel() {
                onCancel?.();
                next(false);
            },
            onMaskClick(e: React.MouseEvent) {
                onMaskClick?.(e);
                maskClosable && next(false);
            },
        },
        Comp,
    );

    const update = (newConfig: WithPrompt<CreatePopUpdateConfig<T>>) => {
        const {
            onOk: _onOk,
            onCancel: _onCancel,
            maskClosable: _maskClosable = true,
            onMaskClick: _onMaskClick,
        } = newConfig;

        return popUtils.update({
            ...newConfig,
            onOk() {
                _onOk?.();
                next(true);
            },
            onCancel() {
                _onCancel?.();
                next(false);
            },
            onMaskClick(e: React.MouseEvent) {
                _onMaskClick?.(e);
                _maskClosable && next(false);
            },
        });
    };

    return {
        ...popUtils,
        update,
        promisify,
    };
}
