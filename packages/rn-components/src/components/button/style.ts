import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withButtonStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            height: px(theme.c_button_height_default),
            paddingHorizontal: px(theme.c_button_padding_horizontal_default),
            borderRadius: px(theme.c_button_radius_default),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: px(theme.c_button_font_size),
            color: '#fff',
        },
        // plain
        plainRaw: {
            backgroundColor: theme.c_button_plain_background_color,
        },
        // type 类型
        primaryRaw: {
            backgroundColor: theme.c_button_primary_color,
        },
        primaryPlainBorderRaw: {
            borderWidth: px(1),
            borderColor: theme.c_button_primary_color,
        },
        primaryPlainTextRaw: {
            color: theme.c_button_primary_color,
        },
        regularRaw: {
            backgroundColor: theme.c_button_regular_color,
        },
        regularPlainBorderRaw: {
            borderWidth: px(1),
            borderColor: theme.c_button_regular_color,
        },
        regularPlainTextRaw: {
            color: theme.c_button_regular_color,
        },
        infoRaw: {
            backgroundColor: theme.c_button_info_color,
        },
        infoPlainBorderRaw: {
            borderWidth: px(1),
            borderColor: theme.c_button_info_color,
        },
        infoPlainTextRaw: {
            color: theme.c_button_info_color,
        },
        // size 大小
        largeRaw: {
            height: px(theme.c_button_height_large),
            paddingHorizontal: px(theme.c_button_padding_horizontal_large),
            borderRadius: px(theme.c_button_radius_large),
        },
        largeTextRaw: {
            fontSize: px(theme.c_button_font_size_large),
        },
        // 禁用
        disabledRaw: {
            backgroundColor: theme.c_button_disabled_background_color,
        },
        disabledTextRaw: {
            color: theme.c_button_disabled_text_color,
        },
        disabledPlainRaw: {
            borderWidth: px(1),
            borderColor: theme.c_button_plain_disabled_border_color,
            backgroundColor: theme.c_button_plain_disabled_background_color,
        },
        disabledPlainTextRaw: {
            color: theme.c_button_plain_disabled_text_color,
        },
    }),
);

export type ButtonStyles = ReturnType<typeof withButtonStyles>;
