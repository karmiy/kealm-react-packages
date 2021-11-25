import React, { useContext, useState } from 'react';
import { View, LayoutChangeEvent } from 'react-native';
import { Text } from '../text';
import { useStyles } from '../../hooks';
import { isEmpty } from '../../utils/base';
import { BadgeProps } from './types';
import { withBadgeStyles } from './style';
import { BadgeStylesContext } from './context';

export const Badge: React.FC<BadgeProps> = props => {
    const {
        styles: _styles,
        style,
        visible = true,
        count = 0,
        dot = false,
        dotRect,
        offset,
        color,
        children,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(BadgeStylesContext);
    const styles = useStyles(withBadgeStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 徽标 ------------------------------ */
    const [rect, setRect] = useState({ width: 0, height: 0 });

    // 是否悬挂，即有无 children
    const isSuspended = !isEmpty(children);

    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setRect({
            width,
            height,
        });
    };

    const renderBadgeCount = () => {
        if (!visible) return null;

        // 定位偏移
        const { top, right, bottom, left } = offset ?? {};

        const badgeCountStyle = [
            styles.count,
            isSuspended ? styles.suspendedRaw : null,
            dot ? styles.dotRaw : null,
            dot && !isEmpty(dotRect)
                ? {
                      minWidth: dotRect,
                      height: dotRect,
                      lineHeight: dotRect,
                      borderRadius: dotRect / 2,
                  }
                : null,
            !isEmpty(top) ? { top } : null,
            !isEmpty(right) ? { right } : null,
            !isEmpty(bottom) ? { bottom } : null,
            !isEmpty(left) ? { left } : null,
            isSuspended
                ? {
                      transform: [
                          {
                              translateX: rect.width / 2,
                          },
                          {
                              translateY: -rect.height / 2,
                          },
                      ],
                  }
                : null,
            !isEmpty(color) ? { backgroundColor: color } : null,
        ];

        if (dot) return <Text style={badgeCountStyle} onLayout={onLayout} />;

        return (
            <Text style={badgeCountStyle} onLayout={onLayout}>
                {count}
            </Text>
        );
    };

    return (
        <View style={style} {...restProps}>
            {children}
            {renderBadgeCount()}
        </View>
    );
};

export * from './types';
export * from './style';
export * from './context';
