export type AutoHeight = boolean | { maxRows?: number; minRows?: number };

export interface TextareaTag {
    key: string;
    label: string;
    handler?: (key: string, label: string) => void;
}

export interface TextareaProps
    extends Omit<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        'size' | 'onChange' | 'onClick'
    > {
    className?: string;
    style?: React.CSSProperties;
    textareaStyle?: React.CSSProperties;
    textareaHeight?: string | number;
    defaultValue?: string;
    value?: string;
    onChange?: (val: string) => void;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    size?: 'medium';
    radius?: number | string;
    grey?: boolean;
    maxCount?: number;
    showCount?: boolean;
    countShowThreshold?: number;
    onOverage?: () => void;
    rows?: number;
    autoHeight?: AutoHeight;
    tags?: TextareaTag[];
    isTagsOut?: boolean;
    footer?: React.ReactNode;
}
