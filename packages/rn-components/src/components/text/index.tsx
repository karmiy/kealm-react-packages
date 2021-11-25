import React, { useContext, useMemo } from 'react';
import { TextProps, Text as NativeText, StyleSheet } from 'react-native';
import { useStyles } from '../../hooks';
import { withTextStyles } from './style';
import { TextStylesContext } from './context';
import { isIOS } from '../../utils/utils';

export const Text: React.FC<TextProps> = props => {
    const { style, children, ...restProps } = props;
    const contextStyles = useContext(TextStylesContext);
    const styles = useStyles(withTextStyles, contextStyles);

    /* 计算 lineHeight，某些安卓机字体出现被截断的现象 */
    const lineHeightStyle = useMemo(() => {
        if (isIOS) return;

        const defaultFontSize = styles.default.fontSize;
        const rate = 1.5;

        return {
            lineHeight: (StyleSheet.flatten(style)?.fontSize ?? defaultFontSize) * rate,
        };
    }, [style, styles]);

    return (
        <NativeText
            style={[styles.default, lineHeightStyle, style]}
            allowFontScaling={false}
            {...restProps}
        >
            {children}
        </NativeText>
    );
};

export * from './style';
export * from './context';
