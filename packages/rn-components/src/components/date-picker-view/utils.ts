import {
    addYears,
    setMonth,
    setDate,
    setHours,
    setMinutes,
    isAfter,
    isBefore,
    parseISO,
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
        // TODO: 考虑下最大日期 2021/01/11 00:00:00，选中 2021 年后变成 2021/01/11 08:00:00 之类的情况要不要处理（暂定不处理）
        // 日期年份更新后是否考虑极端点
        //      1、2020/02/29 => 2021/02/29，但 2021/02 没有 29 只到 28
        //      2、2020/02/29 => 2019/02/29，但 2019/02 没有 29 只到 28
        //      经测验：
        //      date-fns 的 addYears、subYears 会帮忙临界处理：
        //          2020/02/29 在 addYears(1) 后会是 2021/02/28
        //          2020/02/29 在 subYears(1) 后会是 2019/02/28
        //      date-fns 的 setYear 不会帮忙临界处理，只是单纯随 Date 自适应：
        //          2020/02/29 在 setYear(2021) 后会是 2021/03/01
        //          2020/02/29 在 setYear(2019) 后会是 2019/03/01
        //      目前参考 native、Vant UI 等，选择方案 1，做特别处理
        // 日期月份更新后是否考虑极端点
        //      1、2020/01/31 => 2021/02/31，但 2 月没有 31 只到 29
        //      2、2020/03/31 => 2019/02/31，但 2 月没有 31 只到 29
        //      经测验：
        //      date-fns 的 setMonth 会帮忙临界处理：
        //          2020/01/31 在 setMonth(1) 后会是 2021/02/29
        //          2020/03/31 在 setMonth(1) 后会是 2019/02/29
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
