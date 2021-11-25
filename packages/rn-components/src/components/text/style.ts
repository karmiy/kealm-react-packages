import { StyleSheet, Platform } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withTextStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        default: {
            fontSize: px(theme.c_text_font_size),
            color: theme.c_text_color,
            ...Platform.select({
                android: { fontFamily: 'System' },
            }),
        },
    }),
);

export type TextStyles = ReturnType<typeof withTextStyles>;
