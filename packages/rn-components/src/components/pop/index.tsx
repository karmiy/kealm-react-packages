import React, { useContext, useCallback } from 'react';
import {
    View,
    Animated,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    GestureResponderEvent,
} from 'react-native';
import { useStyles, useStyleTools, useAnimatedVisible } from '../../hooks';
import { isEmpty, isFunction } from '../../utils/base';
import { createPortal } from '../../utils/portal';
import { PopProps } from './types';
import { DEFAULT_DURATION } from './utils';
import { useLazyStatus } from '../../hooks';
import { withPopStyles } from './style';
import { PopStylesContext } from './context';

/* 导出不包装 createPortal，最干净的 Pop */
// 注：基于 Pop 二次封装的组件（如 Toast），在需要为其内置函数式调用 openPop 效果时（如 Toast.loading）
// 请使用该纯净 Pop，不要使用被 createPortal 包装过的
export const BasicPop: React.FC<PopProps> = props => {
    const {
        styles: _styles,
        style,
        children,
        visible = false,
        onVisibleChange,
        showMask = true,
        maskClosable = true,
        onMaskClick,
        renderMask: _renderMask,
        duration = DEFAULT_DURATION,
        onOpen,
        onClose,
        afterOpen,
        afterClose,
        zIndex,
        isCenter = false,
        useKeyboardAvoidingView = false,
        keyboardAvoidingViewProps,
        isLazyMount = true,
        unmountOnExit = false,
        appear = true,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 状态 ------------------------------ */
    const [popVisible, popAnim] = useAnimatedVisible({
        visible,
        duration,
        onOpen,
        onClose,
        afterOpen,
        afterClose,
        appear,
    });
    const lazyStatus = useLazyStatus(popVisible);
    const lazyVisible = isLazyMount ? lazyStatus : true; // 非懒挂载，初始 visible false 也要渲染节点，只是隐藏

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(PopStylesContext);
    const styles = useStyles(withPopStyles, contextStyles, _styles);
    const { utils } = useStyleTools();

    const wrapperStyles = [
        styles.wrapper,
        isCenter ? styles.centerRaw : null,
        !unmountOnExit && !popVisible ? styles.hideRaw : null,
        style,
        !isEmpty(zIndex)
            ? {
                  ...utils.zIndex(zIndex),
              }
            : null,
    ];

    /* ------------------------------ BLOCK: 动画入场和离场 ------------------------------ */
    // 注：listener 必须要和下面 useDidUpdate 的 effect 同步，不能此处 useEffect 下面确实 useLayoutEffect，否则 addListener 里的 visible 不能及时更新

    // const afterOpenLockRef = useRef(false); // 开启动画会出现 2 次 value 1，应该控制只执行一次 afterOpen

    /* useEffect(() => {
        const listenerId = popAnim.addListener(({ value }) => {
            // 关闭时，在动画执行到 value 0 即完全关闭，将 pop 内容隐藏
            value === 0 && !visible && (setPopVisible(false), afterClose?.());

            // 完全打开时执行回调
            if (value === 1 && visible) {
                if (afterOpenLockRef.current) return;

                afterOpen?.();
                afterOpenLockRef.current = true;
                setTimeout(() => {
                    afterOpenLockRef.current = false;
                }, 16);
            }
        });

        return () => popAnim.removeListener(listenerId);
    }, [popAnim, visible, afterClose, afterOpen]); */

    /* ------------------------------ BLOCK: 蒙层 ------------------------------ */
    const maskClick = useCallback(
        (e: GestureResponderEvent) => {
            maskClosable && onVisibleChange?.(false);

            onMaskClick?.(e);
        },
        [maskClosable, onVisibleChange, onMaskClick],
    );

    const renderMask = () => {
        if (!showMask) return null;

        const maskNode = _renderMask ? (
            isFunction(_renderMask) ? (
                _renderMask({ animate: popAnim, style: styles.mask })
            ) : (
                _renderMask
            )
        ) : (
            <Animated.View
                style={[
                    styles.mask,
                    {
                        opacity: popAnim,
                    },
                ]}
            />
        );

        return <TouchableWithoutFeedback onPress={maskClick}>{maskNode}</TouchableWithoutFeedback>;
    };

    /* ------------------------------ BLOCK: children 内容渲染 ------------------------------ */
    const renderChildren = () => {
        return isFunction(children) ? children({ animate: popAnim }) : children;
    };

    // 配置隐藏时卸载 children 节点
    if (!popVisible && unmountOnExit) return null;

    // 配置隐藏时不卸载 children 节点，只有在初始化为不显示状态，才不渲染节点，否则利用样式显示隐藏
    if (!popVisible && !unmountOnExit && !lazyVisible) return null;

    // 是否使用 KeyboardAvoidingView
    if (useKeyboardAvoidingView) {
        return (
            <View style={wrapperStyles} {...restProps}>
                <KeyboardAvoidingView
                    behavior='position'
                    style={styles.keyboardAvoidingView}
                    contentContainerStyle={styles.keyboardAvoidingViewContent}
                    {...keyboardAvoidingViewProps}
                >
                    {renderMask()}
                    {renderChildren()}
                </KeyboardAvoidingView>
            </View>
        );
    }

    return (
        <View style={wrapperStyles} {...restProps}>
            {renderMask()}
            {renderChildren()}
        </View>
    );
};

export * from './types';
export * from './style';
export * from './context';
export const Pop = createPortal(BasicPop);
