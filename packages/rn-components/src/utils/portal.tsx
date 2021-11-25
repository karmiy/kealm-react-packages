import React, {
    createContext,
    useState,
    useRef,
    useCallback,
    useMemo,
    useContext,
    useLayoutEffect,
} from 'react';
import { GestureResponderEvent } from 'react-native';
import { useWillUnMount } from '@kealm/react-hooks';
import { isEmpty, noop } from './base';

// 作用：将组件提取至指定根组件之下
// 起源：由于 RN 没有 fixed 定位，在深层子组件中使用 View 编写的 Modal 类弹层组件，在宽高上会被父元素局限，无法全屏
// 解决了：将组件提取到根组件下 render，保证弹层组件的 absolute 定位可以全屏展示

interface RegisterKey {
    (): number;
}

interface RenderPortal {
    <P>(
        key: number,
        Comp: React.ComponentType<P>,
        props?: P & { children?: React.ReactNode },
    ): Function;
}

type ExtractedItem<P = {}> = {
    Component: React.ComponentType<P>;
    props?: P & { children?: React.ReactNode };
};

/* Context */
export const PortalContext = createContext<{
    registerKey?: RegisterKey;
    renderPortal?: RenderPortal;
}>({});

/* ------------------------------ BLOCK: Portal 全局功能函数 ------------------------------ */
export const PortalUtils: Array<{
    registerKey?: RegisterKey;
    renderPortal?: RenderPortal;
}> = [];

/* 获取当前页面 portal 项 */
const getCurrentPortalUtilsStack = () => {
    const len = PortalUtils.length;
    return len ? PortalUtils[len - 1] : undefined;
};

/* ------------------------------ BLOCK: Portal 容器组件，放在最外层包装整个页面 ------------------------------ */
export const PortalWrapper: React.FC = ({ children }) => {
    const keyRef = useRef(0);
    const [items, setItems] = useState<{
        [key: number]: ExtractedItem;
    }>([]);

    // 注意：
    // 未来如果 context 传递的 value 新增了参数（目前是 registerKey、renderPortal），请保证传入的属性值引用始终不变
    // 原因：
    // 如果保证属性值引用始终不变，由于下方会使用 useMemo 包装 contextValue，即可保证 contextValue 引用不变
    // contextValue 引用不变的话，即使本组件 portalWrapper 在弹层更新后重新 render，children 也不会重新 render 导致无用渲染

    /* 注册每个组件的 key 值 */
    const registerKey = useCallback(() => {
        return keyRef.current++;
    }, []);

    /* 挂载与卸载需要提取的组件 */
    const renderPortal: <P>(
        key: number,
        Component: React.ComponentType<P>,
        props?: P & { children?: React.ReactNode },
    ) => Function = useCallback((key, Component, props) => {
        setItems(prev => {
            return {
                ...prev,
                [key]: {
                    Component,
                    props,
                },
            } as typeof prev;
        });

        // 返回一个解绑函数
        return () => {
            setItems(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        };
    }, []);

    /* 全局缓存，由于 2 个方法引用不变，只会执行一次 */
    useMemo(() => {
        PortalUtils.push({
            registerKey,
            renderPortal,
        });
    }, [registerKey, renderPortal]);

    /* 组件卸载时需移除 */
    useWillUnMount(() => {
        const removeIndex = PortalUtils.findIndex(item => item.registerKey === registerKey);
        PortalUtils.splice(removeIndex, 1);
    });

    /* 渲染全部被提取的组件 */
    const renderItems = useMemo(() => {
        return Object.keys(items).map(key => {
            const { Component, props } = items[+key];

            return <Component key={key} {...props} />;
        });
    }, [items]);

    /* 传递的 context，用 useMemo 包装的原因在于，这 2 个方法引用都是不变的，这样可以保证传递给子组件的 context value 引用不变，使得 children 不做无用 render */
    const contextValue = useMemo(
        () => ({
            registerKey,
            renderPortal,
        }),
        [registerKey, renderPortal],
    );

    return (
        <PortalContext.Provider value={contextValue}>
            {/* <Text
                style={{
                    position: 'absolute',
                    left: 50,
                    top: 100,
                }}
            >
                {renderItems.length}
            </Text> */}
            {/* children 不需要 memo 包起，在 H5 测验，render 时如果没有传递会变的数据给子组件，不会导致 children 重新 render */}
            {children}
            {renderItems}
        </PortalContext.Provider>
    );
};

/* ------------------------------ BLOCK: Portal 构造函数，将一个组件进行包装后返回新组件，使组件的渲染提取至 PortalWrapper ------------------------------ */
export function createPortal<P>(Component: React.ComponentType<P>): React.FC<P> {
    return (props: P & { children?: React.ReactNode }) => {
        const { registerKey, renderPortal } = useContext(PortalContext);

        const key = useMemo(() => registerKey?.(), [registerKey]);
        useLayoutEffect(() => {
            if (isEmpty(key)) return;

            const unbind = renderPortal?.(key, Component, props);

            return () => unbind?.();
        }, [renderPortal, key, props]);

        return null;
    };
}

/* ------------------------------ BLOCK: 函数式打开 pop ------------------------------ */
export interface AbstractPopProps {
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    // onClose?: () => void;
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
    onMaskClick?: (e: GestureResponderEvent) => void;
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
    const { content, onVisibleChange, afterClose, ...others } = config;

    let children = content,
        onVisibleChangeEvent = onVisibleChange,
        afterCloseEvent = afterClose,
        unbind: Function | undefined,
        isUnMount = false; // 是否已卸载

    let currentProps: T = {
        ...others,
        visible: true,
        onVisibleChange: visibleChange,
    } as any as T;

    const portalUtilsStack = getCurrentPortalUtilsStack();

    const popKey = portalUtilsStack?.registerKey?.();

    function destroy() {
        afterCloseEvent?.();
        unbind?.();
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
        if (isEmpty(popKey)) return;

        unbind = portalUtilsStack?.renderPortal?.(popKey, Comp, {
            ...props,
            children: contentChildren,
        });
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
            onMaskClick(e: GestureResponderEvent) {
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
            onMaskClick(e: GestureResponderEvent) {
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
