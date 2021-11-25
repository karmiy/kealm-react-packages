import { createStylesContext } from '../../utils/styles';
import { AutoTextInputStyles } from './style';

export const AutoTextInputStylesContext = createStylesContext<AutoTextInputStyles>();
export const AutoTextInputStylesProvider = AutoTextInputStylesContext.Provider;
