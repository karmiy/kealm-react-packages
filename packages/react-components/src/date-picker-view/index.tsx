import React, { useState, useMemo } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import { isAfter, isBefore } from 'date-fns';
import { useDatePicker } from '../_hooks';
import PickerView from '../picker-view';
import { classnames } from '../_utils/base';
import {
    DEFAULT_MIN_DATE,
    DEFAULT_MAX_DATE,
    YEAR_PICKER_TYPES,
    MONTH_PICKER_TYPES,
    DATE_PICKER_TYPES,
    HOURS_PICKER_TYPES,
    MINUTES_PICKER_TYPES,
    DEFAULT_UNIT,
    mergeNextDate,
    normalizeValue,
} from './utils';

import { DatePickerViewProps } from './types';

// Note
// 数据变化时：（value、defaultValue 等）
// value 有值，以 value 为主
// value 无值，defaultValue 为主
// defaultValue 也无值，滚动回 minDate

const DatePickerView: React.FC<DatePickerViewProps> = props => {
    const {
        style,
        className,
        defaultValue,
        value,
        onChange,
        maxDate = DEFAULT_MAX_DATE,
        minDate = DEFAULT_MIN_DATE,
        type = 'date',
        unit = DEFAULT_UNIT,
        pickerViewProps,
        ...restProps
    } = props;

    const [selectedValue, setSelectedValue] = useState<Date>(value ?? defaultValue ?? minDate);

    const {
        year: yearUnit,
        month: monthUnit,
        date: dateUnit,
        hours: hoursUnit,
        minutes: minutesUnit,
    } = unit;

    /* value 与内部 selectedValue 受控关系 */
    useDidUpdate(() => {
        value !== selectedValue &&
            setSelectedValue(normalizeValue(value ?? defaultValue ?? minDate, minDate, maxDate));
    }, [value]);

    useDidUpdate(() => {
        // 默认值改变时，如果当前 value 是空的，则更新为 defaultValue
        !value && setSelectedValue(normalizeValue(defaultValue ?? minDate, minDate, maxDate));
    }, [defaultValue]);

    // TODO:
    // 不能用 selectedValue 的改变来驱动 onChange 回调
    // 因为存在场景，value 置为 undefined，更新了 selectedValue，这时 selectedValue 更新 Date 值 !== value，会触发这个 effect
    /* useDidUpdate(() => {
        selectedValue !== value && onChange?.(selectedValue);
    }, [selectedValue]); */

    useDidUpdate(() => {
        // 超出范围需回滚
        isAfter(selectedValue, maxDate) && (setSelectedValue(maxDate), onChange?.(maxDate));
        isBefore(selectedValue, minDate) && (setSelectedValue(minDate), onChange?.(minDate));
    }, [maxDate, minDate]);

    /* ------------------------------ BLOCK: 触发日期更新 ------------------------------ */
    const fireValueChange = (
        fireType: 'year' | 'month' | 'date' | 'hours' | 'minutes',
        num: number,
    ) => {
        const nextValue = mergeNextDate({
            type: fireType,
            current: selectedValue,
            nextValue: num,
            minDate,
            maxDate,
        });
        if (nextValue === selectedValue) return;

        setSelectedValue(nextValue);

        // TODO:(rn 那后续再考虑要不要同步调整，此临界场景影响不大)
        // onChange 不放 selectedValue
        onChange?.(nextValue);
    };

    /* ------------------------------ BLOCK: date-picker state ------------------------------ */
    const {
        // year
        minYear,
        maxYear,
        selectedYear,
        // month
        maxMonth,
        minMonth,
        selectedMonth,
        // day
        maxDay,
        minDay,
        selectedDate,
        // hours
        maxHours,
        minHours,
        selectedHours,
        // minutes
        maxMinutes,
        minMinutes,
        selectedMinutes,
    } = useDatePicker({
        selectedValue,
        maxDate,
        minDate,
    });

    /* ------------------------------ BLOCK: 年份 ------------------------------ */
    const isShowYearPicker = YEAR_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 年份列表 items */
    const yearItems = useMemo(() => {
        if (!isShowYearPicker) return;

        return [...Array(maxYear - minYear + 1).keys()].map(index => {
            const year = index + minYear;

            return {
                label: year + (yearUnit === null ? '' : yearUnit ?? DEFAULT_UNIT.year),
                value: year,
            };
        });
    }, [maxYear, minYear, isShowYearPicker, yearUnit]);

    /* 年份 picker */
    const renderYearPicker = () => {
        if (!isShowYearPicker) return null;

        return (
            <div className='my-date-picker-view__item'>
                <PickerView
                    data={yearItems}
                    value={selectedYear}
                    onChange={v => fireValueChange('year', v)}
                    {...pickerViewProps}
                />
            </div>
        );
    };

    /* ------------------------------ BLOCK: 月份 ------------------------------ */
    const isShowMonthPicker = MONTH_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 月份列表 items */
    const monthItems = useMemo(() => {
        if (!isShowMonthPicker) return;

        return [...Array(maxMonth - minMonth + 1).keys()].map(index => {
            const month = index + minMonth;

            return {
                label: month + (monthUnit === null ? '' : monthUnit ?? DEFAULT_UNIT.month),
                value: month,
            };
        });
    }, [maxMonth, minMonth, isShowMonthPicker, monthUnit]);

    /* 月份 picker */
    const renderMonthPicker = () => {
        if (!isShowMonthPicker) return null;

        return (
            <div className='my-date-picker-view__item'>
                <PickerView
                    data={monthItems}
                    value={selectedMonth}
                    onChange={v => fireValueChange('month', v)}
                    {...pickerViewProps}
                />
            </div>
        );
    };

    /* ------------------------------ BLOCK: 日期 ------------------------------ */
    const isShowDatePicker = DATE_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 日列表 items */
    const dateItems = useMemo(() => {
        if (!isShowDatePicker) return;

        return [...Array(maxDay - minDay + 1).keys()].map(index => {
            const date = index + minDay;

            return {
                label: date + (dateUnit === null ? '' : dateUnit ?? DEFAULT_UNIT.date),
                value: date,
            };
        });
    }, [maxDay, minDay, isShowDatePicker, dateUnit]);

    /* 日期 picker */
    const renderDatePicker = () => {
        if (!isShowDatePicker) return null;

        return (
            <div className='my-date-picker-view__item'>
                <PickerView
                    data={dateItems}
                    value={selectedDate}
                    onChange={v => fireValueChange('date', v)}
                    {...pickerViewProps}
                />
            </div>
        );
    };

    /* ------------------------------ BLOCK: 时 ------------------------------ */
    const isShowHoursPicker = HOURS_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 小时列表 items */
    const hoursItems = useMemo(() => {
        if (!isShowHoursPicker) return;

        return [...Array(maxHours - minHours + 1).keys()].map(index => {
            const hours = index + minHours;

            return {
                label: hours + (hoursUnit === null ? '' : hoursUnit ?? DEFAULT_UNIT.hours),
                value: hours,
            };
        });
    }, [isShowHoursPicker, maxHours, minHours, hoursUnit]);

    /* 小时 picker */
    const renderHoursPicker = () => {
        if (!isShowHoursPicker) return null;

        return (
            <div className='my-date-picker-view__item'>
                <PickerView
                    data={hoursItems}
                    value={selectedHours}
                    onChange={v => fireValueChange('hours', v)}
                    {...pickerViewProps}
                />
            </div>
        );
    };

    /* ------------------------------ BLOCK: 分 ------------------------------ */
    const isShowMinutesPicker = MINUTES_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 分钟列表 items */
    const minutesItems = useMemo(() => {
        if (!isShowMinutesPicker) return;

        return [...Array(maxMinutes - minMinutes + 1).keys()].map(index => {
            const minutes = index + minMinutes;

            return {
                label: minutes + (minutesUnit === null ? '' : minutesUnit ?? DEFAULT_UNIT.minutes),
                value: minutes,
            };
        });
    }, [isShowMinutesPicker, maxMinutes, minMinutes, minutesUnit]);

    /* 分钟 picker */
    const renderMinutesPicker = () => {
        if (!isShowMinutesPicker) return null;

        return (
            <div className='my-date-picker-view__item'>
                <PickerView
                    data={minutesItems}
                    value={selectedMinutes}
                    onChange={v => fireValueChange('minutes', v)}
                    {...pickerViewProps}
                />
            </div>
        );
    };

    return (
        <div
            className={classnames(
                'my-date-picker-view',
                { 'is-crowded': type === 'datetime' || type === 'datehour' },
                className,
            )}
            style={style}
            {...restProps}
        >
            {/* 年份 picker */}
            {renderYearPicker()}
            {/* 月份 picker */}
            {renderMonthPicker()}
            {/* 日期 picker */}
            {renderDatePicker()}
            {/* 小时 picker */}
            {renderHoursPicker()}
            {/* 分钟 picker */}
            {renderMinutesPicker()}
        </div>
    );
};

export default DatePickerView;
export * from './types';
