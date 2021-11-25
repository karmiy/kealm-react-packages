import { createStylesContext } from '../../utils/styles';
import { DrawerStyles } from './style';

export const DrawerStylesContext = createStylesContext<DrawerStyles>();
export const DrawerStylesProvider = DrawerStylesContext.Provider;
