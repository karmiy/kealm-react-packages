import { StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { TextareaStyles } from './style';

export interface TextareaTag {
    key: string;
    label: string;
    handler?: (key: string, label: string) => void;
}

export interface TextareaProps extends TextInputProps {
    styles?: Partial<StyleSheet.NamedStyles<TextareaStyles>>;
    style?: ViewStyle;
    textareaHeight?: number | string;
    disabled?: boolean;
    size?: 'medium';
    innerSpace?: string | number;
    grey?: boolean;
    placeholder?: string;
    radius?: number;
    heightOfTheUIRow?: number;
    fontSize?: number;
    autoHeight?: boolean | { maxRows?: number; minRows?: number };
    rows?: number;
    showCount?: boolean;
    maxCount?: number;
    countShowThreshold?: number;
    onOverage?: () => void;
    clipEndEditing?: boolean;
    tags?: Array<TextareaTag>;
    tagsGapHorizontal?: number;
    tagsGapVertical?: number;
    isTagsOut?: boolean;
    footer?: React.ReactNode;
}
