import { Platform, Dimensions, PixelRatio, StatusBar, NativeModules } from 'react-native';
import deepmerge from 'deepmerge';
import { isArray } from './base';

const { width, height } = Dimensions.get('window');

export const isWebEnv = typeof document !== 'undefined';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const pixelRatio = PixelRatio.get();

export const windowRect = {
    width,
    height: isIOS
        ? height
        : height / width > 1.8 // 全面屏获取到时会少 StatusBar 高度
        ? height + NativeModules.StatusBarManager.HEIGHT
        : height,
};

export const isIPhoneX = isIOS && windowRect.height / width > 1.96;

// 刘海屏
// TODO: 貌似有些安卓也是刘海屏
export const isNotch = windowRect.height / width > 1.96;

export const safeAreaTop = isNotch ? 44 : StatusBar.currentHeight || 20;

// TODO: iPhoneX 才需要有底部黑线？
// export const safeAreaBottom = isNotch ? 34 : 0;
export const safeAreaBottom = isIPhoneX ? 34 : 0;

// 合并样式对象，兼容 web 版在 useStyles 合并
// （react-native-web 会使用 cjs 合并成 class number，导致对象合并前者直接覆盖）
export const deepMergeStyles = <T extends Record<string, any>>(x: Partial<T>, y: Partial<T>): T => {
    if (!isWebEnv) return deepmerge(x, y);

    const z = { ...x };
    for (const prop in y) {
        const v = z[prop];
        const w = y[prop];
        if (!v) {
            z[prop] = w;
        } else {
            z[prop] = (isArray(v) ? [...v, w] : [v, w]) as T[Extract<keyof T, string>];
        }
    }
    return z as T;
};
