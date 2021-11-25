import { lastDayOfMonth } from 'date-fns';

interface Options {
    selectedValue: Date;
    minDate: Date;
    maxDate: Date;
}

export function useDatePicker(options: Options) {
    const { selectedValue, minDate, maxDate } = options;

    /* ------------------------------ year ------------------------------ */
    const minYear = minDate.getFullYear();
    const maxYear = maxDate.getFullYear();
    const selectedYear = selectedValue.getFullYear();

    /* ------------------------------ month ------------------------------ */
    const isSelectedMaxYear = selectedYear === maxDate.getFullYear();
    const isSelectedMinYear = selectedYear === minDate.getFullYear();
    // 通常情况都是 1-12 月，选中刚好至最大/小年份时需要注意最大/小月份
    const maxMonth = isSelectedMaxYear ? maxDate.getMonth() + 1 : 12;
    const minMonth = isSelectedMinYear ? minDate.getMonth() + 1 : 1;
    const selectedMonth = selectedValue.getMonth() + 1;

    /* ------------------------------ day ------------------------------ */
    // 当前选中的是不是最大/小年月
    const isSelectedMaxYearMonth = isSelectedMaxYear && selectedMonth === maxDate.getMonth() + 1;
    const isSelectedMinYearMonth = isSelectedMinYear && selectedMonth === minDate.getMonth() + 1;
    // 获取当月的最后/前一天
    const maxDay = isSelectedMaxYearMonth
        ? maxDate.getDate()
        : lastDayOfMonth(selectedValue).getDate();
    const minDay = isSelectedMinYearMonth ? minDate.getDate() : 1;
    const selectedDate = selectedValue.getDate();

    /* ------------------------------ hours ------------------------------ */
    // 当前选中的是不是最大/小年月日
    const isSelectedMaxYearMonthDate = isSelectedMaxYearMonth && selectedDate === maxDate.getDate();
    const isSelectedMinYearMonthDate = isSelectedMinYearMonth && selectedDate === minDate.getDate();
    // 获取最大/小的小时数
    const maxHours = isSelectedMaxYearMonthDate ? maxDate.getHours() : 23;
    const minHours = isSelectedMinYearMonthDate ? minDate.getHours() : 0;
    const selectedHours = selectedValue.getHours();

    /* ------------------------------ minutes ------------------------------ */
    // 当前选中的是不是最大/小年月日时
    const isSelectedMaxYearMonthDateHours =
        isSelectedMaxYearMonthDate && selectedHours === maxDate.getHours();
    const isSelectedMinYearMonthDateHours =
        isSelectedMinYearMonthDate && selectedHours === minDate.getHours();
    // 获取最大/小的小时数
    const maxMinutes = isSelectedMaxYearMonthDateHours ? maxDate.getMinutes() : 59;
    const minMinutes = isSelectedMinYearMonthDateHours ? minDate.getMinutes() : 0;
    const selectedMinutes = selectedValue.getMinutes();

    return {
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
    };
}
