export const toString = Object.prototype.toString;

/**
 * @description 空数组、对象，可用于 defaultProps 等默认值
 */
export const emptyArr = [];
export const emptyObj = Object.create(null);
export const noop = () => {
    // noop
};

/**
 * @description 是否为数组
 * @param value: any
 * @returns {boolean}
 */
export const isArray =
    Array.isArray ||
    function (value: any): value is any[] {
        return toString.call(value) === '[object Array]';
    };

/**
 * @description 是否为函数
 * @param value: any
 * @returns {boolean}
 */
export const isFunction = function (value: any): value is Function {
    return toString.call(value) === '[object Function]';
};

/**
 * @description 是否为空值
 * @param value
 */
export const isEmpty = function (value: any): value is undefined | null {
    return value === undefined || value === null;
};

/**
 * @description 为 await 后的 promise 进行处理，返回 [data, err];
 * @param promise
 */
export const asyncWrapper = <T>(promise: Promise<T>) => {
    return promise
        .then(data => [data, null] as [T, null])
        .catch(err => [null, { res: err }] as [null, { res: any }]);
};

/**
 * @description mock 时模拟延时的 Promise
 * @param duration 时长，默认 1s
 */
export const sleep = (duration = 1000) => new Promise(r => setTimeout(r, duration));
