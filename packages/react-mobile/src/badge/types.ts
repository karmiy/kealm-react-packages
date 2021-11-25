export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    wrapperClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    visible?: boolean;
    count?: React.ReactNode;
    dot?: boolean;
    dotRect?: number | string;
    color?: string;
    offset?: {
        top?: number | string;
        right?: number | string;
        bottom?: number | string;
        left?: number | string;
    };
}
