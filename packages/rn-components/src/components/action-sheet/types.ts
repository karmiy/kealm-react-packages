import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { ActionSheetStyles } from './style';
import { DrawerProps } from '../drawer';

export interface Action {
    label?: string;
    style?: StyleProp<TextStyle>;
    handler?: () => void;
    handlerClosable?: boolean;
    disabled?: boolean;
    render?: () => React.ReactNode;
}

export interface ActionSheetProps extends Omit<DrawerProps, 'styles'> {
    styles?: Partial<StyleSheet.NamedStyles<ActionSheetStyles>>;
    drawerStyles?: DrawerProps['styles'];
    actions?: Array<Action>;
    title?: string;
    cancelText?: string;
    onCancel?: () => void;
}
