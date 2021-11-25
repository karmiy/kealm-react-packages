import { useState, useRef } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import { isEmpty } from '../_utils/base';
import { add, subtraction, clamp } from '../_utils/math';
import { DEFAULT_FORMAT, toPrecision, isAsNumber } from './utils';

interface Options {
    defaultValue?: number;
    value?: number;
    onChange?: (v: number) => void;
    max?: number;
    min?: number;
    step?: number;
    disabled?: boolean;
    precision?: number;
    formatter?: (value: string) => string;
    parser?: (value: string) => string;
}

export function useStepper(options?: Options) {
    const {
        defaultValue = 1,
        value,
        onChange,
        max = Infinity,
        min = -Infinity,
        step = 1,
        disabled = false,
        precision,
        formatter = DEFAULT_FORMAT,
        parser = DEFAULT_FORMAT,
    } = options ?? {};

    const [stepperValue, setStepperValue] = useState(
        `${toPrecision(clamp(value ?? defaultValue, max, min), precision)}`,
    );

    const dispatchStepperValue = (v: number, emit = true) => {
        const nextStepper = toPrecision(clamp(v, max, min), precision);
        const nextValue = +nextStepper;

        stepperValue !== nextStepper && setStepperValue(nextStepper);
        emit && value !== nextValue && onChange?.(nextValue);
    };

    /* defaultValue 更新驱动 */
    useDidUpdate(() => {
        isEmpty(value) && !isEmpty(defaultValue) && dispatchStepperValue(defaultValue, false);
    }, [defaultValue]);

    /* value 更新驱动 */
    useDidUpdate(() => {
        !isEmpty(value) && dispatchStepperValue(value, false);
    }, [value]);

    /* 精度更新重置当前值 */
    useDidUpdate(() => {
        dispatchStepperValue(+stepperValue);
    }, [precision]);

    /* 区间更新重置当前值 */
    useDidUpdate(() => {
        dispatchStepperValue(+stepperValue);
    }, [max, min]);

    const isOverMax = !!stepperValue && +stepperValue >= max;
    const isBelowMin = !!stepperValue && +stepperValue <= min;

    /* ------------------------------ BLOCK: - + ------------------------------ */
    const onIncrease = () => {
        if (disabled || isOverMax) return;

        const nextValue = clamp(
            stepperValue === '' ? defaultValue : add(+stepperValue, step),
            max,
            min,
        );

        dispatchStepperValue(nextValue);
    };

    const onDecrease = () => {
        if (disabled || isBelowMin) return;

        const nextValue = clamp(
            stepperValue === '' ? defaultValue : subtraction(+stepperValue, step),
            max,
            min,
        );

        dispatchStepperValue(nextValue);
    };

    /* ------------------------------ BLOCK: input ------------------------------ */
    // 缓存聚焦即时的值
    const focusValueRef = useRef(`${defaultValue}`);

    const onFocus = () => {
        focusValueRef.current = parser(stepperValue);
    };

    const onBlur = () => {
        const targetValue = parser(stepperValue);

        // Reload input when it's not a number
        if (!isAsNumber(targetValue)) return setStepperValue(focusValueRef.current);

        const nextValue = clamp(Number(targetValue), max, min);
        dispatchStepperValue(nextValue);
    };

    // const inputValue = precision ? toPrecision(stepperValue, precision) : formatter(stepperValue);

    const onInputChange = (v: string) => {
        if (disabled) return;

        setStepperValue(parser(v));
    };

    return {
        stepperValue,
        setStepperValue,
        inputValue: formatter(stepperValue),
        onInputChange,
        isOverMax,
        isBelowMin,
        onIncrease,
        onDecrease,
        onFocus,
        onBlur,
    };
}
