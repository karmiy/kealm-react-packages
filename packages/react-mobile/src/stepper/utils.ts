import { isEmpty } from '../_utils/base';

export const DEFAULT_FORMAT = (value: string) => value;

/**
 * @description 获取小数点精度
 * @param value
 * @returns
 */
export const getPrecision = (value?: string | number) => {
    if (isEmpty(value)) return 0;
    const valueString = value.toString();
    const dotPosition = valueString.indexOf('.');

    return dotPosition !== -1 ? valueString.length - dotPosition - 1 : 0;
};

/**
 * @description 转精度字符串
 * @param value
 * @param precision
 * @returns
 */
export const toPrecision = (value: number | string, precision?: number) => {
    if (isEmpty(precision)) return `${value}`;

    if (value === '') return value;

    const nextValue = Number(value);
    return Number.isNaN(nextValue) ? `${value}` : nextValue.toFixed(precision);
};

/**
 * @description 是否是一个数
 * @param value
 * @returns
 */
export const isAsNumber = (value: number | string) => {
    if (value.toString().trim() === '') return false;

    return !Number.isNaN(Number(value));
};
