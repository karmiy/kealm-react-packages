import React, { useState, useContext, useCallback, forwardRef } from 'react';
import {
    View,
    TextInput,
    Image,
    GestureResponderEvent,
    TouchableWithoutFeedback,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
    TextInputFocusEventData,
} from 'react-native';
import { useDebounceFn } from '@kealm/react-hooks';
import { useNormalizeValue, useStyles } from '../../hooks';
import { isEmpty, isString, isFunction } from '../../utils/base';
import { fixIOSTextInputChs } from '../../utils/patch';
import { Text } from '../text';
import { InputProps } from './types';
import { withInputStyles } from './style';
import { InputStylesContext } from './context';

const BaseInput = forwardRef<TextInput, InputProps>((props, ref) => {
    const {
        styles: _styles,
        style,
        defaultValue,
        value,
        onChangeText,
        editable = true,
        disabled = false,
        size,
        fontSize,
        grey = false,
        placeholder,
        placeholderTextColor,
        label,
        allowClear = false,
        focusClear = false,
        onClear,
        onFocus,
        onBlur,
        width,
        height,
        innerSpace,
        radius,
        maxCount,
        onEndEditing: _onEndEditing,
        onOverage,
        clipEndEditing = true,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 状态 ------------------------------ */
    const isDisabled = !(editable && !disabled);
    const onValueChange = (v?: string) => {
        onChangeText?.(v ?? '');
    };

    const [inputValue, setInputValue] = useNormalizeValue({
        defaultProp: defaultValue,
        prop: value,
        event: onValueChange,
        isControlled: 'value' in props,
    });

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(InputStylesContext);
    const styles = useStyles(withInputStyles, contextStyles, _styles);

    const wrapperStyles = [
        styles.wrapper,
        grey ? styles.greyRaw : null,
        size === 'large' ? styles.largeRaw : null,
        style,
        !isEmpty(width) ? { width } : null,
        !isEmpty(height) ? { height } : null,
        !isEmpty(innerSpace) ? { paddingHorizontal: innerSpace } : null,
        !isEmpty(radius) ? { borderRadius: radius } : null,
    ];

    const inputStyles = [
        styles.input,
        isDisabled ? styles.disabledInputText : null,
        size === 'large' ? styles.largeInputRaw : null,
        !isEmpty(fontSize) ? { fontSize } : null,
    ];

    /* ------------------------------ BLOCK: placeholder 颜色 ------------------------------ */
    const {
        disabledPlaceholderText: { color: disabledColor },
        placeholderText: { color },
    } = styles;
    const placeholderColor = placeholderTextColor ?? (isDisabled ? disabledColor : color);

    /* ------------------------------ BLOCK: 字数限制 ------------------------------ */
    const onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
        _onEndEditing?.(e);

        // 限制 maxCount 的方式是结束编辑时裁剪
        if (clipEndEditing && maxCount && inputValue && inputValue.length > maxCount) {
            onOverage?.();
            setInputValue(inputValue.slice(0, maxCount));
        }
    };

    const onInputValueChange: React.Dispatch<React.SetStateAction<string>> = v => {
        // 如果限制 maxCount 的方式是结束编辑时裁剪，则不需要在 onValueChange 操作裁剪
        if (clipEndEditing) {
            setInputValue(v);
            return;
        }
        if (isFunction(v)) {
            setInputValue(prev => {
                const nextValue = v(prev);
                if (maxCount && nextValue.length > maxCount) {
                    onOverage?.();
                    return nextValue.slice(0, maxCount);
                }
                return nextValue;
            });
            return;
        }
        if (maxCount && v.length > maxCount) {
            onOverage?.();
            setInputValue(v.slice(0, maxCount));
            return;
        }
        setInputValue(v);
    };

    /* ------------------------------ BLOCK: render label ------------------------------ */
    const renderLabel = () => {
        if (!label) return null;

        return (
            <View style={styles.labelWrapper}>
                {isString(label) ? <Text>{label}</Text> : label}
            </View>
        );
    };

    /* ------------------------------ BLOCK: 聚/失焦 ------------------------------ */
    const [isFocus, _setIsFocus] = useState(false);
    // RN 卡 30ms
    const setIsFocus = useDebounceFn((focus: boolean) => _setIsFocus(focus), 30);

    const onInputFocus = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onFocus?.(e);
            setIsFocus(true);
        },
        [onFocus, setIsFocus],
    );

    const onInputBlur = useCallback(
        (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
            onBlur?.(e);
            setIsFocus(false);
        },
        [onBlur, setIsFocus],
    );

    /* ------------------------------ BLOCK: render clearable ------------------------------ */
    const onClearClick = useCallback(
        (e: GestureResponderEvent) => {
            setInputValue('');
            onClear?.(e);
        },
        [setInputValue, onClear],
    );

    const renderClearable = () => {
        if (!allowClear) return null;

        if (!inputValue) return null;

        if (focusClear && !isFocus) return null;

        return (
            <TouchableWithoutFeedback onPress={onClearClick}>
                <View style={styles.clearWrapper}>
                    <Image
                        style={styles.clearImage}
                        source={require('../../images/input-clear.png')}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <View style={wrapperStyles}>
            {/* label */}
            {renderLabel()}
            {/* input */}
            <TextInput
                ref={ref}
                style={inputStyles}
                value={inputValue}
                onChangeText={onInputValueChange}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                editable={!isDisabled}
                underlineColorAndroid='transparent'
                textAlignVertical='center'
                onEndEditing={onEndEditing}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                {...restProps}
            />
            {/* clearable */}
            {renderClearable()}
        </View>
    );
});

export const Input = fixIOSTextInputChs(BaseInput);
export * from './types';
export * from './style';
export * from './context';
