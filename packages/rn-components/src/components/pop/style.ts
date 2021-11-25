import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withPopStyles = createStyles(({ theme, utils: { zIndex, hide } }) =>
    StyleSheet.create({
        wrapper: {
            ...StyleSheet.absoluteFillObject,
            ...zIndex(theme.c_pop_z_index),
            overflow: 'hidden',
        },
        hideRaw: hide,
        centerRaw: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        mask: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: theme.c_pop_mask_background_color,
        },

        /* KeyboardAvoidingView */
        keyboardAvoidingView: {
            flex: 1,
        },
        keyboardAvoidingViewContent: {
            flex: 1,
        },
    }),
);

export type PopStyles = ReturnType<typeof withPopStyles>;
