export interface PickerViewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    data?: Array<{
        label: React.ReactNode;
        value: any;
        className?: string;
        style?: React.CSSProperties;
    }>;
    defaultValue?: any;
    value?: any;
    onChange?: (value: any) => void;
    itemHeight?: number | string; // px vw vh rem
    itemCount?: number;
}
