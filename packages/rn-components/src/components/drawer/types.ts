import { StyleSheet, ViewProps } from 'react-native';
import { DrawerStyles } from './style';
import { PopProps } from '../pop';

export interface DrawerProps extends Omit<PopProps, 'styles'> {
    styles?: Partial<StyleSheet.NamedStyles<DrawerStyles>>;
    popStyles?: PopProps['styles'];
    placement?: 'top' | 'right' | 'bottom' | 'left';
    offset?: number;
    contentContainerProps?: ViewProps;
}
