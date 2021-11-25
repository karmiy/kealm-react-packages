import React, { useContext, forwardRef } from 'react';
import {
    View,
    TextInput,
    Image,
    TouchableWithoutFeedback,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
} from 'react-native';
import { useEnsuredForwardedRef } from '@kealm/react-hooks';
import { useStyles, useNormalizeValue } from '../../hooks';
import { isBoolean, isEmpty, isFunction } from '../../utils/base';
import { fixIOSTextInputChs } from '../../utils/patch';
import { Text } from '../text';
import { AutoTextInput } from '../auto-text-input';
import { TextareaProps } from './types';
import { withTextareaStyles } from './style';
import { TextareaStylesContext } from './context';

const BaseTextarea = forwardRef<TextInput, TextareaProps>((props, ref) => {
    const {
        styles: _styles,
        style,
        textareaHeight,
        defaultValue,
        value,
        onChangeText,
        editable = true,
        disabled = false,
        grey = false,
        size,
        placeholder,
        placeholderTextColor,
        radius,
        innerSpace,
        heightOfTheUIRow,
        fontSize,
        autoHeight = false,
        rows,
        showCount = true,
        maxCount,
        countShowThreshold = 9,
        onEndEditing: _onEndEditing,
        onOverage,
        clipEndEditing = false,
        tags,
        tagsGapHorizontal,
        tagsGapVertical,
        isTagsOut = false,
        footer,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(TextareaStylesContext);
    const styles = useStyles(withTextareaStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 基本状态 ------------------------------ */
    const textInputRef = useEnsuredForwardedRef(ref as React.MutableRefObject<TextInput>);
    const isDisabled = !(editable && !disabled);
    const isNeedToControlRows = autoHeight || rows; // 有配置 autoHeight 或 rows，代表需要手动控制输入框高度
    const actualFontSize =
        fontSize ?? (size === 'medium' ? styles.mediumInputRaw.fontSize : styles.input.fontSize); // 输入框实际字体大小

    const onValueChange = (v?: string) => {
        onChangeText?.(v ?? '');
    };

    const [inputValue, setInputValue] = useNormalizeValue({
        defaultProp: defaultValue,
        prop: value,
        event: onValueChange,
        isControlled: 'value' in props,
    });

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

    const renderCount = () => {
        if (!maxCount || !showCount) return null;

        const restCount = maxCount - (inputValue?.length ?? 0);

        return (
            <Text style={[styles.count, restCount > countShowThreshold ? styles.countHide : null]}>
                {Math.max(0, restCount)}
            </Text>
        );
    };

    /* ------------------------------ BLOCK: 可点标签 ------------------------------ */
    const renderTags = () => {
        if (!tags?.length) return null;

        return (
            <View style={styles.tagsWrapper}>
                <View
                    style={[
                        styles.tagsContainer,
                        !isEmpty(tagsGapHorizontal)
                            ? { marginHorizontal: -tagsGapHorizontal / 2 }
                            : null,
                        !isEmpty(tagsGapVertical) ? { marginVertical: -tagsGapVertical / 2 } : null,
                    ]}
                >
                    {tags.map(({ key, label, handler }) => {
                        return (
                            <TouchableWithoutFeedback
                                key={key}
                                onPress={() => {
                                    onInputValueChange(
                                        inputValue ? `${inputValue}\n${label}：` : `${label}：`,
                                    );
                                    textInputRef.current?.focus();
                                    handler?.(key, label);
                                }}
                            >
                                <View
                                    style={[
                                        styles.tagsItem,
                                        !isEmpty(tagsGapHorizontal)
                                            ? { paddingHorizontal: tagsGapHorizontal / 2 }
                                            : null,
                                        !isEmpty(tagsGapVertical)
                                            ? { paddingVertical: tagsGapVertical / 2 }
                                            : null,
                                    ]}
                                >
                                    <View style={styles.tagsInner}>
                                        <Image
                                            style={styles.tagsAddIcon}
                                            source={require('../../images/tag-add.png')}
                                        />
                                        <Text style={styles.tagsText}>{label}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })}
                </View>
            </View>
        );
    };

    /* ------------------------------ BLOCK: TextInput ------------------------------ */
    const inputStyles = [
        styles.input,
        isDisabled ? styles.disabledInputText : null,
        size === 'medium' ? styles.mediumInputRaw : null,
        !isEmpty(textareaHeight) ? { height: textareaHeight } : null,
        !isEmpty(fontSize) ? { fontSize } : null,
    ];

    /* 非自适应/非定高的普通输入框 */
    const renderPrimaryInput = () => {
        if (isNeedToControlRows) return null;

        return (
            <TextInput
                ref={textInputRef}
                style={inputStyles}
                multiline
                value={inputValue}
                onChangeText={onInputValueChange}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                editable={!isDisabled}
                underlineColorAndroid='transparent'
                onEndEditing={onEndEditing}
                {...restProps}
            />
        );
    };

    const renderAutoInput = () => {
        /* ---------- 不需要适应高、定行  ---------- */
        if (!isNeedToControlRows) return null;

        const { minRows, maxRows } = isBoolean(autoHeight)
            ? { minRows: undefined, maxRows: undefined }
            : autoHeight;

        return (
            <AutoTextInput
                ref={textInputRef}
                style={inputStyles}
                value={inputValue}
                onChangeText={onInputValueChange}
                placeholder={placeholder}
                placeholderTextColor={placeholderColor}
                editable={!isDisabled}
                heightOfTheUIRow={heightOfTheUIRow}
                fontSize={actualFontSize}
                rows={rows}
                minRows={minRows}
                maxRows={maxRows}
                onEndEditing={onEndEditing}
                {...restProps}
            />
        );
    };

    /* ------------------------------ BLOCK: Wrapper ------------------------------ */
    const wrapperStyles = [
        styles.wrapper,
        styles.paddingHorizontalRaw,
        grey ? styles.greyRaw : null,
        size === 'medium' ? styles.mediumWrapper : null,
        !isEmpty(radius) ? { borderRadius: radius } : null,
        !isEmpty(innerSpace) ? { paddingHorizontal: innerSpace } : null,
        // 如果是自适应高/定行的输入框，wrapper 不再需要上下 padding
        !isNeedToControlRows ? styles.paddingVerticalRaw : null,
        style,
    ];

    return (
        <>
            <View style={wrapperStyles}>
                {/* 普通输入框 */}
                {renderPrimaryInput()}
                {/* 自适应高/定行的输入框 */}
                {renderAutoInput()}
                {/* 倒计数 */}
                {renderCount()}
                {/* 标签 - 内 */}
                {!isTagsOut && renderTags()}
                {/* 底部 */}
                {footer}
            </View>
            {/* 标签 - 内 */}
            {isTagsOut && renderTags()}
        </>
    );
});

export const Textarea = fixIOSTextInputChs(BaseTextarea);
export * from './types';
export * from './style';
export * from './context';
