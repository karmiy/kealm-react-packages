import { StyleSheet } from 'react-native';
import { DatePickerStyles } from './style';
import { DatePickerViewProps } from '../date-picker-view';
import { DrawerProps } from '../drawer';

export interface DatePickerProps extends Omit<DatePickerViewProps, 'styles'> {
    styles?: Partial<StyleSheet.NamedStyles<DatePickerStyles>>;
    datePickerViewStyles?: DatePickerViewProps['styles'];
    defaultValue?: Date;
    value?: Date;
    onChange?: (value: Date) => void;
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    title?: React.ReactNode;
    cancelText?: React.ReactNode;
    onCancel?: () => void;
    okText?: React.ReactNode;
    onOk?: (value: Date) => void;
    drawerProps?: Partial<DrawerProps>;
}
