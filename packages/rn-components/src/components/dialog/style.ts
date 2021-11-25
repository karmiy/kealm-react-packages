import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withDialogStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            width: px(theme.c_dialog_width),
            borderRadius: px(theme.c_dialog_radius),
            backgroundColor: theme.c_dialog_background_color,
            overflow: 'hidden',
        },
        body: {
            paddingHorizontal: px(theme.c_dialog_body_padding_horizontal),
        },
        bodyWithoutTitle: {
            minHeight: px(theme.c_dialog_body_min_height_without_title),
            justifyContent: 'center',
            alignItems: 'center',
        },
        // 标题
        title: {
            marginTop: px(theme.c_dialog_title_margin_top),
            marginBottom: px(theme.c_dialog_title_margin_bottom),
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            lineHeight: px(theme.c_dialog_title_line_height),
            fontSize: px(theme.c_dialog_title_font_size),
            fontWeight: theme.c_dialog_title_font_weight,
        },
        // 内容
        content: {
            // marginTop: px(8),
            marginBottom: px(theme.c_dialog_content_margin_bottom),
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentText: {
            lineHeight: px(theme.c_dialog_content_line_height),
            fontSize: px(theme.c_dialog_content_font_size),
            textAlign: 'center',
            letterSpacing: px(theme.c_dialog_content_letter_spacing),
        },
        contentWithoutTitle: {
            marginVertical: px(theme.c_dialog_content_margin_vertical_without_title),
        },
        // 底部
        footer: {
            flexDirection: 'row',
            height: px(theme.c_dialog_footer_height),
            borderTopWidth: theme.c_dialog_footer_border_width,
            borderTopColor: theme.c_dialog_footer_border_color,
        },
        footerItem: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        footerText: {
            fontSize: px(theme.c_dialog_footer_font_size),
            color: theme.c_dialog_footer_text_color,
        },
        footerItemLine: {
            borderRightWidth: theme.c_dialog_footer_border_width,
            borderRightColor: theme.c_dialog_footer_border_color,
        },
        // ok 按钮
        okTextRaw: {
            color: theme.c_dialog_footer_ok_text_color,
        },
    }),
);

export type DialogStyles = ReturnType<typeof withDialogStyles>;
