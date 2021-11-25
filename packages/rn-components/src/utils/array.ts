/**
 * @description 从数组中移除某一项
 * @param list
 * @param item
 */
export function remove(list: Array<any>, item: any) {
    const index = list.indexOf(item);
    if (index >= 0) {
        list.splice(index, 1);
    }
}

/**
 * @description 快速从数组中移除某一项，会改变数组项位置
 * @param list
 * @param item
 */
export function removeFaster(list: Array<any>, item: any) {
    const index = list.indexOf(item);
    if (index >= 0) {
        // 10x faster than splice
        list[index] = list[list.length - 1];
        list.pop();
    }
}
