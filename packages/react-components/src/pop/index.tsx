import React, { useCallback } from 'react';
import { TouchWithoutFeedback, Overlay, Portal, AnimatedVisible } from '../_common';
import { classnames } from '../_utils/base';
import { useLockScroll } from '../_hooks';
import { PopProps } from './types';

const Pop: React.FC<PopProps> = props => {
    const {
        className,
        style,
        visible = false,
        onVisibleChange,
        showMask = true,
        maskClosable = true,
        onMaskClick,
        renderMask: __renderMask,
        maskClassName,
        maskStyle: _maskStyle,
        zIndex,
        isCenter = false,
        transitionName = 'my-pop-fade',
        duration = 150,
        getContainer,
        children,
        unmountOnExit = false,
        appear = true,
        lockScrollEnabled = true,
        ...restProps
    } = props;

    const popClassName = classnames('my-pop', isCenter ? 'my-pop--center' : null, className);
    const popStyle = { ...style, zIndex };
    const maskStyle = { ..._maskStyle, zIndex };

    /* ------------------------------ BLOCK: 阻止页面滚动 ------------------------------ */
    useLockScroll(visible, lockScrollEnabled);

    /* ------------------------------ BLOCK: 蒙层 ------------------------------ */
    const maskClick = useCallback(
        (e: React.MouseEvent) => {
            maskClosable && onVisibleChange?.(false);

            onMaskClick?.(e);
        },
        [maskClosable, onVisibleChange, onMaskClick],
    );

    const renderMask = () => {
        if (!showMask) return null;

        if (__renderMask) {
            return <TouchWithoutFeedback onClick={maskClick}>{__renderMask}</TouchWithoutFeedback>;
        }
        return (
            <Overlay
                className={maskClassName}
                style={maskStyle}
                visible={visible}
                duration={duration}
                onClick={maskClick}
                unmountOnExit={unmountOnExit}
                appear={appear}
            />
        );
    };
    return (
        <Portal getContainer={getContainer}>
            {renderMask()}
            <AnimatedVisible
                visible={visible}
                transitionName={transitionName}
                duration={duration}
                unmountOnExit={unmountOnExit}
                appear={appear}
                {...restProps}
            >
                <div className={popClassName} style={popStyle}>
                    {children}
                </div>
            </AnimatedVisible>
        </Portal>
    );
};

export default Pop;

export * from './types';
