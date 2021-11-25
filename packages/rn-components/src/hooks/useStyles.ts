import { StyleSheet } from 'react-native';
import { useMemo } from 'react';
import useStyleTools from './useStyleTools';
import { isFunction } from '../utils/base';
import { px, Px } from '../utils/styles';
import { deepMergeStyles } from '../utils/utils';
import { Theme, utils, Utils } from '../styles';

type WithStyle<S> = (opt: { theme: Theme; utils: Utils; px: Px }) => S;

/**
 * @description merge(DefaultStyles, ContextStyles, props.styles)
 */
export default function useStyles<S, P = Partial<StyleSheet.NamedStyles<S>>, WS = P | WithStyle<P>>(
    withStyles: WithStyle<S> | S,
    ...restWithStyles: WS[]
) {
    const { theme } = useStyleTools();

    return useMemo(() => {
        const defaultStyles = isFunction(withStyles)
            ? withStyles({ theme, utils, px })
            : withStyles;

        return restWithStyles.reduce((prev, cur) => {
            if (!cur) return prev;
            return deepMergeStyles(prev, isFunction(cur) ? cur({ theme, utils, px }) : cur);
        }, defaultStyles);
        // 每次 restWithStyles 都会是新数据，useMemo 每次 render 都会执行里面的代码
        // 为了减少执行，选择使用 ...restWithStyles 作为依赖，而不是 restWithStyles
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [withStyles, theme, ...restWithStyles]);
}
