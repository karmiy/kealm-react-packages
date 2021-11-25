import { createStylesContext } from '../../utils/styles';
import { ToastStyles } from './style';

export const ToastStylesContext = createStylesContext<ToastStyles>();
export const ToastStylesProvider = ToastStylesContext.Provider;
