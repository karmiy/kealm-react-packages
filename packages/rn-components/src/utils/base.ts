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
 * @description 是否为字符串
 * @param value: any
 * @returns {boolean}
 */
export const isString = function (value: any): value is string {
    return toString.call(value) === '[object String]';
};

/**
 * @description 是否为布尔类型
 * @param value: any
 * @returns {boolean}
 */
export const isBoolean = function (value: any): value is boolean {
    return toString.call(value) === '[object Boolean]';
};

/**
 * @description 是否为对象
 * @param value: any
 * @returns {boolean}
 */
export const isObject = function (value: any): value is object {
    return toString.call(value) === '[object Object]';
};

/**
 * @description 是否为数字
 * @param value: any
 * @returns {boolean}
 */
export const isNumber = function (value: any): value is number {
    return toString.call(value) === '[object Number]';
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
 * @description 是否为整数
 * @param value: any
 * @returns {boolean}
 */
export const isInteger =
    Number.isInteger ||
    function (value: any) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

/**
 * @description 是否为空值
 * @param value
 */
export const isEmpty = function (value: any): value is undefined | null {
    return value === undefined || value === null;
};

/**
 * @description 是否普通对象，{xx} 或 new Object() 或 Object.create(null) 创建的
 * @param value
 */
export const isPlainObject = function (value: any) {
    if (!(typeof value === 'object' && value !== null)) return false;

    if (toString.call(value) !== '[object Object]') return false;

    if (Object.getPrototypeOf(value) === null) return true;

    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};

/**
 * @description 将对象 key value 合并为字符串，{ id: 1, name: 'k' } => 'id: 1 name: k'
 * @param obj 合并项
 * @param iSeparator key value 连接符
 * @param separator 分隔符
 */
export const mergeKeyValueStr = function (
    obj: { [key: string]: any } = {},
    iSeparator = ': ',
    separator = ' ',
) {
    return Object.keys(obj)
        .reduce(
            (prev, key) =>
                prev +
                (!isEmpty(obj[key]) ? `${key}${iSeparator}${obj[key].toString()}${separator}` : ''),
            '',
        )
        .slice(0, -1);
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
