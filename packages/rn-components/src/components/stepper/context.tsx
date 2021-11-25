import { createStylesContext } from '../../utils/styles';
import { StepperStyles } from './style';

export const StepperStylesContext = createStylesContext<StepperStyles>();
export const StepperStylesProvider = StepperStylesContext.Provider;
