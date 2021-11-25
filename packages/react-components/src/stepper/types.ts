export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    width?: number | string;
    height?: number | string;
    defaultValue?: number;
    value?: number;
    onChange?: (v: number) => void;
    plain?: boolean;
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    readonly?: boolean;
    precision?: number;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
    fontSize?: number;
}
