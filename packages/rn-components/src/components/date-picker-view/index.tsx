import React, {
    useContext,
    useCallback,
    useMemo,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import { View } from 'react-native';
import { lastDayOfMonth, isAfter, isBefore } from 'date-fns';
import { useDidUpdate, usePrevious } from '@kealm/react-hooks';
import { useStyles } from '../../hooks';
import { PickerView } from '../picker-view';
import { PickerViewRef } from '../picker-view/types';
import { DatePickerViewProps, DatePickerViewRef } from './types';
import { withDatePickerViewStyles } from './style';
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
import { DatePickerViewStylesContext } from './context';
import { noop } from '../../utils/base';

export const DatePickerView = forwardRef<DatePickerViewRef, DatePickerViewProps>((props, ref) => {
    const {
        styles: _styles,
        style,
        value,
        onChange,
        maxDate = DEFAULT_MAX_DATE,
        minDate = DEFAULT_MIN_DATE,
        type = 'date',
        unit = DEFAULT_UNIT,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(DatePickerViewStylesContext);
    const styles = useStyles(withDatePickerViewStyles, contextStyles, _styles);

    const wrapperStyles = [styles.wrapper, style];

    /* ------------------------------ BLOCK: 状态 ------------------------------ */
    const [selectedValue, setSelectedValue] = useState<Date>(value ?? minDate);
    const prevSelectedValue = usePrevious(selectedValue);
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
            setSelectedValue(normalizeValue(value ?? minDate, minDate, maxDate));
    }, [value]);

    useDidUpdate(() => {
        selectedValue !== value && onChange?.(selectedValue);
    }, [selectedValue]);

    useDidUpdate(() => {
        // 超出范围需回滚
        isAfter(selectedValue, maxDate) && setSelectedValue(maxDate);
        isBefore(selectedValue, minDate) && setSelectedValue(minDate);
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

        // console.warn(selectedValue.toLocaleString(), nextValue.toLocaleString(), fireType, num);
        setSelectedValue(nextValue);

        // onChange?.(nextValue);
    };

    /* ------------------------------ BLOCK: 年份 ------------------------------ */
    const yearPickerRef = useRef<PickerViewRef>(null);
    const selectedYear = selectedValue.getFullYear();
    const isShowYearPicker = YEAR_PICKER_TYPES.includes(type); // 是否显示 picker
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();

    /* 年份列表 items */
    const yearItems = useMemo(() => {
        if (!isShowYearPicker) return null;

        return [...Array(maxYear - minYear + 1).keys()].map(index => {
            const year = index + minYear;
            return (
                <PickerView.Item
                    key={year}
                    label={year + (yearUnit === null ? '' : yearUnit ?? DEFAULT_UNIT.year)}
                    value={year}
                />
            );
        });
    }, [maxYear, minYear, isShowYearPicker, yearUnit]);

    /* 年份 picker */
    const renderYearPicker = () => {
        if (!isShowYearPicker) return null;

        return (
            <View style={styles.item}>
                <PickerView
                    ref={yearPickerRef}
                    selectedValue={selectedYear}
                    onValueChange={v => fireValueChange('year', v)}
                >
                    {yearItems}
                </PickerView>
            </View>
        );
    };

    /* 列表突变时手动触发调整滚动位置（选中项没变，但是列表却变了，这时 PickerView 内部不会调整滚动位置） */
    useDidUpdate(() => {
        if (prevSelectedValue?.getFullYear() !== selectedValue.getFullYear()) return;

        // yearPickerRef.current?.handleScroll();
        setTimeout(yearPickerRef.current?.handleScroll ?? noop, 50);
    }, [maxYear, minYear]);

    /* ------------------------------ BLOCK: 月份 ------------------------------ */
    const monthPickerRef = useRef<PickerViewRef>(null);
    // 当前选中的是不是最大/小年（该变量提至外部可以减少 renderMonthItems render 次数）
    const isSelectedMaxYear = selectedYear === maxDate.getFullYear();
    const isSelectedMinYear = selectedYear === minDate.getFullYear();
    // 通常情况都是 1-12 月，选中刚好至最大/小年份时需要注意最大/小月份
    const maxMonth = isSelectedMaxYear ? maxDate.getMonth() + 1 : 12;
    const minMonth = isSelectedMinYear ? minDate.getMonth() + 1 : 1;
    const selectedMonth = selectedValue.getMonth() + 1;
    const isShowMonthPicker = MONTH_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 月份列表 items */
    const monthItems = useMemo(() => {
        if (!isShowMonthPicker) return null;

        return [...Array(maxMonth - minMonth + 1).keys()].map(index => {
            const month = index + minMonth;
            return (
                <PickerView.Item
                    key={month}
                    label={month + (monthUnit === null ? '' : monthUnit ?? DEFAULT_UNIT.month)}
                    value={month}
                />
            );
        });
    }, [maxMonth, minMonth, isShowMonthPicker, monthUnit]);

    /* 月份 picker */
    const renderMonthPicker = () => {
        if (!isShowMonthPicker) return null;

        return (
            <View style={styles.item}>
                <PickerView
                    ref={monthPickerRef}
                    selectedValue={selectedMonth}
                    onValueChange={v => fireValueChange('month', v)}
                >
                    {monthItems}
                </PickerView>
            </View>
        );
    };

    /* 列表突变时手动触发调整滚动位置（选中项没变，但是列表却变了，这时 PickerView 内部不会调整滚动位置） */
    useDidUpdate(() => {
        if (prevSelectedValue?.getMonth() !== selectedValue.getMonth()) return;

        // monthPickerRef.current?.handleScroll();
        setTimeout(monthPickerRef.current?.handleScroll ?? noop, 50);
    }, [maxMonth, minMonth]);

    /* ------------------------------ BLOCK: 日期 ------------------------------ */
    const datePickerRef = useRef<PickerViewRef>(null);
    // 当前选中的是不是最大/小年月
    const isSelectedMaxYearMonth = isSelectedMaxYear && selectedMonth === maxDate.getMonth() + 1;
    const isSelectedMinYearMonth = isSelectedMinYear && selectedMonth === minDate.getMonth() + 1;
    // 获取当月的最后/前一天（该变量提至外部可以减少 renderDateItems render 次数）
    const maxDay = isSelectedMaxYearMonth
        ? maxDate.getDate()
        : lastDayOfMonth(selectedValue).getDate();
    const minDay = isSelectedMinYearMonth ? minDate.getDate() : 1;
    const selectedDate = selectedValue.getDate();
    const isShowDatePicker = DATE_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 日列表 items */
    const dateItems = useMemo(() => {
        if (!isShowDatePicker) return null;

        return [...Array(maxDay - minDay + 1).keys()].map(index => {
            const date = index + minDay;
            return (
                <PickerView.Item
                    key={date}
                    label={date + (dateUnit === null ? '' : dateUnit ?? DEFAULT_UNIT.date)}
                    value={date}
                />
            );
        });
    }, [maxDay, minDay, isShowDatePicker, dateUnit]);

    /* 日期 picker */
    const renderDatePicker = () => {
        if (!isShowDatePicker) return null;

        return (
            <View style={styles.item}>
                <PickerView
                    ref={datePickerRef}
                    selectedValue={selectedDate}
                    onValueChange={v => fireValueChange('date', v)}
                >
                    {dateItems}
                </PickerView>
            </View>
        );
    };

    /* 列表突变时手动触发调整滚动位置（选中项没变，但是列表却变了，这时 PickerView 内部不会调整滚动位置） */
    useDidUpdate(() => {
        if (prevSelectedValue?.getDate() !== selectedValue.getDate()) return;

        // datePickerRef.current?.handleScroll();
        setTimeout(datePickerRef.current?.handleScroll ?? noop, 50);
    }, [maxDay, minDay]);

    /* ------------------------------ BLOCK: 时 ------------------------------ */
    const hoursPickerRef = useRef<PickerViewRef>(null);
    // 当前选中的是不是最大/小年月日
    const isSelectedMaxYearMonthDate = isSelectedMaxYearMonth && selectedDate === maxDate.getDate();
    const isSelectedMinYearMonthDate = isSelectedMinYearMonth && selectedDate === minDate.getDate();
    // 获取最大/小的小时数（该变量提至外部可以减少 renderHoursItems render 次数）
    const maxHours = isSelectedMaxYearMonthDate ? maxDate.getHours() : 23;
    const minHours = isSelectedMinYearMonthDate ? minDate.getHours() : 0;
    const selectedHours = selectedValue.getHours();
    const isShowHoursPicker = HOURS_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 小时列表 items */
    const hoursItems = useMemo(() => {
        if (!isShowHoursPicker) return null;

        return [...Array(maxHours - minHours + 1).keys()].map(index => {
            const hours = index + minHours;
            return (
                <PickerView.Item
                    key={hours}
                    label={hours + (hoursUnit === null ? '' : hoursUnit ?? DEFAULT_UNIT.hours)}
                    value={hours}
                />
            );
        });
    }, [isShowHoursPicker, maxHours, minHours, hoursUnit]);

    /* 小时 picker */
    const renderHoursPicker = () => {
        if (!isShowHoursPicker) return null;

        return (
            <View style={styles.item}>
                <PickerView
                    ref={hoursPickerRef}
                    selectedValue={selectedHours}
                    onValueChange={v => fireValueChange('hours', v)}
                >
                    {hoursItems}
                </PickerView>
            </View>
        );
    };

    /* 列表突变时手动触发调整滚动位置（选中项没变，但是列表却变了，这时 PickerView 内部不会调整滚动位置） */
    useDidUpdate(() => {
        if (prevSelectedValue?.getHours() !== selectedValue.getHours()) return;

        // hoursPickerRef.current?.handleScroll();
        setTimeout(hoursPickerRef.current?.handleScroll ?? noop, 50);
    }, [maxHours, minHours]);

    /* ------------------------------ BLOCK: 分 ------------------------------ */
    const minutesPickerRef = useRef<PickerViewRef>(null);
    // 当前选中的是不是最大/小年月日时
    const isSelectedMaxYearMonthDateHours =
        isSelectedMaxYearMonthDate && selectedHours === maxDate.getHours();
    const isSelectedMinYearMonthDateHours =
        isSelectedMinYearMonthDate && selectedHours === minDate.getHours();
    // 获取最大/小的小时数（该变量提至外部可以减少 renderMinutesItems render 次数）
    const maxMinutes = isSelectedMaxYearMonthDateHours ? maxDate.getMinutes() : 59;
    const minMinutes = isSelectedMinYearMonthDateHours ? minDate.getMinutes() : 0;
    const selectedMinutes = selectedValue.getMinutes();
    const isShowMinutesPicker = MINUTES_PICKER_TYPES.includes(type); // 是否显示 picker

    /* 分钟列表 items */
    const minutesItems = useMemo(() => {
        if (!isShowMinutesPicker) return null;

        return [...Array(maxMinutes - minMinutes + 1).keys()].map(index => {
            const minutes = index + minMinutes;
            return (
                <PickerView.Item
                    key={minutes}
                    label={
                        minutes + (minutesUnit === null ? '' : minutesUnit ?? DEFAULT_UNIT.minutes)
                    }
                    value={minutes}
                />
            );
        });
    }, [isShowMinutesPicker, maxMinutes, minMinutes, minutesUnit]);

    /* 分钟 picker */
    const renderMinutesPicker = () => {
        if (!isShowMinutesPicker) return null;

        return (
            <View style={styles.item}>
                <PickerView
                    ref={minutesPickerRef}
                    selectedValue={selectedMinutes}
                    onValueChange={v => fireValueChange('minutes', v)}
                >
                    {minutesItems}
                </PickerView>
            </View>
        );
    };

    /* 列表突变时手动触发调整滚动位置（选中项没变，但是列表却变了，这时 PickerView 内部不会调整滚动位置） */
    useDidUpdate(() => {
        if (prevSelectedValue?.getMinutes() !== selectedValue.getMinutes()) return;

        // minutesPickerRef.current?.handleScroll();
        setTimeout(minutesPickerRef.current?.handleScroll ?? noop, 50);
    }, [maxMinutes, minMinutes]);

    /* ------------------------------ BLOCK: 创建 pickerRef ------------------------------ */
    /* 触发某一列滚动，滚到选中的位置 */
    const handleScroll: DatePickerViewRef['handleScroll'] = useCallback(
        (line, isAnimated?: boolean) => {
            switch (line) {
                case 'year':
                    yearPickerRef.current?.handleScroll(isAnimated);
                    break;
                case 'month':
                    monthPickerRef.current?.handleScroll(isAnimated);
                    break;
                case 'date':
                    datePickerRef.current?.handleScroll(isAnimated);
                    break;
                case 'hours':
                    hoursPickerRef.current?.handleScroll(isAnimated);
                    break;
                case 'minutes':
                    minutesPickerRef.current?.handleScroll(isAnimated);
                    break;
                default:
                    break;
            }
        },
        [],
    );

    useImperativeHandle(
        ref,
        () => ({
            handleScroll,
        }),
        [handleScroll],
    );

    return (
        <View style={wrapperStyles} {...restProps}>
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
        </View>
    );
});

export * from './types';
export * from './style';
export * from './context';
export * from './utils';
