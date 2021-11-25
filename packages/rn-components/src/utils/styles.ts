import { createContext } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Theme, utils, Utils } from '../styles';
import { isWebEnv } from './utils';

const { width, height } = Dimensions.get('window');

/**
 * @description 转换 style 数值
 * @param base
 */
export function createStyleFit(base = 375) {
    const unit = !isWebEnv ? Math.min(width, height) / base : 1;
    return (size: number) => Math.round(unit * size);
}

export const px = createStyleFit();
export type Px = typeof px;

/**
 * @description 构造样式
 * @param ctor
 */
// export const createStyle = <S>(ctor: (theme: Theme, utils: Utils) => S) => ctor;
export const createStyles = <S>(ctor: (opt: { theme: Theme; utils: Utils; px: Px }) => S) => ctor;
/* export const createStyles = <S>(ctor: (opt: { theme: Theme; utils: Utils; px: Px }) => S) =>
    ctor({ theme, utils, px }); */

/**
 * @description 构造样式 Context
 */
export const createStylesContext = <S>() => createContext<Partial<StyleSheet.NamedStyles<S>>>(null);
