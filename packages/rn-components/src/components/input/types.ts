import { StyleSheet, TextInputProps, GestureResponderEvent } from 'react-native';
import { InputStyles } from './style';

export interface InputProps extends TextInputProps {
    styles?: Partial<StyleSheet.NamedStyles<InputStyles>>;
    width?: string | number;
    height?: string | number;
    disabled?: boolean;
    size?: 'large';
    fontSize?: number;
    grey?: boolean;
    placeholder?: string;
    label?: React.ReactNode;
    allowClear?: boolean;
    focusClear?: boolean;
    onClear?: (e: GestureResponderEvent) => void;
    innerSpace?: number | string;
    radius?: number;
    onOverage?: () => void;
    maxCount?: number;
    clipEndEditing?: boolean;
}
