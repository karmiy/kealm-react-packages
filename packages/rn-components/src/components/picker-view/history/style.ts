import { StyleSheet } from 'react-native';
import { createStyles } from '../../../utils/styles';
import { DEFAULT_SIDE_COUNT } from './utils';

export const withPickerViewStyles = createStyles(({ theme, utils: { hairlineBorder }, px }) =>
    StyleSheet.create({
        wrapper: {
            backgroundColor: theme.c_picker_view_background_color,
        },
        container: {
            height: theme.c_picker_view_item_height * (DEFAULT_SIDE_COUNT * 2 + 1), // 默认上下各 3 个
            backgroundColor: theme.c_picker_view_background_color,
        },
        scrollView: {
            flex: 1,
        },
        content: {
            paddingVertical: theme.c_picker_view_item_height * DEFAULT_SIDE_COUNT,
        },
        itemText: {
            height: theme.c_picker_view_item_height,
            lineHeight: theme.c_picker_view_item_height,
            textAlign: 'center',
            fontSize: px(theme.c_picker_view_font_size),
            color: theme.c_picker_view_text_color,
        },
        indicator: {
            position: 'absolute',
            width: '100%',
            height: theme.c_picker_view_item_height,
            top: theme.c_picker_view_item_height * DEFAULT_SIDE_COUNT,
            left: 0,
            ...hairlineBorder('Top', theme.c_picker_view_indicator_border_color),
            ...hairlineBorder('Bottom', theme.c_picker_view_indicator_border_color),
        },
        maskTop: {
            position: 'absolute',
            width: '100%',
            height: theme.c_picker_view_item_height * DEFAULT_SIDE_COUNT,
            top: 0,
            left: 0,
        },
        maskBottom: {
            position: 'absolute',
            width: '100%',
            height: theme.c_picker_view_item_height * DEFAULT_SIDE_COUNT,
            bottom: 0,
            left: 0,
        },
    }),
);

export type PickerViewStyles = ReturnType<typeof withPickerViewStyles>;
