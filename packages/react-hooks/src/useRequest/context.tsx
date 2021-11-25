import { createContext } from 'react';
import { GlobalRequestConfig } from './types';

export const RequestConfigContext = createContext<GlobalRequestConfig>({});
export const RequestConfigProvider = RequestConfigContext.Provider;
