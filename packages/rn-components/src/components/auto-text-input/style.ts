import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';
import { withTextareaStyles } from '../../components/textarea/style';

export const withAutoTextInputStyles = createStyles((...rest) =>
    StyleSheet.create({
        wrapper: {
            overflow: 'hidden',
        },
        input: withTextareaStyles(...rest).input,
        /* 定位 */
        inputPosition: {
            position: 'absolute',
            width: '100%',
            left: 0,
        },
        /* 隐藏 */
        inputHide: {
            opacity: 0,
        },
        /* 辅助 */
        auxiliaryWrapper: {
            height: 0,
            overflow: 'hidden',
        },
    }),
);

export type AutoTextInputStyles = ReturnType<typeof withAutoTextInputStyles>;
