import React, { useEffect, useRef } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import { usePanGestureScroll } from '../_hooks';
import { classnames, unitToPx, emptyArr, isEmpty } from '../_utils/base';
import { PickerViewProps } from './types';

const PickerView: React.FC<PickerViewProps> = props => {
    const {
        data = emptyArr,
        defaultValue,
        value,
        onChange,
        itemHeight: _itemHeight = 34,
        itemCount = 7,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: data ------------------------------ */
    const itemHeight = unitToPx(_itemHeight); // 转换 item 高
    const containerHeight = itemCount * itemHeight; // 容器高
    const sideHeight = itemHeight * ((itemCount - 1) / 2); // 侧半边高度
    const len = data.length;

    /* ------------------------------ BLOCK: touch event ------------------------------ */
    const ref = useRef<HTMLDivElement>(null);

    /* 需要原生的 touchMove 来阻止事件，否则滚动依然会和页面滚动冲突 */
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onTouchMove = (e: TouchEvent) => e.preventDefault();

        el.addEventListener('touchmove', onTouchMove);

        return () => el.removeEventListener('touchmove', onTouchMove);
    }, []);

    /* ------------------------------ BLOCK: utils ------------------------------ */
    const getIndexByValue = (val: any) => {
        if (isEmpty(val)) return 0;

        // 保底 0
        return Math.max(
            data.findIndex(item => item.value === val),
            0,
        );
    };

    const getIndexByOffset = (offset: number) => {
        // 保底 0
        return Math.max(Math.min(Math.round(Math.abs(offset) / itemHeight), len - 1), 0);
    };

    /* ------------------------------ BLOCK: offset 手势 ------------------------------ */
    const { offset, mutateOffset, panStart, panMove, panEnd } = usePanGestureScroll({
        initialOffset: () => -getIndexByValue(value ?? defaultValue) * itemHeight,
        maxOffset: 0,
        minOffset: Math.min(-(len - 1) * itemHeight, 0),
        maxOverflowY: (itemHeight * itemCount) / 6,
        snapToInterval: itemHeight,
        onMomentumEnd() {
            const index = getIndexByOffset(offset);
            // value 来判断更严格点，可能存在初始 undefined，小拖一下回滚当前值的情况
            data[index].value !== value && onChange?.(data[index].value);
        },
    });

    /* 外部数据变更驱动滚轮重定向 */
    useDidUpdate(() => {
        const nextOffset = -getIndexByValue(value ?? defaultValue) * itemHeight;
        if (offset !== nextOffset) {
            mutateOffset({ offset: nextOffset });
        }
    }, [value, defaultValue, data]);

    return (
        <div className='my-picker-view' {...restProps}>
            <div
                ref={ref}
                className='my-picker-view__container'
                style={{ height: containerHeight }}
                onTouchStart={panStart}
                onTouchMove={panMove}
                onTouchEnd={panEnd}
            >
                <div
                    className='my-picker-view__content'
                    style={{
                        transform: `translateY(${offset}px)`,
                        paddingTop: sideHeight,
                        paddingBottom: sideHeight,
                    }}
                >
                    {data.map(({ label, className: itemClassName, style: itemStyle }, index) => {
                        return (
                            <div
                                key={index}
                                className={classnames('my-picker-view__item', itemClassName)}
                                style={{
                                    ...itemStyle,
                                    height: itemHeight,
                                }}
                            >
                                {label}
                            </div>
                        );
                    })}
                </div>
                <div
                    className='my-picker-view__mask my-picker-view__mask--top'
                    style={{ height: sideHeight }}
                />
                <div
                    className='my-picker-view__mask my-picker-view__mask--bottom'
                    style={{ height: sideHeight }}
                />
                <div
                    className='my-picker-view__indicator'
                    style={{ height: itemHeight, top: sideHeight }}
                />
            </div>
        </div>
    );
};

export default PickerView;
export * from './types';
