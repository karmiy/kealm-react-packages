import { StyleSheet, TextInputProps } from 'react-native';
import { AutoTextInputStyles } from './style';

export interface AutoTextInputProps extends TextInputProps {
    styles?: Partial<StyleSheet.NamedStyles<AutoTextInputStyles>>;
    heightOfTheUIRow?: number;
    fontSize?: number;
    maxRows?: number;
    minRows?: number;
    rows?: number;
}
