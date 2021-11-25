import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withTextareaStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            borderRadius: px(theme.c_textarea_radius_default),
        },
        /* padding 区分开，如果需要适应高或定行，上下 padding 会由 control 视觉控制 */
        paddingVerticalRaw: {
            paddingVertical: px(theme.c_textarea_padding_vertical),
        },
        paddingHorizontalRaw: {
            paddingHorizontal: px(theme.c_textarea_padding_horizontal),
        },
        input: {
            // TODO: 就很怪？？？必须拆开 2 个不能 paddingVertical，否则 TextInput 实际渲染出来会更高？？？
            // paddingVertical: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingHorizontal: 0,
            borderWidth: 0,
            textAlignVertical: 'top',
            fontSize: px(theme.c_textarea_font_size_default),
            color: theme.c_textarea_text_color,
        },
        placeholderText: {
            color: theme.c_textarea_placeholder_color,
        },

        /* 禁用 */
        disabledInputText: {
            color: theme.c_textarea_disabled_color,
        },
        disabledPlaceholderText: {
            color: theme.c_textarea_disabled_placeholder_color,
        },

        /* 灰色背景 */
        greyRaw: {
            backgroundColor: theme.c_textarea_background_color_grey,
        },

        /* 大小 */
        mediumWrapper: {
            borderRadius: px(theme.c_textarea_radius_medium),
        },
        mediumInputRaw: {
            fontSize: px(theme.c_textarea_font_size_medium),
        },

        /* 倒计数 */
        count: {
            height: px(theme.c_textarea_count_height),
            lineHeight: px(theme.c_textarea_count_height),
            textAlign: 'right',
            fontSize: px(theme.c_textarea_count_font_size),
            color: theme.c_textarea_count_text_color,
        },
        countHide: {
            opacity: 0,
        },

        /* 标签 */
        tagsWrapper: {
            marginTop: px(theme.c_textarea_tags_gap),
        },
        tagsContainer: {
            margin: -px(2),
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        tagsItem: {
            padding: px(2),
        },
        tagsInner: {
            height: px(theme.c_textarea_tags_height),
            paddingHorizontal: px(theme.c_textarea_tags_padding_horizontal),
            borderWidth: px(theme.c_textarea_tags_border_width),
            borderColor: theme.c_textarea_tags_border_color,
            borderRadius: px(theme.c_textarea_tags_radius),
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        tagsAddIcon: {
            width: px(theme.c_textarea_tags_add_icon_rect),
            height: px(theme.c_textarea_tags_add_icon_rect),
            marginRight: px(theme.c_textarea_tags_add_icon_gap),
        },
        tagsText: {
            fontSize: px(theme.c_textarea_tags_font_size),
        },
    }),
);

export type TextareaStyles = ReturnType<typeof withTextareaStyles>;
