import React, { useCallback, useRef, useState, useEffect, forwardRef } from 'react';
import { useDidMount, useDidUpdate, useEnsuredForwardedRef } from '@kealm/react-hooks';
import { classnames } from '../_utils/base';
import { useNormalizeValue } from '../_hooks';
import calculateNodeHeight from './calculateNodeHeight';
import { TextareaProps } from './types';
import { TAG_ADD_ICON } from '../_images/base64';

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const {
        className,
        style,
        textareaStyle,
        textareaHeight,
        defaultValue,
        value,
        onClick,
        onChange,
        onBlur,
        onCompositionStart: _onCompositionStart,
        onCompositionEnd: _onCompositionEnd,
        disabled = false,
        size,
        rows,
        placeholder,
        grey = false,
        radius,
        maxCount,
        showCount = true,
        countShowThreshold = 9,
        onOverage,
        tags,
        isTagsOut = false,
        autoHeight = false,
        footer,
        ...restProps
    } = props;

    const textareaRef = useEnsuredForwardedRef(ref as React.MutableRefObject<HTMLTextAreaElement>);

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const wrapperClassName = classnames(
        'my-textarea',
        {
            'my-textarea--grey': grey,
            'my-textarea--medium': size === 'medium',
            'is-disabled': disabled,
        },
        className,
    );

    const wrapperStyle = {
        ...style,
        borderRadius: radius,
    };

    const [textareaStyles, setTextareaStyles] = useState<React.CSSProperties>();

    const elementStyles = {
        ...textareaStyle,
        height: textareaHeight, // 放 textareaStyles 前面，自适应等高需要由 textareaStyles 控制
        ...textareaStyles,
    };

    /* ------------------------------ BLOCK: 受控 ------------------------------ */
    const [textValue, setTextValue] = useNormalizeValue({
        defaultProp: defaultValue ?? '',
        prop: value,
        event: onChange,
        isControlled: 'value' in props,
    });
    const isCompositionRef = useRef(false);

    const resizeTextarea = useCallback(() => {
        if (!autoHeight || !textareaRef.current) return;

        const _autoHeight = autoHeight === true ? {} : autoHeight;
        const { maxRows, minRows } = _autoHeight;
        const _textareaStyle = calculateNodeHeight(textareaRef.current, true, minRows, maxRows);
        setTextareaStyles(_textareaStyle as React.CSSProperties);
    }, [autoHeight, textareaRef]);

    const onTextareaChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!('value' in props) && autoHeight && textareaRef.current) resizeTextarea();

            setTextValue(e.target.value);
        },
        [autoHeight, props, resizeTextarea, setTextValue, textareaRef],
    );

    /* ------------------------------ BLOCK: 自适应高度 ------------------------------ */
    // 用 JSON.stringify(autoHeight) 作为依赖，不能是 autoHeight，因为是个对象，会造成无限执行
    // 初始使用 useLayoutEffect，防止在定位等某些场合下，初始要重新计算重置高度会出现高度抖动问题
    useDidMount(() => {
        if (!autoHeight || !textareaRef.current) return;

        resizeTextarea();
    }, false);

    useDidUpdate(() => {
        if (!textareaRef.current) return;

        if (!autoHeight) {
            setTextareaStyles(undefined);
            return;
        }

        resizeTextarea();
    }, [value, JSON.stringify(autoHeight)]);

    /* ------------------------------ BLOCK: 失焦回滚 ------------------------------ */
    const onTextareaBlur = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            // 页面高度过小时，防止不回弹 BUG
            setTimeout(() => {
                document.documentElement.scrollTop = document.body.scrollTop =
                    document.documentElement.scrollTop || document.body.scrollTop || 0;
            }, 100);
            onBlur?.(e);
        },
        [onBlur],
    );

    /* ------------------------------ BLOCK: tag ------------------------------ */
    const onTagClick = useCallback(
        (tag: string) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            // 尚未有文本直接插入 tag：否则换行
            setTextValue(v => (v ? `${v}\n${tag}：` : `${tag}：`));
            textarea.focus();

            // 滚动至底部，防止插入文本后滚动条位置没有改变导致看不到
            setTimeout(() => {
                textarea.scrollTop = 10000;
            }, 100);
        },
        [setTextValue, textareaRef],
    );

    const renderTags = () => {
        if (!tags || !tags.length) return null;

        const tagsItems = tags.map(tag => {
            const { key, label, handler } = tag;
            return (
                <div
                    key={key}
                    className='my-textarea-tags__item'
                    onClick={() => {
                        onTagClick(label);
                        handler?.(key, label);
                    }}
                >
                    <div className='my-textarea-tags__item-inner'>
                        <img className='icon' src={TAG_ADD_ICON} />
                        <div>{label}</div>
                    </div>
                </div>
            );
        });

        return (
            <div className='my-textarea-tags'>
                <div className='my-textarea-tags__container'>{tagsItems}</div>
            </div>
        );
    };

    /* ------------------------------ BLOCK: 校验字数限制 ------------------------------ */
    const validOverage = useCallback(() => {
        if (maxCount && textValue && textValue.length > maxCount) {
            onOverage?.();
            setTextValue(textValue.slice(0, maxCount));
        }
    }, [maxCount, textValue, onOverage, setTextValue]);

    const onCompositionStart = useCallback(
        (e: React.CompositionEvent<HTMLTextAreaElement>) => {
            _onCompositionStart?.(e);
            isCompositionRef.current = true;
        },
        [_onCompositionStart],
    );

    const onCompositionEnd = useCallback(
        (e: React.CompositionEvent<HTMLTextAreaElement>) => {
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

    const renderCount = () => {
        if (!maxCount || !showCount) return null;

        const len = textValue?.length ?? 0;
        const restCount = maxCount - len;

        // 当前剩余可输入字数
        return (
            <div
                className={classnames('my-textarea__count', {
                    'is-hide': restCount > countShowThreshold,
                })}
            >
                <span>{Math.max(0, maxCount - len)}</span>
            </div>
        );
    };

    return (
        <>
            <div className={wrapperClassName} style={wrapperStyle}>
                <div className='my-textarea__control' onClick={onClick}>
                    <textarea
                        ref={textareaRef}
                        style={elementStyles}
                        value={textValue}
                        onChange={onTextareaChange}
                        onCompositionStart={onCompositionStart}
                        onCompositionEnd={onCompositionEnd}
                        rows={rows}
                        placeholder={placeholder}
                        onBlur={onTextareaBlur}
                        disabled={disabled}
                        {...restProps}
                    />
                </div>
                {/* 倒计数 */}
                {renderCount()}
                {/* 标签 - 内 */}
                {!isTagsOut && renderTags()}
                {/* 底部 */}
                {footer}
            </div>
            {/* 标签 - 内 */}
            {isTagsOut && renderTags()}
        </>
    );
});

export default Textarea;

export * from './types';
