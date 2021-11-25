import React, { useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDidUpdate } from '@kealm/react-hooks';
import { RenderWrapper } from '../render-wrapper';
import { LazyWrapper } from '../lazy-wrapper';
import { CssWrapper } from '../css-wrapper';
import { useTransitionStatus } from '../../_hooks';
import { AnimatedVisibleProps } from './types';

export const AnimatedVisible: React.FC<AnimatedVisibleProps> = props => {
    const {
        transitionName,
        duration,
        visible = false,
        onOpen,
        onClose,
        afterOpen,
        afterClose,
        unmountOnExit = false,
        appear = true,
        children,
    } = props;

    const [wrapperVisible, setWrapperVisible] = useState(visible); // 容器显示状态
    const [animateIn, setAnimateIn] = useState(visible); // 动画显示状态

    /* ------------------------------ BLOCK: 过渡动画 ------------------------------ */
    /* animation-leave-to */
    const onExited = useCallback(() => {
        // 离场动画结束时控制 DOM 隐藏显示
        setWrapperVisible(false);
        afterClose?.();
    }, [afterClose]);

    const { transitionEvents, isTransitioning } = useTransitionStatus({
        onEnter: onOpen,
        onEntered: afterOpen,
        onExit: onClose,
        onExited,
    }); // 是否正在动画中

    const cssWrapperStyle = {
        ...(isTransitioning ? { transitionDuration: `${duration}ms` } : {}),
    };

    /* ------------------------------ BLOCK: 显示状态受控 ------------------------------ */
    /* animation-enter */
    useDidUpdate(
        () => {
            // 入场时控制 DOM 显示
            visible && setWrapperVisible(true);
        },
        [visible],
        true,
    );

    useDidUpdate(
        () => {
            // 入场时控制动画效果
            wrapperVisible && setAnimateIn(true);
        },
        [wrapperVisible],
        false,
    );

    /* animation-leave */
    useDidUpdate(
        () => {
            // 离场时控制动画效果
            !visible && setAnimateIn(visible);
        },
        [visible],
        false,
    );

    // Wrapper, 根据关闭时是否销毁元素选择 Wrapper 组件
    const Wrapper = unmountOnExit ? RenderWrapper : LazyWrapper;

    return (
        <Wrapper visible={wrapperVisible} unmountOnExit={unmountOnExit}>
            <CSSTransition
                in={animateIn}
                classNames={transitionName}
                timeout={duration}
                {...transitionEvents}
                appear={appear}
            >
                <CssWrapper style={cssWrapperStyle}>{children}</CssWrapper>
            </CSSTransition>
        </Wrapper>
    );
};

export * from './types';
