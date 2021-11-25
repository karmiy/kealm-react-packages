import React, { useContext, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, Animated, Image, Easing } from 'react-native';
import { useDidMount, useDidUpdate, useWillUnMount, useTimeoutFn } from '@kealm/react-hooks';
import { useStyles } from '../../hooks';
import { isWebEnv } from '../../utils/utils';
import { isString } from '../../utils/base';
import { createPortal, openPop, CreatePopConfig } from '../../utils/portal';
import { Text } from '../text';
import { BasicPop } from '../pop';
import { ToastProps } from './types';
import { withToastStyles } from './style';
import { ToastStylesContext } from './context';

const BasicToast: React.FC<ToastProps> = props => {
    const {
        styles: _styles,
        popStyles,
        visible,
        onVisibleChange,
        type,
        isActionable = true,
        autoClose = !type,
        duration = 3000,
        onOpen,
        afterClose,
        children,
        ...restProps
    } = props;

    const contextStyles = useContext(ToastStylesContext);
    const styles = useStyles(withToastStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 自动销毁 ------------------------------ */
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

    /* ------------------------------ BLOCK: loading 图标 ------------------------------ */
    /* loading 无限旋转动画 */
    const loadingAnim = useRef(new Animated.Value(0)).current;
    // const loopAnimRef = useRef<Animated.CompositeAnimation>();

    const startLoading = useCallback(() => {
        loadingAnim.setValue(0); // 每次需要重新 setValue 0，否则动画会越来越慢
        const animate = Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.linear,
            useNativeDriver: !isWebEnv,
        });
        Animated.loop(animate).start();
    }, [loadingAnim]);

    const stopLoading = useCallback(() => {
        loadingAnim.stopAnimation();
    }, [loadingAnim]);

    useEffect(() => {
        if (type !== 'loading') return;

        // 创建动画
        startLoading();
        // loopAnimRef.current = Animated.loop(animate);
        // loopAnimRef.current.start();

        // return () => loopAnimRef.current?.stop();
        return stopLoading;
    }, [startLoading, stopLoading, type]);

    const onToastOpen = useCallback(() => {
        startLoading();
        onOpen?.();
    }, [startLoading, onOpen]);

    const afterToastClose = useCallback(() => {
        stopLoading();
        afterClose?.();
    }, [stopLoading, afterClose]);

    /* loading 图标 */
    const renderLoadingIcon = useMemo(() => {
        if (type !== 'loading') return null;

        return (
            <Animated.Image
                style={[
                    styles.icon,
                    {
                        transform: [
                            {
                                rotate: loadingAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: ['0deg', '360deg'],
                                }),
                            },
                        ],
                    },
                ]}
                source={require('../../images/loading.png')}
            />
        );
    }, [type, styles, loadingAnim]);

    /* ------------------------------ BLOCK: 其他图标 ------------------------------ */
    /* success 图标 */
    const renderSuccessIcon = useMemo(() => {
        if (type !== 'success') return null;

        return <Image style={styles.icon} source={require('../../images/success.png')} />;
    }, [type, styles]);

    /* warning 图标 */
    const renderWarningIcon = useMemo(() => {
        if (type !== 'warning') return null;

        return <Image style={styles.icon} source={require('../../images/warning.png')} />;
    }, [type, styles]);

    const renderIcon = useMemo(() => {
        return (
            <>
                {renderLoadingIcon}
                {renderSuccessIcon}
                {renderWarningIcon}
            </>
        );
    }, [renderLoadingIcon, renderSuccessIcon, renderWarningIcon]);

    /* ------------------------------ BLOCK: 内容 ------------------------------ */
    const renderContent = useMemo(() => {
        return (
            <View style={type ? styles.contentWithIcon : null}>
                {isString(children) ? (
                    <Text style={[styles.text, type ? styles.textWithIcon : null]}>{children}</Text>
                ) : (
                    children
                )}
            </View>
        );
    }, [children, styles, type]);

    /* ------------------------------ BLOCK: 吐司内容 ------------------------------ */
    const renderWrapper = useCallback(
        ({ animate }: { animate: Animated.Value }) => {
            return (
                <Animated.View
                    style={[
                        styles.wrapper,
                        type ? styles.wrapperWithIcon : null,
                        {
                            opacity: animate,
                        },
                    ]}
                >
                    {renderIcon}
                    {renderContent}
                </Animated.View>
            );
        },
        [styles, type, renderIcon, renderContent],
    );

    return (
        <BasicPop
            styles={popStyles}
            pointerEvents={isActionable ? 'box-none' : 'auto'}
            visible={visible}
            onVisibleChange={onVisibleChange}
            showMask={false}
            isCenter
            onOpen={onToastOpen}
            afterClose={afterToastClose}
            {...restProps}
        >
            {renderWrapper}
        </BasicPop>
    );
};

/* 函数式调用 */
const api = {
    open(config: CreatePopConfig<ToastProps>) {
        return openPop(config, BasicToast);
    },
    loading(config: CreatePopConfig<ToastProps>) {
        return openPop({ ...config, type: 'loading' }, BasicToast);
    },
    success(config: CreatePopConfig<ToastProps>) {
        return openPop({ ...config, type: 'success' }, BasicToast);
    },
    warning(config: CreatePopConfig<ToastProps>) {
        return openPop({ ...config, type: 'warning' }, BasicToast);
    },
};

export * from './types';
export * from './style';
export * from './context';
export const Toast = Object.assign(createPortal(BasicToast), api);
