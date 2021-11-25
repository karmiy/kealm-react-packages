import { DrawerProps } from '../drawer';

export interface Action {
    label?: string;
    className?: string;
    style?: React.CSSProperties;
    handler?: () => void;
    handlerClosable?: boolean;
    disabled?: boolean;
    render?: () => React.ReactNode;
}

export interface ActionSheetProps extends DrawerProps {
    title?: string;
    actions?: Array<Action>;
    cancelText?: string;
    onCancel?: () => void;
}
