import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withDrawerStyles = createStyles(({ theme }) =>
    StyleSheet.create({
        wrapper: {
            position: 'absolute',
            zIndex: theme.c_drawer_wrapper_z_index,
        },
        leftRaw: {
            height: '100%',
            top: 0,
            left: 0,
        },
        rightRaw: {
            height: '100%',
            top: 0,
            right: 0,
        },
        topRaw: {
            width: '100%',
            top: 0,
            left: 0,
        },
        bottomRaw: {
            width: '100%',
            bottom: 0,
            left: 0,
        },
    }),
);

export type DrawerStyles = ReturnType<typeof withDrawerStyles>;
