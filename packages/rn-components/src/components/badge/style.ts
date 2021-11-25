import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withBadgeStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        count: {
            minWidth: px(theme.c_badge_rect),
            height: px(theme.c_badge_rect),
            lineHeight: px(theme.c_badge_rect),
            borderRadius: px(theme.c_badge_rect / 2),
            paddingVertical: 0,
            paddingHorizontal: px(theme.c_badge_padding_horizontal),
            backgroundColor: theme.c_badge_color,
            overflow: 'hidden',
            fontSize: px(theme.c_badge_font_size),
            color: theme.c_badge_text_color,
            textAlign: 'center',
        },
        suspendedRaw: {
            position: 'absolute',
            top: 0,
            right: 0,
        },
        dotRaw: {
            minWidth: px(theme.c_badge_dot_rect),
            height: px(theme.c_badge_dot_rect),
            lineHeight: px(theme.c_badge_dot_rect),
            borderRadius: px(theme.c_badge_dot_rect / 2),
            paddingHorizontal: 0,
        },
    }),
);

export type BadgeStyles = ReturnType<typeof withBadgeStyles>;
