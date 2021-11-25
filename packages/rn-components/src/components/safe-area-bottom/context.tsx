import { createStylesContext } from '../../utils/styles';
import { SafeAreaBottomStyles } from './style';

export const SafeAreaBottomStylesContext = createStylesContext<SafeAreaBottomStyles>();
export const SafeAreaBottomStylesProvider = SafeAreaBottomStylesContext.Provider;
