import {
    StyleSheet,
    ViewProps,
    Animated,
    ViewStyle,
    KeyboardAvoidingViewProps,
    GestureResponderEvent,
} from 'react-native';
import { PopStyles } from './style';

interface RenderOption {
    animate: Animated.Value;
}

interface RenderMaskOption {
    animate: Animated.Value;
    style: ViewStyle;
}

export interface PopProps extends ViewProps {
    styles?: Partial<StyleSheet.NamedStyles<PopStyles>>;
    visible?: boolean;
    onVisibleChange?: (v: boolean) => void;
    children?: React.ReactNode | ((option: RenderOption) => React.ReactNode);
    showMask?: boolean;
    maskClosable?: boolean;
    onMaskClick?: (e: GestureResponderEvent) => void;
    renderMask?: React.ReactNode | ((option: RenderMaskOption) => React.ReactNode);
    duration?: number;
    onOpen?: () => void;
    onClose?: () => void;
    afterOpen?: () => void;
    afterClose?: () => void;
    zIndex?: number;
    isCenter?: boolean;
    useKeyboardAvoidingView?: boolean;
    keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
    isLazyMount?: boolean;
    unmountOnExit?: boolean;
    appear?: boolean;
}
