import { createStylesContext } from '../../utils/styles';
import { TextStyles } from './style';

export const TextStylesContext = createStylesContext<TextStyles>();
export const TextStylesProvider = TextStylesContext.Provider;
