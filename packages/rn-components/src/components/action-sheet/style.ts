import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withActionSheetStyles = createStyles(
    ({ theme, utils: { isIPhoneX, hairlineBorder }, px }) =>
        StyleSheet.create({
            wrapper: {
                paddingBottom: isIPhoneX ? px(theme.iphoneX_bar_height) : 0,
                borderTopLeftRadius: px(theme.c_action_sheet_radius),
                borderTopRightRadius: px(theme.c_action_sheet_radius),
                backgroundColor: theme.c_action_sheet_background_color,
                overflow: 'hidden',
            },
            title: {
                paddingVertical: px(theme.c_action_sheet_title_padding_vertical),
                paddingHorizontal: px(theme.c_action_sheet_title_padding_horizontal),
                ...hairlineBorder('Bottom', theme.c_action_sheet_border_color),
            },
            titleText: {
                lineHeight: px(theme.c_action_sheet_title_line_height),
                fontSize: px(theme.c_action_sheet_title_font_size),
                color: theme.c_action_sheet_title_text_color,
                textAlign: 'center',
            },
            actionText: {
                lineHeight: px(theme.c_action_sheet_action_line_height),
                paddingVertical: px(theme.c_action_sheet_action_padding_vertical),
                paddingHorizontal: px(theme.c_action_sheet_action_padding_horizontal),
                fontSize: px(theme.c_action_sheet_action_font_size),
                textAlign: 'center',
            },
            disabledRaw: {
                color: theme.c_action_sheet_disabled_text_color,
            },
            borderBottomRaw: {
                ...hairlineBorder('Bottom', theme.c_action_sheet_border_color),
            },
            whiteSpaceRaw: {
                height: px(theme.c_action_sheet_space_height),
                backgroundColor: theme.c_action_sheet_space_background_color,
            },
        }),
);

export type ActionSheetStyles = ReturnType<typeof withActionSheetStyles>;
