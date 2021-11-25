import { withComponentsTheme, ComponentsTheme } from './components';

/* -------------------- Basic -------------------- */
const brandColors = {
    color_primary: '#4794ff',
    color_regular: '#ff4d88',
    color_info: '#666',
    color_mark: '#ff4d4d',
    color_white: '#fff',
    color_black: '#000',
};

const textColors = {
    color_text_primary: '#323232',
    color_text_regular: '#999',
    color_text_secondary: '#b5b5b5',
    color_text_placeholder: '#b2b2b2',
};

const disabledColors = {
    disabled_text_color: '#ccc',
    disabled_background: '#ddd',
};

const gradientColors = {
    color_text_thin_dark_1: 'rgba(0, 0, 0, .1)',
    color_text_thin_dark_2: 'rgba(0, 0, 0, .2)',
    color_text_thin_dark_3: 'rgba(0, 0, 0, .3)',
    color_text_thin_dark_4: 'rgba(0, 0, 0, .4)',
    color_text_thin_dark_5: 'rgba(0, 0, 0, .5)',
    color_text_thin_dark_6: 'rgba(0, 0, 0, .6)',
    color_text_thin_dark_7: 'rgba(0, 0, 0, .7)',
    color_text_thin_dark_8: 'rgba(0, 0, 0, .8)',
    color_text_thin_dark_9: 'rgba(0, 0, 0, .9)',
};

const borderColors = {
    border_color_base: '#e8e8e8',
    border_color_dark: '#cecece',
};

const backgroundColors = {
    background_color_base: '#f2f2f2',
    background_color_light: '#f5f5f5',
    background_color_dark: '#ebebeb',
};

const fontSizes = {
    font_size_XXS: 11,
    font_size_XS: 12,
    font_size_S: 13,
    font_size_M: 14,
    font_size_L: 15,
    font_size_XL: 16,
    font_size_XXL: 17,
    font_size_XXXL: 18,
    font_size_XXXXL: 20,
};

const zIndexs = {
    z_index_negative: -1,
    z_index_S: 1,
    z_index_M: 10,
    z_index_L: 100,
    z_index_XL: 1000,
};

const device = {
    iphoneX_bar_height: 34,
};

/* 基础 theme */
export const basicTheme = {
    ...brandColors,
    ...textColors,
    ...disabledColors,
    ...gradientColors,
    ...borderColors,
    ...backgroundColors,
    ...fontSizes,
    ...zIndexs,
    ...device,
};

export type BasicTheme = typeof basicTheme;

export type Theme = BasicTheme & ComponentsTheme;

export const withTheme = (mergeTheme: Partial<Theme>): Theme => {
    const mixinTheme = { ...basicTheme, ...mergeTheme };

    return {
        ...withComponentsTheme(mixinTheme),
        ...mixinTheme,
    };
};
