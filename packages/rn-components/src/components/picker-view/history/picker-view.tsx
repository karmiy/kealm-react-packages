import React, {
    useContext,
    useCallback,
    useMemo,
    useRef,
    useState,
    forwardRef,
    useImperativeHandle,
} from 'react';
import {
    View,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    LayoutChangeEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDidUpdate } from '@kealm/react-hooks';
import PickerViewItem from './picker-view-item';
import { useStyles, useStyleTools } from '../../../hooks';
import { isEmpty, isString } from '../../../utils/base';
import { Text } from '../../text';
import { PickerViewType, PickerViewProps, PickerViewRef } from './types';
import { DEFAULT_SIDE_COUNT } from './utils';
import { withPickerViewStyles } from './style';
import { PickerViewStylesContext } from './context';

/**
 * 响应流程：
 * 滚动 => 滚动停止 => 计算当前 item => onChange 回调更新 selectedValue => 组件受控监听 selectedValue 变化 => 监听到变化，滚动调整位置
 *
 * 思考：
 * 滚动结束后正在回调位置，这在期间又进行下次滚动，是否有冲突？（目前看来没问题）
 * 执行 scrollTo 调整位置时也会触发 onScroll，是否有影响？（应该无影响，因为指向的目标 value 是一样的，这样不会触发 onChange）
 *
 * 注意：
 * 暂不考虑通过 onMomentumScrollEnd 判断是否滚动停止，IOS 和 Android 表示差异大
 *      Android 放手时即使无惯性效果，也触发
 *      IOS 放手时若无惯性效果（放手时完全静止且与 snapToInterval 对齐），不会触发
 * 不能在 useEffect 里初始化当前选中，因为 useEffect 初始执行时，native 可能布局尚未完成，导致 scrollTo 执行无效
 */
const PickerView = forwardRef<PickerViewRef, PickerViewProps>((props, ref) => {
    const {
        styles: _styles,
        style,
        selectedValue,
        onValueChange,
        children,
        sideCount = DEFAULT_SIDE_COUNT,
        animated = true,
        ...restProps
    } = props;

    /* ------------------------------ BLOCK: 组件 ref ------------------------------ */
    const scrollViewRef = useRef<ScrollView>(null);
    const indicatorRef = useRef<View>(null);
    const containerRef = useRef<View>(null);
    const contentRef = useRef<View>(null);
    const linearGradientTopRef = useRef<LinearGradient>(null);
    const linearGradientBottomRef = useRef<LinearGradient>(null);

    /* ------------------------------ BLOCK: 样式 ------------------------------ */
    const contextStyles = useContext(PickerViewStylesContext);
    const styles = useStyles(withPickerViewStyles, contextStyles, _styles);
    const { theme } = useStyleTools();

    const wrapperStyles = useMemo(() => {
        return [styles.wrapper, style];
    }, [styles, style]);

    /* ------------------------------ BLOCK: 获取全部 item 项 ------------------------------ */
    const items: Array<{
        label: React.ReactNode;
        value: any;
        index: number;
    }> = useMemo(() => {
        return React.Children.map(children, (item: any, index) => {
            const { label, value } = item.props;
            return {
                label,
                value,
                index,
            };
        });
    }, [children]);

    /* ------------------------------ BLOCK: 获取每一个 item 的高度，用于后续计算滚动位置 ------------------------------ */
    const [itemHeight, setItemHeight] = useState(styles.itemText.height);
    const onItemLayout = useCallback(
        (e: LayoutChangeEvent) => {
            const { height } = e.nativeEvent.layout;
            // console.warn(height);

            // 更新指示器高度
            indicatorRef.current?.setNativeProps({
                style: [
                    styles.indicator,
                    {
                        top: height * sideCount,
                        height,
                    },
                ],
            });

            // 更新 container 容器高度
            containerRef.current?.setNativeProps({
                style: [
                    styles.container,
                    {
                        height: height * (1 + sideCount * 2),
                    },
                ],
            });

            // 更新 content 的上下 padding
            contentRef.current?.setNativeProps({
                style: [
                    styles.content,
                    {
                        paddingVertical: height * sideCount,
                    },
                ],
            });

            // 更新渐变蒙层的 height
            (linearGradientTopRef.current as any)?.setNativeProps({
                style: [
                    styles.maskTop,
                    {
                        height: height * sideCount,
                    },
                ],
            });

            (linearGradientBottomRef.current as any)?.setNativeProps({
                style: [
                    styles.maskBottom,
                    {
                        height: height * sideCount,
                    },
                ],
            });

            setItemHeight(height);
        },
        [styles, sideCount],
    );

    /* ------------------------------ BLOCK: 滚动相关方法 ------------------------------ */
    /* 滚动到第几项 */
    const scrollToIndex = useCallback(
        (index: number, isAnimated = animated) => {
            scrollViewRef.current?.scrollTo({
                // 注意： content 有 3 个 item 的 paddingTop
                y: Math.max(0, Math.min(items.length, index)) * itemHeight,
                animated: isAnimated,
            });
            // console.warn('开始滚');
        },
        [items, itemHeight, animated],
    );

    /* ------------------------------ BLOCK: item 相关方法 ------------------------------ */
    /* 获取选中项（item, index） */
    const getSelected = useCallback(() => {
        const index = items.findIndex(item => item.value === selectedValue) ?? 0;

        return [items[index], index] as const;
    }, [items, selectedValue]);

    /* 获取当前位置的项（item, index） */
    const getCurrentPosInfo = useCallback(
        (top: number) => {
            const index = Math.max(0, Math.min(Math.round(top / itemHeight), items.length));
            return [items[index], index] as const;
        },
        [items, itemHeight],
    );

    /* 触发 onChange 事件 */
    const fireValueChange = useCallback(
        (value: any, index: number) => {
            if (value === selectedValue) return;

            onValueChange?.(value, index);
        },
        [selectedValue, onValueChange],
    );

    /* 触发一个滚动，滚到选中的位置 */
    const handleScroll = useCallback(
        (isAnimated?: boolean) => {
            const [selectedItem, index] = getSelected();

            if (!selectedItem) return;

            scrollToIndex(index, isAnimated);
        },
        [getSelected, scrollToIndex],
    );

    /* ------------------------------ BLOCK: 创建 pickerRef ------------------------------ */
    useImperativeHandle(
        ref,
        () => ({
            handleScroll,
        }),
        [handleScroll],
    );

    /* ------------------------------ BLOCK: 页面布局完成后初始化当前选中的位置 ------------------------------ */
    /* ScrollView 布局完成后初始化当前选中项 */
    const onScrollViewLayout = useCallback(() => {
        handleScroll();
    }, [handleScroll]);

    /* ------------------------------ BLOCK: 监听 selectedValue 变化，驱动滚动位置的调整 ------------------------------ */
    /* selectedValue 更新时滚动到指定位置 */
    useDidUpdate(() => {
        handleScroll();
    }, [selectedValue]);

    /* useDidMount(() => {
        InteractionManager.runAfterInteractions(() => {
            const [selectedItem, index] = getSelected();

            if (!selectedItem) return;
            console.warn(index, '初始滚');

            scrollToIndex(index, false);
        });
    }); */

    /* ------------------------------ BLOCK: 滚动 => 滚动结束流程 ------------------------------ */

    const scrollBuffer = useRef<ReturnType<typeof setTimeout>>(); // 滚动缓冲的定时器
    const isDraggingRef = useRef(false); // 是否正在手势拖拽中

    /* 清除定时器 */
    const clearScrollBuffer = useCallback(() => {
        if (!isEmpty(scrollBuffer.current)) {
            clearTimeout(scrollBuffer.current);
        }
    }, []);

    /* 开启滚动定时器：滚动结束后计算 value 的变化并触发 onChange 更新 */
    const setScrollBuffer = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            // 手指还按着，不执行任何操作
            if (isDraggingRef.current) return;

            const { y } = e.nativeEvent.contentOffset;

            clearScrollBuffer();

            // 开启 dev 调试会使 setTimeout 失效
            // https://github.com/facebook/react-native/issues/9436
            scrollBuffer.current = setTimeout(() => {
                clearScrollBuffer();

                // 可能前一次滚动停时后，还没派发 onChange，手指已经二次触摸进行下一次滚动
                if (isDraggingRef.current) return;

                // 根据当前 scrollTop 获取当前是位于哪个 item 处
                const [currentItem, index] = getCurrentPosInfo(y);
                if (!currentItem) return;

                if (currentItem.value === selectedValue) {
                    // 选中项没有变，不需要触发 onChange，调整下位置即可
                    // 场景：当前在 index 10 的位置，手指只拖动一点点，放手时还是需要回归到 index 10 的位置
                    // 如果此处没执行 scrollToIndex，那上述场景在放手时，指针将不会滚动回归到 index 10 的位置，而是静止不动
                    scrollToIndex(index);
                    return;
                }

                // 触发 onChange，驱动 Picker 组件的受控反应
                fireValueChange(currentItem.value, index);
            }, 150);
        },
        [clearScrollBuffer, getCurrentPosInfo, fireValueChange, selectedValue, scrollToIndex],
    );

    const onScroll = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            setScrollBuffer(e);
        },
        [setScrollBuffer],
    );

    /* 手势按下：记录正在拖拽中 */
    const onScrollBeginDrag = useCallback(() => {
        isDraggingRef.current = true;
    }, []);

    /* 手势放手：记录拖拽结束 */
    const onScrollEndDrag = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            isDraggingRef.current = false;

            // e: NativeSyntheticEvent<NativeScrollEvent>
            // 场景：放手时，可能已经没有惯性效果了，且完全与 snapToInterval 对其
            // 问题：这时由于不会滚动，是不会触发 onScroll 的，所以需要放手时也手动触发一次 setScrollBuffer
            setScrollBuffer(e);
        },
        [setScrollBuffer],
    );

    /* ------------------------------ BLOCK: 渲染指示器 ------------------------------ */
    const renderIndicator = useMemo(() => <View ref={indicatorRef} style={styles.indicator} />, [
        styles,
    ]);

    /* ------------------------------ BLOCK: 渐变蒙层 ------------------------------ */
    const renderLinearGradientTop = useMemo(() => {
        return (
            <LinearGradient
                ref={linearGradientTopRef}
                style={styles.maskTop}
                colors={theme.c_picker_view_item_grandient_top}
                pointerEvents='none'
            />
        );
    }, [styles, theme]);

    const renderLinearGradientBottom = useMemo(() => {
        return (
            <LinearGradient
                ref={linearGradientBottomRef}
                style={styles.maskBottom}
                colors={theme.c_picker_view_item_grandient_bottom}
                pointerEvents='none'
            />
        );
    }, [styles, theme]);

    /* ------------------------------ BLOCK: 内容区域 ------------------------------ */
    const renderContent = useMemo(() => {
        return (
            <View ref={contentRef} style={styles.content}>
                {items.map((item, index) => {
                    return (
                        <View
                            key={item.index}
                            // 只取第一项的高作为基准
                            onLayout={index === 0 ? onItemLayout : undefined}
                        >
                            {isString(item.label) ? (
                                <Text
                                    style={styles.itemText}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'
                                >
                                    {item.label}
                                </Text>
                            ) : (
                                item.label
                            )}
                        </View>
                    );
                })}
            </View>
        );
    }, [styles, items, onItemLayout]);

    return (
        <View style={wrapperStyles} {...restProps}>
            <View ref={containerRef} style={styles.container}>
                {/* 指示器 */}
                {renderIndicator}

                {/* 滚动区域 */}
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.scrollView}
                    onLayout={onScrollViewLayout}
                    showsVerticalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    onScrollBeginDrag={onScrollBeginDrag}
                    onScrollEndDrag={onScrollEndDrag}
                    snapToInterval={itemHeight} // 让滚动内容按 item 高度分页，可确保滚动停止时刚好落在合适的位置
                >
                    {renderContent}
                </ScrollView>

                {/* 渐变蒙层 */}
                {renderLinearGradientTop}
                {renderLinearGradientBottom}
            </View>
        </View>
    );
}) as PickerViewType;

PickerView.Item = PickerViewItem;

export { PickerView };
export * from './types';
export * from './style';
export * from './context';
