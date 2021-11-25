import { createStylesContext } from '../../utils/styles';
import { ActionSheetStyles } from './style';

export const ActionSheetStylesContext = createStylesContext<ActionSheetStyles>();
export const ActionSheetStylesProvider = ActionSheetStylesContext.Provider;
