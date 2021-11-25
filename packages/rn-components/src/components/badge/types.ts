import { StyleSheet, ViewProps } from 'react-native';
import { BadgeStyles } from './style';

export interface BadgeProps extends ViewProps {
    styles?: Partial<StyleSheet.NamedStyles<BadgeStyles>>;
    visible?: boolean;
    count?: number | string;
    dot?: boolean;
    color?: string;
    dotRect?: number;
    offset?: {
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
        left?: number | string;
    };
}
