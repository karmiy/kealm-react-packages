import { StyleSheet } from 'react-native';
import { PickerStyles } from './style';
import { PickerViewProps } from '../picker-view';
import { DrawerProps } from '../drawer';

export interface PickerProps extends Omit<PickerViewProps, 'styles'> {
    styles?: Partial<StyleSheet.NamedStyles<PickerStyles>>;
    pickerViewStyles?: PickerViewProps['styles'];
    data?: Array<{
        label: React.ReactNode;
        value: any;
    }>;
    defaultValue?: any;
    value?: any;
    onChange?: (value: any) => void;
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    title?: React.ReactNode;
    cancelText?: React.ReactNode;
    onCancel?: () => void;
    okText?: React.ReactNode;
    onOk?: (value: any) => void;
    drawerProps?: Partial<DrawerProps>;
}
