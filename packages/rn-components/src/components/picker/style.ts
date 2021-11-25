import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withPickerStyle = createStyles(({ theme, utils: { hairlineBorder }, px }) =>
    StyleSheet.create({
        wrapper: {
            borderTopLeftRadius: px(theme.c_picker_radius),
            borderTopRightRadius: px(theme.c_picker_radius),
            backgroundColor: theme.c_picker_background_color,
            overflow: 'hidden',
        },
        header: {
            height: px(theme.c_picker_header_height),
            flexDirection: 'row',
            alignItems: 'center',
            ...hairlineBorder('Bottom', theme.c_picker_header_border_color),
        },
        /* headerText: {
            fontSize: px(theme.c_picker_header_font_size),
        }, */
        title: {
            height: px(theme.c_picker_title_height),
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        titleText: {
            fontSize: px(theme.c_picker_title_font_size),
            color: theme.c_picker_title_text_color,
        },
        btn: {
            height: px(theme.c_picker_btn_height),
            paddingHorizontal: px(theme.c_picker_btn_padding_horizontal),
            justifyContent: 'center',
            alignItems: 'center',
        },
        btnText: {
            fontSize: px(theme.c_picker_btn_font_size),
            color: theme.c_picker_btn_text_color,
        },
        okRaw: {
            color: theme.c_picker_btn_ok_text_color,
        },
        view: {
            paddingVertical: px(theme.c_picker_view_padding_vertical),
        },
    }),
);

export type PickerStyles = ReturnType<typeof withPickerStyle>;
