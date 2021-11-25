import { createStylesContext } from '../../utils/styles';
import { BadgeStyles } from './style';

export const BadgeStylesContext = createStylesContext<BadgeStyles>();
export const BadgeStylesProvider = BadgeStylesContext.Provider;
