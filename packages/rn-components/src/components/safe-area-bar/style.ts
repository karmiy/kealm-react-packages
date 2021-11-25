import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';
import { safeAreaTop } from '../../utils/utils';

export const withSafeAreaBarStyles = createStyles(({ px }) =>
    StyleSheet.create({
        wrapper: {
            height: px(safeAreaTop),
        },
    }),
);

export type SafeAreaBarStyles = ReturnType<typeof withSafeAreaBarStyles>;
