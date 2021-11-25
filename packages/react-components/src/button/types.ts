export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: number | string;
    height?: number | string;
    type?: 'primary' | 'info' | 'regular';
    size?: 'large';
    radius?: number | string;
    plain?: boolean;
    plainWithBorder?: boolean;
    disabled?: boolean;
    activeOpacity?: number;
    color?: string;
}
