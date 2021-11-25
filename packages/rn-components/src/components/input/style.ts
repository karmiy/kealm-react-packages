import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withInputStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            height: px(theme.c_input_height_default),
            paddingHorizontal: px(theme.c_input_padding_horizontal_default),
            borderRadius: px(theme.c_input_radius_default),
            backgroundColor: theme.c_input_background_color,
            flexDirection: 'row',
            alignItems: 'center',
        },
        input: {
            flex: 1,
            // lineHeight: px(21),
            borderWidth: 0,
            padding: 0,
            fontSize: px(theme.c_input_font_size_default),
            color: theme.c_input_text_color,
        },
        placeholderText: {
            color: theme.c_input_placeholder_color,
        },

        labelWrapper: {
            marginRight: px(theme.c_input_label_gap),
            flexDirection: 'row',
            alignItems: 'center',
        },

        /* 禁用 */
        disabledInputText: {
            color: theme.c_input_disabled_color,
        },
        disabledPlaceholderText: {
            color: theme.c_input_disabled_placeholder_color,
        },

        /* 灰色背景 */
        greyRaw: {
            backgroundColor: theme.c_input_background_color_grey,
        },

        /* 清空按钮 */
        clearWrapper: {
            width: px(theme.c_input_clear_btn_rect),
            height: px(theme.c_input_clear_btn_rect),
            marginLeft: px(theme.c_input_clear_gap),
        },
        clearImage: {
            width: '100%',
            height: '100%',
        },

        /* 大小 */
        largeRaw: {
            height: px(theme.c_input_height_large),
            paddingHorizontal: px(theme.c_input_padding_horizontal_large),
            borderRadius: px(theme.c_input_radius_large),
        },
        largeInputRaw: {
            // lineHeight: px(24),
            fontSize: px(theme.c_input_font_size_large),
        },
    }),
);

export type InputStyles = ReturnType<typeof withInputStyles>;
