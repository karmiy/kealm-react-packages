import { ReactNode } from 'react';
import { PopProps } from '../pop';

export interface DialogProps extends PopProps {
    bodyStyle?: React.CSSProperties;
    width?: string | number;
    title?: ReactNode;
    okText?: string | null;
    cancelText?: string | null;
    onOk?: () => void;
    onCancel?: () => void;
    okClosable?: boolean;
    cancelClosable?: boolean;
    showFooter?: boolean;
    footer?: React.ReactNode;
}
