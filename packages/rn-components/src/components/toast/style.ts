import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withToastStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            paddingHorizontal: px(theme.c_toast_padding_horizontal),
            paddingVertical: px(theme.c_toast_padding_vertical),
            borderRadius: px(theme.c_toast_radius),
            backgroundColor: theme.c_toast_background_color,
            alignItems: 'center',
        },
        wrapperWithIcon: {
            paddingHorizontal: px(theme.c_toast_padding_horizontal_with_icon),
            paddingVertical: px(theme.c_toast_padding_vertical_with_icon),
        },
        icon: {
            width: px(theme.c_toast_icon_rect),
            height: px(theme.c_toast_icon_rect),
        },
        contentWithIcon: {
            width: px(theme.c_toast_content_width_with_icon),
            paddingTop: px(theme.c_toast_content_padding_top_with_icon),
        },
        text: {
            fontSize: px(theme.c_toast_font_size),
            color: theme.c_toast_text_color,
            textAlign: 'center',
        },
        textWithIcon: {
            fontSize: px(theme.c_toast_font_size_with_icon),
        },
    }),
);

export type ToastStyles = ReturnType<typeof withToastStyles>;
