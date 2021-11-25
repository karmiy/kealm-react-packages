import { createStylesContext } from '../../utils/styles';
import { PickerStyles } from './style';

export const PickerStylesContext = createStylesContext<PickerStyles>();
export const PickerStylesProvider = PickerStylesContext.Provider;
