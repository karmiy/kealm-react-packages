import { createStylesContext } from '../../utils/styles';
import { ButtonStyles } from './style';

export const ButtonStylesContext = createStylesContext<ButtonStyles>();
export const ButtonStylesProvider = ButtonStylesContext.Provider;
