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

type ClassNamesItem = string | Record<string, unknown> | undefined | null | ClassNamesParams;
type ClassNamesParams = Array<ClassNamesItem>;

/**
 * @description 构造 className
 * @param params 合并项
 */
export const classnames = function (...params: ClassNamesParams) {
    const classNames: string[] = [];
    params.forEach(item => {
        if (isEmpty(item)) return;
        if (isString(item)) {
            item && classNames.push(item);
            return;
        }
        if (isArray(item)) {
            const _classNames = classnames(...item);
            _classNames && classNames.push(_classNames);
            return;
        }

        Object.keys(item).forEach(key => {
            item[key] && classNames.push(key);
        });
    });

    return classNames.join(' ');
};

let rootFontSize: number;

/**
 * @description 获取 html.fontSize
 * @returns
 */
const getRootFontSize = () => {
    if (!rootFontSize) {
        const doc = document.documentElement;
        const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;

        rootFontSize = parseFloat(fontSize);
    }

    return rootFontSize;
};

const convertRem = (value: string) => {
    value = value.replace(/rem/g, '');
    return +value * getRootFontSize();
};

const convertVw = (value: string) => {
    value = value.replace(/vw/g, '');
    return (+value * window.innerWidth) / 100;
};

const convertVh = (value: string) => {
    value = value.replace(/vh/g, '');
    return (+value * window.innerHeight) / 100;
};

/**
 * @description rem、vw、vh 转 px
 * @param value
 * @returns
 */
export const unitToPx = (value: string | number) => {
    if (typeof value === 'number') {
        return value;
    }

    if (value.includes('rem')) {
        return convertRem(value);
    }
    if (value.includes('vw')) {
        return convertVw(value);
    }
    if (value.includes('vh')) {
        return convertVh(value);
    }

    return parseFloat(value);
};
