/* target type */
export type ResolvableTarget<T = Element> =
    | (() => T | null)
    | T
    | null
    | React.MutableRefObject<T | null | undefined>;

export type TargetElement = HTMLElement | Element | Document | Window;

/* 解析 target 元素 */
export const getTargetElement = <T extends TargetElement>(
    target?: ResolvableTarget<T>,
    defaultElement?: T,
): T | undefined | null => {
    if (!target) {
        return defaultElement;
    }

    let targetElement: T | undefined | null;

    if (typeof target === 'function') {
        targetElement = target();
    } else if ('current' in target) {
        targetElement = target.current;
    } else {
        targetElement = target;
    }

    return targetElement;
};
