export interface AnimatedVisibleProps {
    visible?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
    afterOpen?: () => void;
    afterClose?: () => void;
    appear?: boolean;
    unmountOnExit?: boolean;
    transitionName: string;
    duration: number;
}
