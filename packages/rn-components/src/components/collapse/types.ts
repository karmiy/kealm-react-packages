import { EasingFunction, Animated, RegisteredStyle, ViewStyle, ViewProps } from 'react-native';

export interface CollapseProps {
    visible?: boolean;
    align?: 'top' | 'center' | 'bottom';
    collapsedHeight?: number;
    duration?: number;
    easing?: EasingFunction;
    onOpen?: () => void;
    afterOpen?: () => void;
    onClose?: () => void;
    afterClose?: () => void;
    renderChildrenMode?: 'always' | 'keepAlive' | 'unmountOnCollapsed';
    wrapperProps?: ViewProps;
    containerProps?: ViewProps;
}

export type AnimatedStyle =
    | false
    | Animated.Value
    | RegisteredStyle<ViewStyle>
    | Animated.AnimatedInterpolation
    | Animated.WithAnimatedObject<ViewStyle>
    | Animated.WithAnimatedArray<ViewStyle>
    | null
    | undefined;
