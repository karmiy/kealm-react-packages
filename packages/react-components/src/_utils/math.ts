/* From: https://juejin.im/post/5ddc7fa66fb9a07ad665b1f0 */
/**
 * @description Check whether the data is exceeded
 * @param {Number} num
 */
export const checkSafeNumber = (num: number) => {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
        console.log(`数字 ${num} 超限，请注意风险！`);
    }
};

/**
 * @description Revised data
 * @param {Number} num
 * @param {Number} precision
 */
export const revise = (num: number, precision = 12) => {
    return +parseFloat(num.toPrecision(precision));
};

/**
 * @description Gets the length after the decimal point
 * @param num
 */
export const digitLength = (num: number) => {
    return (num.toString().split('.')[1] || '').length;
};

/**
 * @description Remove the decimal point from the num
 * @param num
 * @returns {num}
 */
export const floatToInt = (num: number) => {
    return Number(num.toString().replace('.', ''));
};

/**
 * @description Precision computing multiplication
 * @param {Number} arg1 乘数 1
 * @param {Number} arg2 乘数 2
 */
export const multiplication = (arg1: number, arg2: number) => {
    const baseNum = digitLength(arg1) + digitLength(arg2);
    const result = floatToInt(arg1) * floatToInt(arg2);
    checkSafeNumber(result);
    return result / Math.pow(10, baseNum);
};

/**
 * @description Precision calculation addition
 * @param {Number} arg1 加数 1
 * @param {Number} arg2 加数 2
 */
export const add = (arg1: number, arg2: number) => {
    const baseNum = Math.pow(10, Math.max(digitLength(arg1), digitLength(arg2)));
    return (multiplication(arg1, baseNum) + multiplication(arg2, baseNum)) / baseNum;
};

/**
 * @description Precision calculation subtraction
 * @param {Number} arg1 减数 1
 * @param {Number} arg2 减数 2
 */
export const subtraction = (arg1: number, arg2: number) => {
    const baseNum = Math.pow(10, Math.max(digitLength(arg1), digitLength(arg2)));
    return (multiplication(arg1, baseNum) - multiplication(arg2, baseNum)) / baseNum;
};

/**
 * @description Precision calculation division
 * @param {Number} arg1 除数 1
 * @param {Number} arg2 除数 2
 */
export const division = (arg1: number, arg2: number) => {
    const baseNum = Math.pow(10, Math.max(digitLength(arg1), digitLength(arg2)));
    return multiplication(arg1, baseNum) / multiplication(arg2, baseNum);
};

/**
 * @description Round to the specified num
 * @param {Number} num 需要取舍的数字
 * @param {Number} ratio 精确到多少位小数
 */
export const round = (num: number, ratio: number) => {
    const baseNum = Math.pow(10, ratio);
    return division(Math.round(multiplication(num, baseNum)), baseNum);
};

/**
 * @description 约束数值范围
 * @param num
 * @param max
 * @param min
 */
export const clamp = (num: number, max: number, min: number) => {
    return Math.min(Math.max(num, min), max);
};
