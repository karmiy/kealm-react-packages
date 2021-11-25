import React, { useState, useCallback, ReactElement } from 'react';
import { classnames } from '../../_utils/base';
import { TouchFeedbackProps } from './types';

export const TouchFeedback: React.FC<TouchFeedbackProps> = props => {
    const { disabled = false, activeClassName = 'is-active', activeStyle, children } = props;

    const [isActive, setIsActive] = useState(false);
    const child = React.Children.only(children) as ReactElement;
    const {
        className,
        style,
        onTouchStart: _onTouchStart,
        onTouchEnd: _onTouchEnd,
        onMouseDown: _onMouseDown,
        onMouseUp: _onMouseUp,
        onMouseLeave: _onMouseLeave,
    } = child.props;

    const onTouchStart = useCallback(
        (e: React.TouchEvent) => {
            _onTouchStart?.(e);
            setIsActive(true);
        },
        [_onTouchStart],
    );

    const onTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            _onTouchEnd?.(e);
            setIsActive(false);
        },
        [_onTouchEnd],
    );

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            _onMouseDown?.(e);
            setIsActive(true);
        },
        [_onMouseDown],
    );

    const onMouseUp = useCallback(
        (e: React.MouseEvent) => {
            _onMouseUp?.(e);
            setIsActive(false);
        },
        [_onMouseUp],
    );

    const onMouseLeave = useCallback(
        (e: React.MouseEvent) => {
            _onMouseLeave?.(e);
            setIsActive(false);
        },
        [_onMouseLeave],
    );

    const events = {
        onTouchStart,
        onTouchEnd,
        onMouseDown,
        onMouseUp,
        onMouseLeave,
    };

    const themes = {
        ...(isActive ? { className: classnames(className, activeClassName) } : undefined),
        ...(isActive
            ? {
                  style: {
                      ...style,
                      ...activeStyle,
                  },
              }
            : undefined),
    };

    if (disabled) {
        return child;
    }

    return React.cloneElement(child, {
        ...events,
        ...themes,
    });
};

export * from './types';
