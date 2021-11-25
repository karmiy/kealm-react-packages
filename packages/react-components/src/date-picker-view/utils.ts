import {
    parseISO,
    addYears,
    setMonth,
    setDate,
    setHours,
    setMinutes,
    isAfter,
    isBefore,
} from 'date-fns';
export const DEFAULT_MIN_DATE = parseISO('1900-01-01 00:00:00');
export const DEFAULT_MAX_DATE = new Date();

/* 各个 picker 显示条件类型 */
export const YEAR_PICKER_TYPES = ['date', 'datetime', 'datehour', 'year', 'year-month'];
export const MONTH_PICKER_TYPES = ['date', 'datetime', 'datehour', 'year-month', 'month-day'];
export const DATE_PICKER_TYPES = ['date', 'datetime', 'datehour', 'month-day'];
export const HOURS_PICKER_TYPES = ['time', 'datetime', 'datehour'];
export const MINUTES_PICKER_TYPES = ['time', 'datetime'];

/* 单位 */
export const DEFAULT_UNIT = {
    year: '年',
    month: '月',
    date: '日',
    hours: '时',
    minutes: '分',
};

interface MergeOption {
    type: 'year' | 'month' | 'date' | 'hours' | 'minutes';
    current: Date;
    nextValue: number;
    minDate?: Date;
    maxDate?: Date;
}
/**
 * @description 根据 nextValue 的类型更新日期
 * @param type 年月日
 * @param current 当前日期
 * @param nextValue 下一个值，如 type: year, nextValue: 2021，即把当前日期的年份更新为 2021
 */
export const mergeNextDate = ({ type, current, nextValue, minDate, maxDate }: MergeOption) => {
    let nextDate = current;

    switch (type) {
        case 'year':
            const currentYear = current.getFullYear();

            // 年份赋值
            currentYear !== nextValue && (nextDate = addYears(current, nextValue - currentYear));
            break;

        case 'month':
            const currentMonth = current.getMonth() + 1;

            // 月份赋值
            currentMonth !== nextValue && (nextDate = setMonth(current, nextValue - 1));
            break;
        case 'date':
            const currentDate = current.getDate();

            // 日期赋值
            currentDate !== nextValue && (nextDate = setDate(current, nextValue));
            break;

        case 'hours':
            const currentHour = current.getHours();

            // 小时赋值
            currentHour !== nextValue && (nextDate = setHours(current, nextValue));
            break;

        case 'minutes':
            const currentMinutes = current.getMinutes();

            // 分钟赋值
            currentMinutes !== nextValue && (nextDate = setMinutes(current, nextValue));
            break;
    }

    // 判断有没有超过最大最小日期
    if (minDate && isBefore(nextDate, minDate)) return minDate;
    if (maxDate && isAfter(nextDate, maxDate)) return maxDate;

    return nextDate;
};

/**
 * @description 标准化日期值
 * @param value
 * @param minDate
 * @param maxDate
 */
export const normalizeValue = (value: Date, minDate: Date, maxDate: Date) => {
    isAfter(value, maxDate) && (value = maxDate);
    isBefore(value, minDate) && (value = minDate);

    return value;
};
