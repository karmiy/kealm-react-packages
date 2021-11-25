import { StyleSheet } from 'react-native';
import { ToastStyles } from './style';
import { PopProps } from '../pop';

export interface ToastProps extends Omit<PopProps, 'styles'> {
    styles?: Partial<StyleSheet.NamedStyles<ToastStyles>>;
    popStyles?: PopProps['styles'];
    type?: 'loading' | 'success' | 'warning';
    isActionable?: boolean;
    autoClose?: boolean;
    duration?: number;
}
