import React, { useContext, useRef } from 'react';
import { Animated, LayoutChangeEvent } from 'react-native';
import { useStyles } from '../../hooks';
import { windowRect } from '../../utils/utils';
import { isEmpty } from '../../utils/base';
import { Pop } from '../pop';
import { DrawerProps } from './types';
import { isVerticalPlacement, isPlainPlacement } from './utils';
import { withDrawerStyles } from './style';
import { DrawerStylesContext } from './context';

export const Drawer: React.FC<DrawerProps> = props => {
    const {
        styles: _styles,
        popStyles: _popStyles,
        placement = 'bottom',
        offset,
        contentContainerProps,
        children,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(DrawerStylesContext);
    const styles = useStyles(withDrawerStyles, contextStyles, _styles);

    /* pop 组件样式 */
    const popStyles = useStyles(
        _popStyles,
        // 偏移量
        !isEmpty(offset)
            ? {
                  wrapper: {
                      [placement]: offset,
                  },
              }
            : undefined,
    );

    const wrapperStyles = [styles.wrapper, styles[`${placement}Raw` as const]];

    /* ------------------------------ BLOCK: 内容宽高 ------------------------------ */
    /* 由于 RN 的 translate 不能设置百分比，需要取元素宽高来计算 */
    const contentLayoutRef = useRef({ width: windowRect.width / 2, height: windowRect.height / 2 });

    /* 内容元素挂载完成后获取其宽高 */
    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        contentLayoutRef.current = {
            width,
            height,
        };
    };

    /* ------------------------------ BLOCK: 抽屉内容 ------------------------------ */
    const renderWrapper = ({ animate }: { animate: Animated.Value }) => {
        /* 内容的 translate 随动画运行 */

        // 内容尺寸，水平方向取宽，垂直取高
        const measure = isVerticalPlacement(placement)
            ? contentLayoutRef.current.height
            : contentLayoutRef.current.width;

        // 比例，左上方向 translate 需要乘以 -1
        const scale = isPlainPlacement(placement) ? -1 : 1;

        // 映射结果
        const outputRange = [measure * scale, 0];

        // 水平 translateX，垂直 translateY
        const translate = isVerticalPlacement(placement)
            ? {
                  translateY: animate.interpolate({
                      inputRange: [0, 1],
                      outputRange,
                  }),
              }
            : {
                  translateX: animate.interpolate({
                      inputRange: [0, 1],
                      outputRange,
                  }),
              };

        return (
            <Animated.View
                style={[
                    wrapperStyles,
                    {
                        transform: [translate],
                    },
                ]}
                {...contentContainerProps}
                onLayout={e => {
                    contentContainerProps?.onLayout?.(e);
                    onLayout(e);
                }}
            >
                {children}
            </Animated.View>
        );
    };

    return (
        <Pop styles={popStyles} {...restProps}>
            {renderWrapper}
        </Pop>
    );
};

export * from './types';
export * from './style';
export * from './context';
