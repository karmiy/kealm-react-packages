import { createStylesContext } from '../../utils/styles';
import { InputStyles } from './style';

export const InputStylesContext = createStylesContext<InputStyles>();
export const InputStylesProvider = InputStylesContext.Provider;
