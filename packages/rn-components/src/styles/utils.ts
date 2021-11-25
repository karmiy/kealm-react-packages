import { ViewStyle, TextStyle, ImageStyle, StyleSheet } from 'react-native';
import { isIPhoneX, isIOS } from '../utils/utils';
import { basicTheme } from './theme';

type Style = ViewStyle | TextStyle | ImageStyle;

export const utils = {
    zIndex(value: number): Style {
        return {
            zIndex: value,
            elevation: value, // Android 需要 elevation
        };
    },
    /* 1px */
    hairlineBorder(
        direction: 'Top' | 'Right' | 'Bottom' | 'Left' | 'All',
        borderColor = basicTheme.border_color_base,
    ): Style {
        if (direction === 'All') {
            return {
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: borderColor,
            };
        }
        return {
            [`border${direction}Width`]: StyleSheet.hairlineWidth,
            [`border${direction}Color`]: borderColor,
        };
    },
    /* 边框 */
    border(
        direction: 'Top' | 'Right' | 'Bottom' | 'Left' | 'All',
        width = 1,
        borderColor = basicTheme.border_color_base,
    ): Style {
        // 4 边
        if (direction === 'All') {
            return {
                borderWidth: width,
                borderColor: borderColor,
            };
        }

        // 单边
        return {
            [`border${direction}Width`]: width,
            [`border${direction}Color`]: borderColor,
        };
    },
    /* iPhoneX */
    isIPhoneX,
    /* 隐藏 */
    hide: (isIOS
        ? {
              display: 'none',
          }
        : {
              width: 0,
              height: 0,
              overflow: 'hidden',
          }) as Style,

    /* 边框 */
    flexWrapper(
        direction: 'row' | 'column' = 'row',
        justifyContent:
            | 'center'
            | 'flex-start'
            | 'flex-end'
            | 'space-between'
            | 'space-around'
            | 'space-evenly' = 'space-between',
        alignItems: 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline' = 'center',
    ): Style {
        return {
            flexDirection: direction,
            justifyContent,
            alignItems,
        };
    },
};

export type Utils = typeof utils;
