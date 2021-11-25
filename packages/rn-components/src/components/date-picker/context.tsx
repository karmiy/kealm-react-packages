import { createStylesContext } from '../../utils/styles';
import { DatePickerStyles } from './style';

export const DatePickerStylesContext = createStylesContext<DatePickerStyles>();
export const DatePickerStylesProvider = DatePickerStylesContext.Provider;
