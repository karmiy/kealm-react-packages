import React, { useRef, useState } from 'react';
import { View, Animated, Easing, LayoutChangeEvent } from 'react-native';
import { useWillUnMount, useDidUpdate, usePrevious } from '@kealm/react-hooks';
import { useLazyStatus } from '../../hooks';
import { isBoolean } from '../../utils/base';
import { MAGIC_MEASURABLE_HEIGHT } from './utils';
import { CollapseProps, AnimatedStyle } from './types';

/* Learn from the npm package 'react-native-collapsible' */
export const Collapse: React.FC<CollapseProps> = props => {
    const {
        visible = false,
        align = 'top',
        collapsedHeight = 0,
        duration = 300,
        easing = Easing.out(Easing.cubic),
        onOpen,
        afterOpen,
        onClose,
        afterClose,
        renderChildrenMode = 'keepAlive',
        wrapperProps,
        containerProps,
        children,
    } = props;

    const heightAnim = useRef(new Animated.Value(collapsedHeight)).current;
    const animationRef = useRef<Animated.CompositeAnimation>();
    const contentRef = useRef<View>(null);

    const isUnMountRef = useRef(false); // 组件已卸载
    useWillUnMount(() => {
        isUnMountRef.current = true;
    });

    const [isMeaturing, setIsMeaturing] = useState(false); // 是否正在测量内容
    const [contentHeight, setContentHeight] = useState(0); // 记录内容高
    const [isAnimating, setIsAnimating] = useState(false); // 是否正在做动画
    const lazyVisible = useLazyStatus(visible);
    const prevVisible = usePrevious(visible);

    const measureContent = (callback?: (height: number) => void) => {
        requestAnimationFrame(() => {
            // Animated.View 需要 getNode 获取
            let ref: View;
            if (typeof contentRef.current?.measure === 'function') {
                ref = contentRef.current;
            } else {
                ref = (contentRef.current as any)?.getNode?.();
            }
            ref?.measure((x, y, width, height) => {
                setIsMeaturing(false);
                setContentHeight(height);
                callback?.(height);
            });
        });
    };

    const transitionToHeight = (height: number, onEnd?: () => void) => {
        animationRef.current?.stop();

        setIsAnimating(true);
        animationRef.current = Animated.timing(heightAnim, {
            useNativeDriver: false,
            toValue: height ? height : 0,
            duration,
            easing,
        });
        animationRef.current.start(({ finished }) => {
            if (isUnMountRef.current || !finished) return;

            setIsAnimating(false);
            onEnd?.();
        });
    };

    useDidUpdate(() => {
        // collapsedHeight 改变时，如果当前是收起状态，更新当前 height
        if (!visible) heightAnim.setValue(collapsedHeight);
    }, [collapsedHeight]);

    useDidUpdate(() => {
        if (!visible) {
            onClose?.();
            // 收起动画
            transitionToHeight(collapsedHeight, afterClose);
        } else {
            // 展开时都用重新测量内容高，避免在收起过程中内容有变化
            setIsMeaturing(true);
            // 父元素设置 height: 0, overflow: hidden 时，子元素无法拿到高度（会得到 0）
            // TODO: 经测试，非 0 如设置 {0, 1} 可以拿到
            collapsedHeight === 0 && heightAnim.setValue(MAGIC_MEASURABLE_HEIGHT);
        }
    }, [visible]);

    useDidUpdate(() => {
        if (!isMeaturing) return;

        if (isAnimating) {
            setIsMeaturing(false);
            // 如果是动画过程中快速切换，不需要计算尺寸
            onOpen?.();
            // 展开动画
            transitionToHeight(contentHeight, afterOpen);
            return;
        }

        measureContent(height => {
            onOpen?.();
            // 展开动画
            transitionToHeight(height, afterOpen);
        });
    }, [isMeaturing]);

    const onLayoutChange = (e: LayoutChangeEvent) => {
        containerProps?.onLayout?.(e);
        // 展开状态下，内容大小发生变化实时记录
        const { height } = e.nativeEvent.layout;
        if (isAnimating || !visible || isMeaturing || contentHeight === height) {
            return;
        }

        heightAnim.setValue(height);
        setContentHeight(height);
    };

    const style: AnimatedStyle = (!visible ||
        isAnimating ||
        isMeaturing ||
        (visible && isBoolean(prevVisible) && !prevVisible)) && {
        overflow: 'hidden',
        height: heightAnim,
    };

    // TODO: 暂废弃，这种方式不兼容 collapsedHeight，展开时会闪烁
    /* const style: AnimatedStyle = !isMeaturing &&
        (!visible || isAnimating) && {
            overflow: 'hidden',
            height: heightAnim,
        }; */

    const wrapperStyles = [wrapperProps?.style ?? null, style];

    const _containerStyle: AnimatedStyle = {};

    if (isMeaturing) {
        // TODO: 暂废弃，这种方式不兼容 collapsedHeight，展开时会闪烁
        // 测试时先定位确保不占文档流
        // _containerStyle.position = 'absolute';
        // _containerStyle.opacity = 0;
    } else if (align === 'center') {
        _containerStyle.transform = [
            {
                translateY: heightAnim.interpolate({
                    inputRange: [0, contentHeight],
                    outputRange: [contentHeight / -2, 0],
                }),
            },
        ];
    } else if (align === 'bottom') {
        _containerStyle.transform = [
            {
                translateY: heightAnim.interpolate({
                    inputRange: [0, contentHeight],
                    outputRange: [-contentHeight, 0],
                }),
            },
        ];
    }
    const containerStyle: AnimatedStyle = _containerStyle;

    const containerStyles = [containerProps?.style ?? null, containerStyle];

    const renderChildren = () => {
        switch (renderChildrenMode) {
            case 'always':
                return children;
            case 'unmountOnCollapsed':
                const shouldRenderChildren = visible || (!visible && (isAnimating || prevVisible));
                return shouldRenderChildren ? children : null;
            case 'keepAlive':
                return lazyVisible ? children : null;
            default:
                return children;
        }
    };

    return (
        <Animated.View {...wrapperProps} style={wrapperStyles}>
            <Animated.View
                {...containerProps}
                ref={contentRef}
                style={containerStyles}
                onLayout={isAnimating ? undefined : onLayoutChange}
            >
                {renderChildren()}
            </Animated.View>
        </Animated.View>
    );
};

export * from './types';
