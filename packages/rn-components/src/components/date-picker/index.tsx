import React, { useContext, useCallback, useState, useRef } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { isAfter, isBefore } from 'date-fns';
import { useDidUpdate, usePrevious } from '@kealm/react-hooks';
import { useStyles } from '../../hooks';
import { isEmpty, isString } from '../../utils/base';
import { Text } from '../text';
import { Drawer } from '../drawer';
import {
    DatePickerView,
    DEFAULT_MIN_DATE,
    DEFAULT_MAX_DATE,
    normalizeValue,
    DatePickerViewRef,
} from '../date-picker-view';
import { DatePickerProps } from './types';
import { withDatePickerStyles } from './style';
import { DatePickerStylesContext } from './context';

export const DatePicker: React.FC<DatePickerProps> = props => {
    const {
        styles: _styles,
        datePickerViewStyles,
        defaultValue,
        value,
        onChange,
        visible,
        onVisibleChange,
        title,
        cancelText = '取消',
        onCancel,
        okText = '确定',
        onOk,
        drawerProps,
        minDate = DEFAULT_MIN_DATE,
        maxDate = DEFAULT_MAX_DATE,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(DatePickerStylesContext);
    const styles = useStyles(withDatePickerStyles, contextStyles, _styles);

    /* ------------------------------ BLOCK: 状态受控 ------------------------------ */
    const datePickerViewRef = useRef<DatePickerViewRef>(null);
    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? minDate);

    /* 值是否有效 */
    const isValidValue = (v?: Date) => {
        if (!v) return false;

        if (isAfter(v, maxDate)) return false;
        if (isBefore(v, minDate)) return false;

        return true;
    };

    /* value 与内部 selectedValue 受控关系 */
    useDidUpdate(() => {
        // value 有值以 value 为主
        value &&
            value !== selectedValue &&
            setSelectedValue(normalizeValue(value, minDate, maxDate));
        // value 没有值，判断有没有默认值，默认值有效就以默认值为主，没有就取最小值
        !value && setSelectedValue(isValidValue(defaultValue) ? defaultValue : minDate);
    }, [value]);

    useDidUpdate(() => {
        // 默认值改变时，如果当前 value 不是有效值，但 defaultValue 有效
        if (isValidValue(value)) return;

        setSelectedValue(isValidValue(defaultValue) ? defaultValue : minDate);
    }, [defaultValue]);

    useDidUpdate(() => {
        if (!visible) return;

        // value/defaultValue 有效，打开时不对齐应更新（如滚了记下，没点确定，关掉再打开）
        if (value) {
            value !== selectedValue && setSelectedValue(normalizeValue(value, minDate, maxDate));
            return;
        }

        if (isValidValue(defaultValue)) {
            selectedValue !== defaultValue && setSelectedValue(defaultValue);
            return;
        }

        selectedValue !== minDate && setSelectedValue(minDate);
    }, [visible]);

    /* ------------------------------ BLOCK: 列表重绘滚动 ------------------------------ */
    /* 列表突变时（min、max 变更时列表数据变化重绘）*/
    // ScrollView 在 display: none 时无法滚到指定位置（貌似需要显示后 RN 才会进行重构）
    // 如果隐藏过程中列表数据变更，应该在 visible 显示时手动执行一次 handleScroll
    const prevMinDate = usePrevious(minDate);
    const prevMaxDate = usePrevious(maxDate);
    const isListMutateRef = useRef(false); // 列表是否在隐藏时发生突变

    /* 记录最小/最大日期突变 */
    useDidUpdate(() => {
        if (visible) return;

        if (
            prevMinDate.getTime() !== minDate.getTime() ||
            prevMaxDate.getTime() !== maxDate.getTime()
        ) {
            isListMutateRef.current = true;
        }
    }, [minDate, maxDate]);

    useDidUpdate(() => {
        if (!visible) return;

        // getTime 判断变化更好，可能传递进来是个 new Date('xxxx') 非常量，每次引用不同
        if (isListMutateRef.current) {
            isListMutateRef.current = false;
            setTimeout(() => datePickerViewRef.current.handleScroll('year'), 50);
            setTimeout(() => datePickerViewRef.current.handleScroll('month'), 50);
            setTimeout(() => datePickerViewRef.current.handleScroll('date'), 50);
            setTimeout(() => datePickerViewRef.current.handleScroll('hours'), 50);
            setTimeout(() => datePickerViewRef.current.handleScroll('minutes'), 50);
        }
    }, [visible]);

    /* ------------------------------ BLOCK: 取消按钮部分 ------------------------------ */
    const onCancelClick = useCallback(() => {
        onVisibleChange?.(false);
        onCancel?.();
    }, [onVisibleChange, onCancel]);

    const renderCancelBtn = () => {
        return (
            <TouchableWithoutFeedback onPress={onCancelClick}>
                <View style={styles.btn}>
                    {isString(cancelText) ? <Text style={styles.btnText}>{cancelText}</Text> : null}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /* ------------------------------ BLOCK: 确定按钮部分 ------------------------------ */
    const onOkClick = useCallback(() => {
        onVisibleChange?.(false);

        selectedValue && onChange?.(selectedValue);
        onOk?.(selectedValue);
    }, [onVisibleChange, onOk, selectedValue, onChange]);

    const renderOkBtn = () => {
        return (
            <TouchableWithoutFeedback onPress={onOkClick}>
                <View style={styles.btn}>
                    {isString(okText) ? (
                        <Text style={[styles.btnText, styles.okRaw]}>{okText}</Text>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
        );
    };

    /* ------------------------------ BLOCK: 标题部分 ------------------------------ */
    const renderTitle = () => {
        if (isEmpty(title)) return <View style={styles.title} />;

        return (
            <View style={styles.title}>
                {isString(title) ? <Text style={styles.titleText}>{title}</Text> : title}
            </View>
        );
    };

    return (
        <Drawer visible={visible} onVisibleChange={onVisibleChange} {...drawerProps}>
            <View style={styles.wrapper}>
                {/* 头部 */}
                <View style={styles.header}>
                    {/* 取消按钮 */}
                    {renderCancelBtn()}
                    {/* 标题 */}
                    {renderTitle()}
                    {/* 确定按钮 */}
                    {renderOkBtn()}
                </View>
                <View style={styles.view}>
                    <DatePickerView
                        ref={datePickerViewRef}
                        styles={datePickerViewStyles}
                        value={selectedValue}
                        onChange={setSelectedValue}
                        minDate={minDate}
                        maxDate={maxDate}
                        {...restProps}
                    />
                </View>
            </View>
        </Drawer>
    );
};

export * from './types';
export * from './style';
export * from './context';
