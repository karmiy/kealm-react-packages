import React, { useCallback } from 'react';
import { TouchFeedback } from '../_common';
import { classnames, isEmpty } from '../_utils/base';
import { ButtonProps } from './types';

const Button: React.FC<ButtonProps> = props => {
    const {
        className,
        style,
        type = 'primary',
        size,
        width,
        height,
        plain = false,
        plainWithBorder = true,
        radius,
        activeOpacity = 1,
        disabled = false,
        color,
        onClick,
        children,
        ...restProps
    } = props;

    const wrapperClassName = classnames(
        'my-button',
        {
            [`my-button--${type}`]: !!type,
            [`my-button--${size}`]: !!size,
            'is-plain': !!plain,
            'is-plain-without-border': !plainWithBorder,
            'is-disabled': !!disabled,
        },
        className,
    );

    const wrapperStyle = {
        ...style,
        width,
        height,
        borderRadius: radius,
        borderColor: !isEmpty(color) && plain && !disabled ? color : undefined,
        backgroundColor: !isEmpty(color) && !plain && !disabled ? color : undefined,
        color: !isEmpty(color) && plain && !disabled ? color : undefined,
    };

    const onHandleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (disabled) return;

            onClick?.(e);
        },
        [onClick, disabled],
    );

    return (
        <TouchFeedback activeStyle={{ opacity: activeOpacity }} disabled={disabled}>
            <div
                className={wrapperClassName}
                style={wrapperStyle}
                onClick={onHandleClick}
                {...restProps}
            >
                {children}
            </div>
        </TouchFeedback>
    );
};

export default Button;
export * from './types';
