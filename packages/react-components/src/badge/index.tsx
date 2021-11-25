import React from 'react';
import { BadgeProps } from './types';
import { classnames, isEmpty } from '../_utils/base';

const Badge: React.FC<BadgeProps> = props => {
    const {
        wrapperClassName: _wrapperClassName,
        className,
        style,
        visible = true,
        count,
        dot = false,
        dotRect,
        offset,
        color,
        children,
        ...restProps
    } = props;

    const isFixed = !isEmpty(children);

    const wrapperClassName = classnames('my-badge__wrapper', _wrapperClassName);

    const badgeClassName = classnames(
        'my-badge',
        {
            'is-fixed': isFixed,
            'my-badge--dot': dot,
        },
        className,
    );

    const badgeStyle = {
        ...style,
        ...(dot && !isEmpty(dotRect)
            ? { minWidth: dotRect, height: dotRect, lineHeight: dotRect }
            : null),
        ...offset,
        backgroundColor: color,
    };

    const renderBadge = () => {
        if (!visible) return null;

        return (
            <div className={badgeClassName} style={badgeStyle} {...restProps}>
                {dot ? null : count}
            </div>
        );
    };

    if (!isFixed) return renderBadge();

    return (
        <div className={wrapperClassName}>
            {children}
            {renderBadge()}
        </div>
    );
};

export default Badge;
export * from './types';
