import React, { useCallback, useRef, forwardRef, useEffect, useState } from 'react';
import { useEnsuredForwardedRef, useDebounceFn } from '@kealm/react-hooks';
import { useNormalizeValue } from '../_hooks';
import { classnames } from '../_utils/base';
import { InputProps } from './types';
import { INPUT_CLEAR_ICON } from '../_images/base64';

/**
 * @description 计算字符数
 * @param str
 * @param isSpec 1中文 = 2字符  1空格 = 1字符
 */
function charCount(str: string, isSpec = false) {
    if (!isSpec) return str.length;

    return str.split('').reduce((count, char) => count + (/[\u4e00-\u9fa5]/.test(char) ? 2 : 1), 0);
}

/**
 * @description 字数裁剪
 * @param str
 * @param length
 * @param isSpec 1中文 = 2字符  1空格 = 1字符
 */
function charClip(str: string, length: number, isSpec = false) {
    if (!isSpec) return str.slice(0, length);

    let nextStr = '';

    str.split('').some(char => {
        const s = nextStr + char;
        if (charCount(s, true) > length) return true;

        nextStr += char;
        return false;
    });
    return nextStr;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        className,
        style,
        defaultValue,
        value,
        width,
        height,
        onClick,
        onChange,
        onFocus,
        onBlur,
        onCompositionStart: _onCompositionStart,
        onCompositionEnd: _onCompositionEnd,
        disabled = false,
        placeholder,
        label,
        allowClear = false,
        focusClear = false,
        onClear,
        size,
        grey = false,
        innerSpace,
        radius,
        maxCount,
        onOverage,
        specialCharCount = false,
        ...restProps
    } = props;

    const inputRef = useEnsuredForwardedRef(ref as React.MutableRefObject<HTMLInputElement>);
    const isCompositionRef = useRef(false);

    const wrapperClassName = classnames(
        'my-input',
        {
            [`my-input--${size}`]: !!size,
            'my-input--grey': grey,
            'is-disabled': disabled,
        },
        className,
    );

    const wrapperStyle = {
        ...style,
        width,
        height,
        paddingLeft: innerSpace,
        paddingRight: innerSpace,
        borderRadius: radius,
    };

    /* ------------------------------ BLOCK: 受控 ------------------------------ */
    const [textValue, setTextValue] = useNormalizeValue({
        defaultProp: defaultValue ?? '',
        prop: value,
        event: onChange,
        isControlled: 'value' in props,
    });

    const onInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (disabled) return;

            setTextValue(e.target.value);
        },
        [disabled, setTextValue],
    );

    /* ------------------------------ BLOCK: 聚焦 ------------------------------ */
    const [isFocus, _setIsFocus] = useState(false);
    // 卡 100ms，否则与点击清空时调用的 focus() 冲突
    const setIsFocus = useDebounceFn((focus: boolean) => _setIsFocus(focus), 100);

    const onInputFocus = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            onFocus?.(e);
            setIsFocus(true);
        },
        [onFocus, setIsFocus],
    );

    /* ------------------------------ BLOCK: 清空 ------------------------------ */
    const onInputClear = useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setTextValue('');
            onClear?.(e);
            inputRef.current?.focus();
        },
        [inputRef, setTextValue, onClear],
    );

    const renderClear = () => {
        if (!allowClear || !textValue) return null;

        if (focusClear && !isFocus) return null;

        return (
            <div className='my-input__clear' onClick={onInputClear}>
                <img src={INPUT_CLEAR_ICON} />
            </div>
        );
    };

    /* ------------------------------ BLOCK: 失焦回调页面位置 ------------------------------ */
    const onInputBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement>) => {
            // 页面高度过小时，防止不回弹 BUG
            setTimeout(() => {
                document.body.scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop || 0;
                document.documentElement.scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop || 0;
            }, 100);
            onBlur?.(e);
            setIsFocus(false);
        },
        [onBlur, setIsFocus],
    );

    /* ------------------------------ BLOCK: 字数裁剪 ------------------------------ */
    const validOverage = useCallback(() => {
        if (maxCount && charCount(textValue ?? '', specialCharCount) > maxCount) {
            onOverage?.();
            // 超额字数裁剪
            const nextValue = charClip(textValue ?? '', maxCount, specialCharCount);
            setTextValue(nextValue);
        }
    }, [maxCount, textValue, specialCharCount, onOverage, setTextValue]);

    const onCompositionStart = useCallback(
        (e: React.CompositionEvent<HTMLInputElement>) => {
            _onCompositionStart?.(e);
            isCompositionRef.current = true;
        },
        [_onCompositionStart],
    );

    const onCompositionEnd = useCallback(
        (e: React.CompositionEvent<HTMLInputElement>) => {
            _onCompositionEnd?.(e);
            isCompositionRef.current = false;
            validOverage();
        },
        [_onCompositionEnd, validOverage],
    );

    useEffect(() => {
        if (!isCompositionRef.current) validOverage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textValue, maxCount]);

    /* ------------------------------ BLOCK: label ------------------------------ */
    const renderLabel = () => {
        if (!label) return null;

        return <div className='my-input__label'>{label}</div>;
    };

    /* const renderInput = () => {
        const inner = (
            <input
                ref={inputRef}
                type='text'
                className='my-input__inner'
                value={textValue}
                onChange={onInputChange}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                placeholder={placeholder}
                disabled={disabled}
                pattern={pattern}
            />
        );
        if (!cursorRight) return inner;

        const virtualClassName = classnames('my-input-virtual', {
            [`my-input-virtual--${size}`]: !!size,
            'my-input-virtual--clearable': allowClear && !textValue,
        });

        return (
            <div className={virtualClassName}>
                {textValue ? (
                    <span className='my-input-virtual__textbox'>{textValue}</span>
                ) : (
                    <span className='my-input-virtual__placeholder'>{placeholder}</span>
                )}
                {isFocus && <span className='my-input-virtual__cursor' />}
                {inner}
            </div>
        );
    }; */

    return (
        <div className={wrapperClassName} style={wrapperStyle} onClick={onClick}>
            {renderLabel()}
            <input
                ref={inputRef}
                type='text'
                className='my-input__inner'
                value={textValue}
                onChange={onInputChange}
                onCompositionStart={onCompositionStart}
                onCompositionEnd={onCompositionEnd}
                onFocus={onInputFocus}
                onBlur={onInputBlur}
                placeholder={placeholder}
                disabled={disabled}
                {...restProps}
            />
            {renderClear()}
        </div>
    );
});

export default Input;

export * from './types';
