import { px } from '../../utils/styles';

// UI 稿一行时的默认高度
export const DEFAULT_UI_ROW = px(32);

// 缓存数据
export const FONT_SIZE_CACHE: {
    [fontSize: number]: {
        lineHeightOfOneRow: number;
        lineHeightOfTwoRow: number;
    };
} = Object.create(null);
/* } = {
    13: {
        lineHeightOfOneRow: 17.333,
        lineHeightOfTwoRow: 32.666,
    },
}; */

/**
 * Android:
 * fontSize: 13, h1: 17.333, h2: 32.666
 * iOS:
 * fontSize: 14, h1: 17, h2: 33.666
 */
