import React, { useMemo, useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useStyles } from '../../hooks';
import { Input } from '../input';
import { Text } from '../text';
import { isEmpty } from '../../utils/base';
import { useStepper } from './useStepper';
import { StepperProps } from './types';
import { withStepperStyles } from './style';
import { StepperStylesContext } from './context';
import {
    INCREASE_ICON,
    INCREASE_DISABLED_ICON,
    INCREASE_PLAIN_ICON,
    INCREASE_PLAIN_DISABLED_ICON,
    DECREASE_ICON,
    DECREASE_DISABLED_ICON,
    DECREASE_PLAIN_ICON,
    DECREASE_PLAIN_DISABLED_ICON,
} from './utils';

export const Stepper: React.FC<StepperProps> = props => {
    const {
        style,
        styles: _styles,
        width,
        height,
        defaultValue,
        value,
        onChange,
        plain = false,
        max,
        min,
        step,
        disabled,
        precision,
        formatter,
        parser,
        readonly = false,
        fontSize,
        ...restProps
    } = props;

    const contextStyles = useContext(StepperStylesContext);
    const styles = useStyles(withStepperStyles, contextStyles, _styles);
    const btnStyles = {
        ...(!isEmpty(height) ? { width: height } : {}),
        ...(!isEmpty(height) && plain ? { borderRadius: +height / 2 } : {}),
    };

    const {
        inputValue,
        onInputChange,
        isOverMax,
        isBelowMin,
        onIncrease,
        onDecrease,
        onFocus,
        onBlur,
    } = useStepper({
        defaultValue,
        value,
        onChange,
        max,
        min,
        step,
        disabled,
        precision,
        formatter,
        parser,
    });

    const renderDecreaseBtn = () => {
        const isDisabled = disabled || isBelowMin;
        const iconSource = plain
            ? isDisabled
                ? DECREASE_PLAIN_DISABLED_ICON
                : DECREASE_PLAIN_ICON
            : isDisabled
            ? DECREASE_DISABLED_ICON
            : DECREASE_ICON;

        return (
            <TouchableOpacity
                style={[
                    styles.btnWrapper,
                    styles.btnDecrease,
                    plain ? styles.btnPlainRaw : null,
                    btnStyles,
                ]}
                activeOpacity={1}
                onPress={onDecrease}
                disabled={isDisabled}
            >
                <Image style={styles.btnIcon} source={iconSource} />
            </TouchableOpacity>
        );
    };

    const renderIncreaseBtn = () => {
        const isDisabled = disabled || isOverMax;
        const iconSource = plain
            ? isDisabled
                ? INCREASE_PLAIN_DISABLED_ICON
                : INCREASE_PLAIN_ICON
            : isDisabled
            ? INCREASE_DISABLED_ICON
            : INCREASE_ICON;

        return (
            <TouchableOpacity
                style={[
                    styles.btnWrapper,
                    styles.btnIncrease,
                    plain ? styles.btnPlainRaw : null,
                    btnStyles,
                ]}
                activeOpacity={1}
                onPress={onIncrease}
                disabled={isDisabled}
            >
                <Image style={styles.btnIcon} source={iconSource} />
            </TouchableOpacity>
        );
    };

    const renderCountView = () => {
        if (plain) {
            return (
                <View style={[styles.countWrapper]}>
                    <Text style={[styles.countText, !isEmpty(fontSize) ? { fontSize } : null]}>
                        {inputValue}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.inputWrapper}>
                <Input
                    styles={{
                        ...(readonly
                            ? {
                                  disabledInputText: styles.inputReadonly,
                              }
                            : null),
                        input: styles.inputRaw,
                    }}
                    style={styles.input}
                    value={inputValue}
                    onChangeText={onInputChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    disabled={disabled || readonly}
                    textAlign='center'
                />
            </View>
        );
    };

    return (
        <View
            style={[
                styles.wrapper,
                plain ? styles.plainRaw : null,
                style,
                width ? { width } : null,
                height ? { height } : null,
            ]}
            {...restProps}
        >
            {renderDecreaseBtn()}
            {renderCountView()}
            {renderIncreaseBtn()}
        </View>
    );
};

export * from './types';
export * from './style';
export * from './context';
