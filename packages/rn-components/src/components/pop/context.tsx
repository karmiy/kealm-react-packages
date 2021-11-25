import { createStylesContext } from '../../utils/styles';
import { PopStyles } from './style';

export const PopStylesContext = createStylesContext<PopStyles>();
export const PopStylesProvider = PopStylesContext.Provider;
