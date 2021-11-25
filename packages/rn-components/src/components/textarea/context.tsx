import { createStylesContext } from '../../utils/styles';
import { TextareaStyles } from './style';

export const TextareaStylesContext = createStylesContext<TextareaStyles>();
export const TextareaStylesProvider = TextareaStylesContext.Provider;
