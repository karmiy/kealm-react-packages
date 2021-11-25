import { ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { PickerViewStyles } from './style';

export interface PickerViewRef {
    handleScroll: (animated?: boolean) => void;
}

export interface PickerViewProps extends ViewProps {
    styles?: Partial<StyleSheet.NamedStyles<PickerViewStyles>>;
    selectedValue?: any;
    onValueChange?: (value: any, index: number) => void;
    sideCount?: number; // 上下两侧各几个
    animated?: boolean;
    children?: React.ReactNode;
}

export interface PickerViewItemProps {
    value: any;
    label: React.ReactNode;
}

// export interface PickerViewType extends React.FC<PickerViewProps> {
export interface PickerViewType
    extends ForwardRefExoticComponent<
        PropsWithoutRef<PickerViewProps> & RefAttributes<PickerViewRef>
    > {
    Item: React.FC<PickerViewItemProps>;
}
