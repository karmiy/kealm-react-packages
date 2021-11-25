import { StyleSheet } from 'react-native';
import { DialogStyles } from './style';
import { PopProps } from '../../components/pop';

export interface DialogProps extends PopProps {
    styles?: Partial<StyleSheet.NamedStyles<DialogStyles>>;
    popStyles?: PopProps['styles'];
    title?: React.ReactNode;
    okText?: string | null;
    cancelText?: string | null;
    onOk?: () => void;
    onCancel?: () => void;
    okClosable?: boolean;
    cancelClosable?: boolean;
    showFooter?: boolean;
}
