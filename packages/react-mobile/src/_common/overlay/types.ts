import { AnimatedVisibleProps } from '../animated-visible';

export interface OverlayProps
    extends Omit<AnimatedVisibleProps, 'transitionName' | 'duration'>,
        React.HTMLAttributes<HTMLDivElement> {
    transitionName?: string;
    duration?: number;
}
