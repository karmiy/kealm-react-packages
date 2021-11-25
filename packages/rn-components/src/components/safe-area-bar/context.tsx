import { createStylesContext } from '../../utils/styles';
import { SafeAreaBarStyles } from './style';

export const SafeAreaBarStylesContext = createStylesContext<SafeAreaBarStyles>();
export const SafeAreaBarStylesProvider = SafeAreaBarStylesContext.Provider;
