import { createStylesContext } from '../../utils/styles';
import { DialogStyles } from './style';

export const DialogStylesContext = createStylesContext<DialogStyles>();
export const DialogStylesProvider = DialogStylesContext.Provider;
