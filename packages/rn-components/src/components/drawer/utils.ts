/**
 * @description 是否是垂直方向
 * @param placement
 */
export function isVerticalPlacement(placement: 'top' | 'right' | 'bottom' | 'left') {
    return placement === 'top' || placement === 'bottom';
}

/**
 * @description 是否是左上方向
 * @param placement
 */
export function isPlainPlacement(placement: 'top' | 'right' | 'bottom' | 'left') {
    return placement === 'left' || placement === 'top';
}
