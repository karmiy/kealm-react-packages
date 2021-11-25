import React, { useState, useCallback } from 'react';
import { isEmpty, isFunction } from '../_utils/base';

interface Option<T> {
    defaultProp?: T;
    prop?: T;
    event?: (value: T) => any;
    isControlled?: boolean; // 请传递 'value' in props，比 value !== undefined 更精确
}

/**
 * 标准化 value，用于构建包含 defaultValue、value、onChange 结构的组件，当绑定 value 时由外部 value 控制，否则由内部状态控制
 */
export function useNormalizeValue<T>(option: Option<T>) {
    const { defaultProp, prop, event, isControlled = true } = option;
    const [innerProp, setInnerProp] = useState(defaultProp); // 内部状态
    const value = isControlled ? prop : innerProp; // 实际状态值(依赖 prop，没有则由内部状态控制)

    const setValue: React.Dispatch<React.SetStateAction<T | undefined>> = useCallback(
        setStateAction => {
            const nextValue = isFunction(setStateAction) ? setStateAction(value) : setStateAction;

            !isEmpty(nextValue) && event?.(nextValue);

            !isControlled && setInnerProp(nextValue);
        },
        [value, event, isControlled],
    );

    return [value, setValue] as const;
}
