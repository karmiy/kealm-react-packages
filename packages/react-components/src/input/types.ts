import { ReactNode } from 'react';

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    defaultValue?: string;
    value?: string;
    width?: string | number;
    height?: string | number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    onChange?: (val: string) => void;
    disabled?: boolean;
    placeholder?: string;
    size?: 'large';
    label?: ReactNode;
    allowClear?: boolean;
    focusClear?: boolean;
    onClear?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    grey?: boolean;
    innerSpace?: number | string;
    radius?: number | string;
    maxCount?: number;
    onOverage?: () => void;
    specialCharCount?: boolean;
}
