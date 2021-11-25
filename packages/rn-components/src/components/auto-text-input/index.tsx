import React, { useContext, useState, forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import { useStyles, useNormalizeValue } from '../../hooks';
import { isEmpty } from '../../utils/base';
import { AutoTextInputProps } from './types';
import { DEFAULT_UI_ROW, FONT_SIZE_CACHE } from './utils';
import { withAutoTextInputStyles } from './style';
import { AutoTextInputStylesContext } from './context';

export const AutoTextInput = forwardRef<TextInput, AutoTextInputProps>((props, ref) => {
    const {
        styles: _styles,
        style,
        defaultValue,
        value,
        onChangeText,
        heightOfTheUIRow = DEFAULT_UI_ROW,
        fontSize,
        minRows,
        maxRows,
        rows,
        onContentSizeChange,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 基本状态 ------------------------------ */
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
    const contextStyles = useContext(AutoTextInputStylesContext);
    const styles = useStyles(withAutoTextInputStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 自适应高、定行数相关 ------------------------------ */
    // 实际 fontSize
    const actualFontSize = fontSize ?? styles.input.fontSize;

    const [contentHeight, setContentHeight] = useState<number>(); // 内容高，用于自适应输入框高度
    const [h1, setH1] = useState<number | undefined>(
        FONT_SIZE_CACHE[actualFontSize]?.lineHeightOfOneRow,
    ); // 1 行时的高度
    const [h2, setH2] = useState<number | undefined>(
        FONT_SIZE_CACHE[actualFontSize]?.lineHeightOfTwoRow,
    ); // 2 行时的高度
    const [top, setTop] = useState(() => {
        const cacheOfH1 = FONT_SIZE_CACHE[actualFontSize]?.lineHeightOfOneRow;
        return cacheOfH1 ? (heightOfTheUIRow - cacheOfH1) / 2 : undefined;
    }); // 输入框定位 top 值

    /* 获取输入框在 n 行时的内容高 */
    const getRowsContentHeight = (n?: number) => {
        if (!n) return;
        // h1, h2 尚未初始完毕前，先返回 undefined
        if (!h1 || !h2) return;
        return h1 + (n - 1) * (h2 - h1);
    };

    const minInputHeight = getRowsContentHeight(minRows);
    const maxInputHeight = getRowsContentHeight(maxRows);

    const fixedRowsInputHeight = getRowsContentHeight(rows);

    /* ------------------------------ BLOCK: TextInput ------------------------------ */
    const baseInputStyles = [styles.input, style];

    const inputStyles = [
        ...baseInputStyles,
        styles.inputPosition,
        {
            top,
            fontSize: actualFontSize,
            // 优先级：rows > min/maxRows
            minHeight: minInputHeight,
            maxHeight: maxInputHeight,
            height: getRowsContentHeight(rows),
        },
    ];

    const renderInput = () => {
        return (
            <TextInput
                ref={ref}
                style={inputStyles}
                multiline
                value={inputValue}
                onChangeText={setInputValue}
                underlineColorAndroid='transparent'
                onContentSizeChange={e => {
                    onContentSizeChange?.(e);
                    // 如果传了 rows，就不需要再去实时更新内容高了，减少 render
                    if (rows) return;
                    // 实时更新内容高
                    const contentSize = e.nativeEvent.contentSize.height;

                    setContentHeight(
                        inputValue === ''
                            ? getRowsContentHeight(minRows) ?? h1 ?? contentSize
                            : contentSize,
                    );
                }}
                {...restProps}
            />
        );
    };

    /* ------------------------------ BLOCK: wrapper ------------------------------ */
    // 适应后的基础高度
    const baseWrapperHeight =
        !isEmpty(contentHeight) && !isEmpty(top) ? contentHeight + 2 * top : undefined;
    // 最小的高度
    const minWrapperHeight =
        !isEmpty(minInputHeight) && !isEmpty(top) ? minInputHeight + 2 * top : undefined;
    // 最大的高度
    const maxWrapperHeight =
        !isEmpty(maxInputHeight) && !isEmpty(top) ? maxInputHeight + 2 * top : undefined;

    const maxLimit =
        !isEmpty(baseWrapperHeight) && !isEmpty(minWrapperHeight)
            ? Math.max(baseWrapperHeight, minWrapperHeight)
            : baseWrapperHeight ?? minWrapperHeight;
    // 自动调节后的高度
    const autoWrapperHeight =
        !isEmpty(maxLimit) && !isEmpty(maxWrapperHeight)
            ? Math.min(maxLimit, maxWrapperHeight)
            : maxLimit ?? maxWrapperHeight;

    // 固定行的高度
    const fixedRowsWrapperHeight =
        !isEmpty(fixedRowsInputHeight) && !isEmpty(top)
            ? fixedRowsInputHeight + 2 * top
            : undefined;

    // 优先级：rows > min/maxRows
    // 由于高度突变是无法避免的，保底一个 UI 一行的高
    const wrapperHeight = fixedRowsWrapperHeight ?? autoWrapperHeight ?? heightOfTheUIRow;
    // console.warn(wrapperHeight, 'wrapperHeight');

    const wrapperStyles = [
        styles.wrapper,
        // top 获取完成前，先隐藏
        isEmpty(top) ? styles.inputHide : null,
        {
            height: wrapperHeight,
        },
    ];

    /* ------------------------------ BLOCK: 辅助容器，计算第 1、2 行的内容高 ------------------------------ */
    const renderAuxiliary = () => {
        // 已经拿到 h1 h2 即可销毁
        if (h1 && h2) return null;

        return (
            <View style={styles.auxiliaryWrapper}>
                {/*  1 行高的辅助输入框 */}
                <TextInput
                    multiline
                    style={baseInputStyles}
                    value={'  '}
                    onContentSizeChange={({
                        nativeEvent: {
                            contentSize: { height: h },
                        },
                    }) => {
                        !top && setTop((heightOfTheUIRow - h) / 2); // 计算定位 top 值
                        !h1 && setH1(h); // 获取第 1 行的高度

                        // 数据缓存
                        FONT_SIZE_CACHE[actualFontSize] = {
                            ...FONT_SIZE_CACHE[actualFontSize],
                            lineHeightOfOneRow: h,
                        };
                    }}
                />
                {/*  2 行高的辅助输入框 */}
                <TextInput
                    multiline
                    style={baseInputStyles}
                    value={'   \n   '}
                    onContentSizeChange={({
                        nativeEvent: {
                            contentSize: { height: h },
                        },
                    }) => {
                        /* --- START: 特殊 Android 机型 --- */
                        // 20 - 19
                        // 19 - 18
                        // 16 - 15.333
                        // 14 - 13.33
                        // 13 - 12.333
                        /* --- END --- */

                        // iOS 会触发 2 次（第一行的高度也会触发，这里判断 actualFontSize * 2 来判断 2 行回调）
                        // 2021.10.21 发现特殊 Android 机型 fontSize 比 h1 还大，actualFontSize * 2 < h 不适用
                        // !h2 && (actualFontSize - 2) * 2 < h && setH2(h); // 获取第 2 行的高度
                        !h2 && (actualFontSize - 1) * 2 <= Math.ceil(h) && setH2(h); // 获取第 2 行的高度

                        // 数据缓存
                        FONT_SIZE_CACHE[actualFontSize] = {
                            ...FONT_SIZE_CACHE[actualFontSize],
                            lineHeightOfTwoRow: h,
                        };
                    }}
                />
            </View>
        );
    };

    return (
        <>
            {/* <Text>{h1}</Text> */}
            {/* <Text>{h2}</Text> */}
            <View style={wrapperStyles}>{renderInput()}</View>
            {renderAuxiliary()}
        </>
    );
});

export * from './types';
export * from './style';
export * from './context';
