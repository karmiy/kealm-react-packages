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
import { useStyles, useStyleTools } from '../../hooks';
import { isString } from '../../utils/base';
import { isAndroid } from '../../utils/utils';
import { Text } from '../text';
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

    /* ------------------------------ BLOCK: 更新各区域位置高度 ------------------------------ */
    const mutateIndicator = useCallback(
        (height: number, count: number) => {
            indicatorRef.current?.setNativeProps({
                style: [
                    styles.indicator,
                    {
                        top: height * count,
                        height,
                    },
                ],
            });
        },
        [styles],
    );

    const mutateContainer = useCallback(
        (height: number, count: number) => {
            containerRef.current?.setNativeProps({
                style: [
                    styles.container,
                    {
                        height: height * (1 + count * 2),
                    },
                ],
            });
        },
        [styles],
    );

    const mutateContent = useCallback(
        (height: number, count: number) => {
            contentRef.current?.setNativeProps({
                style: [
                    styles.content,
                    {
                        paddingVertical: height * count,
                    },
                ],
            });
        },
        [styles],
    );

    const mutateLinearGradient = useCallback(
        (height: number, count: number) => {
            (linearGradientTopRef.current as any)?.setNativeProps({
                style: [
                    styles.maskTop,
                    {
                        height: height * count,
                    },
                ],
            });

            (linearGradientBottomRef.current as any)?.setNativeProps({
                style: [
                    styles.maskBottom,
                    {
                        height: height * count,
                    },
                ],
            });
        },
        [styles],
    );

    /* ------------------------------ BLOCK: 获取每一个 item 的高度，用于后续计算滚动位置 ------------------------------ */
    const [itemHeight, setItemHeight] = useState(styles.itemText.height);
    const onItemLayout = useCallback(
        (e: LayoutChangeEvent) => {
            const { height: _height } = e.nativeEvent.layout;
            // console.warn(height);
            // 四舍五入下，不然 onLayout 拿到的值和真实的有差，有小数点
            const height = Math.round(_height);

            // 更新指示器高度
            mutateIndicator(height, sideCount);

            // 更新 container 容器高度
            mutateContainer(height, sideCount);

            // 更新 content 的上下 padding
            mutateContent(height, sideCount);

            // 更新渐变蒙层的 height
            mutateLinearGradient(height, sideCount);

            setItemHeight(height);
        },
        [sideCount, mutateIndicator, mutateContainer, mutateContent, mutateLinearGradient],
    );

    /* ------------------------------ BLOCK: sideCount 变化后更新各容器 ------------------------------ */
    useDidUpdate(() => {
        const height = itemHeight;

        // 更新指示器高度
        mutateIndicator(height, sideCount);

        // 更新 container 容器高度
        mutateContainer(height, sideCount);

        // 更新 content 的上下 padding
        mutateContent(height, sideCount);

        // 更新渐变蒙层的 height
        mutateLinearGradient(height, sideCount);
    }, [sideCount]);

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
    /* 获取选中项（item, index），注：一定能拿到，如果不在列表里，则视为滚回第一项 */
    const getSelected = useCallback(() => {
        // 找不到取第一项
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
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [_, index] = getSelected();

            // 没有值就滚到第一项
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
    const isInitialScrollReadyRef = useRef(false);

    /* ScrollView 布局完成后初始化当前选中项 */
    const onScrollViewLayout = useCallback(() => {
        // 只在初始化时滚动到初始位置，后续 layout 突变不处理，因为可能 value 与布局同时变化导致连续执行 scrollViewRef.current?.scrollTo
        // 执行 scrollViewRef.current?.scrollTo 后在它完成之前再次执行，抖动，且触发 onMomentumScrollEnd，极其致命
        if (isInitialScrollReadyRef.current) return;

        isInitialScrollReadyRef.current = true;
        handleScroll();
    }, [handleScroll]);

    /* ------------------------------ BLOCK: 监听 selectedValue 变化，驱动滚动位置的调整 ------------------------------ */
    /* selectedValue 更新时滚动到指定位置 */
    useDidUpdate(() => {
        // console.warn('?:', selectedValue);
        // handleScroll();
        // 因为可能存在：
        // value 变的同时 data 列表数据也变了，这时视图会更新
        // 由于 RN 里 useEffect 回调不一定表示 native 视图渲染完成，如果立即调用可能会在为初始化完成就触发
        // 这会导致滚动与视图更新发送冲突，从而触发 onMomentumScrollEnd，且 y 值错误，所以这里建议延迟处理滚动
        selectedDriverBuffer.current = setTimeout(handleScroll, 50);
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
    const isDraggingRef = useRef(false); // 是否正在手势拖拽中
    const dragEndBuffer = useRef<ReturnType<typeof setTimeout>>(); // 拖拽结束缓冲定时器
    const selectedDriverBuffer = useRef<ReturnType<typeof setTimeout>>(); // selectedValue 驱动 scroll 定时器

    /* 尝试着触发 change 更新 */
    const attemptValueChange = useCallback(
        (top: number) => {
            // 手指还按着，不执行任何操作
            if (isDraggingRef.current) return;

            // 根据当前 scrollTop 获取当前是位于哪个 item 处
            const [currentItem, index] = getCurrentPosInfo(top);
            // console.warn('&', currentItem, index);
            if (!currentItem) return;

            if (currentItem.value === selectedValue) {
                // Android 由于没有使用 snapToInterval，如果滚到停止时没有与项对齐，应自动滚到 item 位置
                if (isAndroid && top % itemHeight !== 0) {
                    scrollToIndex(index);
                }
                return;
            }

            // 触发 onChange，驱动 Picker 组件的受控反应
            fireValueChange(currentItem.value, index);
        },
        [getCurrentPosInfo, selectedValue, fireValueChange, itemHeight, scrollToIndex],
    );

    /* 滚动完全结束后触发更新 */
    const onMomentumScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const { y } = e.nativeEvent.contentOffset;

            attemptValueChange(y);
        },
        [attemptValueChange],
    );

    /* 滚动则清除 drag end buffer */
    const onScroll = useCallback(() => {
        dragEndBuffer.current && clearTimeout(dragEndBuffer.current);
    }, []);

    /* 手势按下：记录正在拖拽中 */
    const onScrollBeginDrag = useCallback(() => {
        clearTimeout(selectedDriverBuffer.current);
        isDraggingRef.current = true;
    }, []);

    /* 手势放手：记录拖拽结束 */
    const onScrollEndDrag = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            isDraggingRef.current = false;

            if (isAndroid) return;
            const { y } = e.nativeEvent.contentOffset;

            // 由于 iOS 在放手时完全静止且与 snapToInterval 对齐时不会触发 onMomentumScrollEnd
            // 这里设个延迟，50ms 后无滚动则 set 更新
            clearTimeout(dragEndBuffer.current);

            dragEndBuffer.current = setTimeout(() => {
                // 更新
                attemptValueChange(y);
            }, 50);
        },
        [attemptValueChange],
    );

    /* ------------------------------ BLOCK: 渲染指示器 ------------------------------ */
    const renderIndicator = useMemo(
        () => <View ref={indicatorRef} style={styles.indicator} />,
        [styles],
    );

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
                    onMomentumScrollEnd={onMomentumScrollEnd}
                    snapToInterval={!isAndroid ? itemHeight : undefined} // 让滚动内容按 item 高度分页，可确保滚动停止时刚好落在合适的位置
                    nestedScrollEnabled
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
