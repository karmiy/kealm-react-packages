import { StyleSheet, ViewProps } from 'react-native';
import { DatePickerViewStyles } from './style';

type UnitItemType = string | null;

interface Unit {
    year?: UnitItemType;
    month?: UnitItemType;
    date?: UnitItemType;
    hours?: UnitItemType;
    minutes?: UnitItemType;
}

export interface DatePickerViewRef {
    handleScroll: (
        line: 'year' | 'month' | 'date' | 'hours' | 'minutes',
        animated?: boolean,
    ) => void;
}

export interface DatePickerViewProps extends ViewProps {
    styles?: Partial<StyleSheet.NamedStyles<DatePickerViewStyles>>;
    value?: Date;
    onChange?: (value: Date) => void;
    maxDate?: Date;
    minDate?: Date;
    // date: 年月日
    // time: 时分
    // datetime: 年月日时分
    // datehour: 年月日时
    // year: 年
    // year-month: 年月
    // month-day: 月日
    type?: 'date' | 'time' | 'datetime' | 'datehour' | 'year' | 'year-month' | 'month-day';
    unit?: Unit;
}
