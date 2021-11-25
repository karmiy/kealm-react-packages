import { PopProps } from '../pop';

export interface DrawerProps extends PopProps {
    className?: string;
    style?: React.CSSProperties;
    contentClassName?: string;
    placement?: 'top' | 'right' | 'bottom' | 'left';
    offset?: number | string;
}
