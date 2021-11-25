import React, { useState } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import { isAfter, isBefore } from 'date-fns';
import Drawer from '../drawer';
import DatePickerView from '../date-picker-view';
import { DEFAULT_MIN_DATE, DEFAULT_MAX_DATE, normalizeValue } from '../date-picker-view/utils';
import { classnames } from '../_utils/base';
import { DatePickerProps } from './types';

const DatePicker: React.FC<DatePickerProps> = props => {
    const {
        style,
        className,
        defaultValue,
        value,
        onChange,
        visible = false,
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

    const [selectedValue, setSelectedValue] = useState(value ?? defaultValue ?? minDate);

    /* 值是否有效 */
    const isValidValue = (v?: Date): v is Date => {
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

    const onCancelClick = () => {
        onVisibleChange?.(false);
        onCancel?.();
    };

    const onOkClick = () => {
        onVisibleChange?.(false);

        selectedValue && onChange?.(selectedValue);
        onOk?.(selectedValue);
    };

    return (
        <Drawer visible={visible} onVisibleChange={onVisibleChange} {...drawerProps}>
            <div className={classnames('my-date-picker', className)} style={style}>
                <div className='my-date-picker__header'>
                    <div className='my-date-picker__btn' onClick={onCancelClick}>
                        {cancelText}
                    </div>
                    <div className='my-date-picker__title'>{title}</div>
                    <div className='my-date-picker__btn is-ok' onClick={onOkClick}>
                        {okText}
                    </div>
                </div>
                <div className='my-date-picker__view'>
                    <DatePickerView
                        value={selectedValue}
                        onChange={setSelectedValue}
                        minDate={minDate}
                        maxDate={maxDate}
                        {...restProps}
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default DatePicker;
export * from './types';
