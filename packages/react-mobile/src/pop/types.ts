import { AnimatedVisibleProps, PortalProps } from '../_common';

export interface PopProps
    extends Omit<AnimatedVisibleProps, 'transitionName' | 'duration'>,
        PortalProps {
    className?: string;
    style?: React.CSSProperties;
    onVisibleChange?: (v: boolean) => void;
    showMask?: boolean;
    maskClosable?: boolean;
    onMaskClick?: (e: React.MouseEvent) => void;
    maskClassName?: string;
    maskStyle?: React.CSSProperties;
    renderMask?: React.ReactNode;
    zIndex?: number;
    isCenter?: boolean;
    transitionName?: string;
    duration?: number;
    lockScrollEnabled?: boolean;
}
