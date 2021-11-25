import { PopProps } from '../pop';

export interface ToastProps extends PopProps {
    type?: 'loading' | 'success' | 'warning';
    isActionable?: boolean;
    autoClose?: boolean;
    duration?: number;
}
