import { PickerViewProps } from '../picker-view';

type UnitItemType = string | null;

interface Unit {
    year?: UnitItemType;
    month?: UnitItemType;
    date?: UnitItemType;
    hours?: UnitItemType;
    minutes?: UnitItemType;
}

export interface DatePickerViewProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
    defaultValue?: Date;
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
    pickerViewProps?: Partial<PickerViewProps>;
}
