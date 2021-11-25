import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useStyles } from '../../hooks';
import { isEmpty, isString } from '../../utils/base';
import { Text } from '../text';
import { ButtonProps } from './types';
import { withButtonStyles } from './style';
import { ButtonStylesContext } from './context';

export const Button: React.FC<ButtonProps> = props => {
    const {
        style,
        styles: _styles,
        width,
        height,
        type = 'primary',
        size,
        disabled = false,
        plain = false,
        plainWithBorder = true,
        color,
        innerSpace,
        radius,
        fontSize,
        children,
        ...restProps
    } = props;

    const contextStyles = useContext(ButtonStylesContext);
    const styles = useStyles(withButtonStyles, contextStyles, _styles);

    const wrapperStyles = [
        styles.wrapper,
        styles[`${type}Raw` as const],
        size ? styles[`${size}Raw` as const] : null,
        !isEmpty(color) && !plain ? { backgroundColor: color } : null, // 常规按钮、color 控制填充色
        disabled ? styles.disabledRaw : null,
        plain ? styles.plainRaw : null,
        plain && type && plainWithBorder ? styles[`${type}PlainBorderRaw` as const] : null,
        !isEmpty(color) && plain ? { borderColor: color } : null, // plain 按钮，color 控制边框色与字色
        plain && disabled ? styles.disabledPlainRaw : null,
        plain && !plainWithBorder ? { borderWidth: 0 } : null,
        style,
        width ? { width, paddingHorizontal: 0 } : null,
        height ? { height } : null,
        !isEmpty(innerSpace) ? { paddingHorizontal: innerSpace } : null,
        !isEmpty(radius) ? { borderRadius: radius } : null,
    ];

    const textStyles = [
        styles.text,
        size ? styles[`${size}TextRaw` as const] : null,
        disabled ? styles.disabledTextRaw : null,
        plain && type ? styles[`${type}PlainTextRaw` as const] : null,
        !isEmpty(color) && plain ? { color } : null, // plain 按钮，color 控制边框色与字色
        plain && disabled ? styles.disabledPlainTextRaw : null,
        fontSize ? { fontSize } : null,
    ];

    return (
        <TouchableOpacity
            style={wrapperStyles}
            disabled={disabled}
            activeOpacity={1}
            {...restProps}
        >
            {isString(children) ? <Text style={textStyles}>{children}</Text> : children}
        </TouchableOpacity>
    );
};

export * from './types';
export * from './style';
export * from './context';
