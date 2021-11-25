import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withDatePickerViewStyles = createStyles(() =>
    StyleSheet.create({
        wrapper: {
            flexDirection: 'row',
        },
        item: {
            // flex: 1,
            // 不能 flex: 1，会完全均分
            flexGrow: 1,
        },
    }),
);

export type DatePickerViewStyles = ReturnType<typeof withDatePickerViewStyles>;
