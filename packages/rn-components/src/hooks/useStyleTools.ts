import { useContext, useMemo } from 'react';
import { withTheme, utils, ThemeContext } from '../styles';
import { px } from '../utils/styles';

/**
 * @description 提供 theme、utils、px 等样式工具
 * @param withStyle
 * @param styles
 */
export default function useStyleTools() {
    // 合并 ThemeContext 传递的主题变量
    const contextTheme = useContext(ThemeContext);
    const stableTheme = useMemo(() => withTheme(contextTheme), [contextTheme]);

    return { theme: stableTheme, utils, px } as const;
}
