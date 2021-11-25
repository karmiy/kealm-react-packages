import { DatePickerViewProps } from '../date-picker-view';
import { DrawerProps } from '../drawer';

export interface DatePickerProps extends Omit<DatePickerViewProps, 'title'> {
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    title?: React.ReactNode;
    cancelText?: React.ReactNode;
    onCancel?: () => void;
    okText?: React.ReactNode;
    onOk?: (value: Date) => void;
    drawerProps?: Partial<DrawerProps>;
}
