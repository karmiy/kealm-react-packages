import { PickerViewProps } from '../picker-view';
import { DrawerProps } from '../drawer';

export interface PickerProps extends Omit<PickerViewProps, 'title'> {
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    title?: React.ReactNode;
    cancelText?: React.ReactNode;
    onCancel?: () => void;
    okText?: React.ReactNode;
    onOk?: (value: any) => void;
    drawerProps?: Partial<DrawerProps>;
}
