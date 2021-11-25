import { createStylesContext } from '../../utils/styles';
import { DatePickerViewStyles } from './style';

export const DatePickerViewStylesContext = createStylesContext<DatePickerViewStyles>();
export const DatePickerViewStylesProvider = DatePickerViewStylesContext.Provider;
