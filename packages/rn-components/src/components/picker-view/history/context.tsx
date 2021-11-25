import { createStylesContext } from '../../../utils/styles';
import { PickerViewStyles } from './style';

export const PickerViewStylesContext = createStylesContext<PickerViewStyles>();
export const PickerViewStylesProvider = PickerViewStylesContext.Provider;
