import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withSafeAreaBottomStyles = createStyles(({ utils: { isIPhoneX }, px }) =>
    StyleSheet.create({
        wrapper: {
            height: isIPhoneX ? px(34) : 0,
        },
    }),
);

export type SafeAreaBottomStyles = ReturnType<typeof withSafeAreaBottomStyles>;
