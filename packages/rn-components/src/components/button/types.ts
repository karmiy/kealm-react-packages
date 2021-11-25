import { StyleSheet, TouchableOpacityProps } from 'react-native';
import { ButtonStyles } from './style';

export interface ButtonProps extends TouchableOpacityProps {
    styles?: Partial<StyleSheet.NamedStyles<ButtonStyles>>;
    width?: number | string;
    height?: number | string;
    type?: 'primary' | 'regular' | 'info';
    size?: 'large';
    innerSpace?: number;
    radius?: number;
    plain?: boolean;
    plainWithBorder?: boolean;
    color?: string;
    fontSize?: number;
}
