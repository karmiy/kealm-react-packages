import { StyleSheet } from 'react-native';
import { createStyles } from '../../utils/styles';

export const withStepperStyles = createStyles(({ theme, px }) =>
    StyleSheet.create({
        wrapper: {
            width: px(theme.c_stepper_width),
            height: px(theme.c_stepper_height),
            borderWidth: theme.c_stepper_border_width,
            borderColor: theme.c_stepper_border_color,
            borderRadius: px(theme.c_stepper_radius),
            backgroundColor: theme.c_stepper_background_color,
            flexDirection: 'row',
        },
        plainRaw: {
            borderWidth: 0,
            backgroundColor: 'transparent',
        },
        btnWrapper: {
            width: px(theme.c_stepper_height),
            flexGrow: 0,
            flexShrink: 0,
        },
        btnDecrease: {
            borderRightWidth: theme.c_stepper_border_width,
            borderColor: theme.c_stepper_border_color,
        },
        btnIncrease: {
            borderLeftWidth: theme.c_stepper_border_width,
            borderColor: theme.c_stepper_border_color,
        },
        btnPlainRaw: {
            borderWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderRadius: px(theme.c_stepper_height / 2),
            backgroundColor: theme.c_stepper_background_color,
            overflow: 'hidden',
        },
        btnIcon: {
            width: '100%',
            height: '100%',
        },
        countWrapper: {
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        countText: {
            fontWeight: 'bold',
            fontSize: px(theme.c_stepper_plain_font_size),
        },
        /* btnIconWrapper: {
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
        }, */
        inputWrapper: {
            flex: 1,
        },
        input: {
            flex: 1,
            paddingHorizontal: px(4),
        },
        inputRaw: {
            width: '100%',
        },
        inputReadonly: {
            color: theme.c_input_text_color,
        },
    }),
);

export type StepperStyles = ReturnType<typeof withStepperStyles>;
