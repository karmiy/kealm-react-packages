import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { useDidMount, useDidUpdate } from '@kealm/react-hooks';

export interface Options {
    visible?: boolean;
    duration?: number;
    onOpen?: () => void;
    onClose?: () => void;
    afterOpen?: () => void;
    afterClose?: () => void;
    appear?: boolean;
}

/**
 * @description visible 的动画 hook，在 visible 从 false => true 时，anim 从 0 - 1，反之 1 - 0
 */
export default function useAnimatedVisible(options: Options) {
    const {
        visible = false,
        duration = 150,
        onOpen,
        onClose,
        afterOpen,
        afterClose,
        appear = true,
    } = options;

    const [actualVisible, setActualVisible] = useState(visible); // 弹框是否显示
    const anim = useRef(new Animated.Value(visible ? (appear ? 0 : 1) : 0)).current; // 当前动画轨迹

    /* 初始化 appear 动画 */
    useDidMount(() => {
        if (!appear) return;

        if (!visible) return;

        // 开启时，将 pop 内容显示，开始做动画
        setActualVisible(true);
        onOpen?.();

        Animated.timing(anim, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start(() => afterOpen?.());
    }, true);

    /* 入场/离场 */
    useDidUpdate(
        () => {
            if (visible) {
                // 开启时，将 pop 内容显示，开始做动画
                setActualVisible(true);
                onOpen?.();

                anim.setValue(0); // MAGIC CODE: 一开始 visible true，不懂为何在 false => true 时动画没了
                Animated.timing(anim, {
                    toValue: 1,
                    duration,
                    useNativeDriver: true,
                }).start(() => afterOpen?.());
            } else {
                // 关闭时，做关闭动画
                onClose?.();

                Animated.timing(anim, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true,
                }).start(() => {
                    setActualVisible(false);
                    afterClose?.();
                });
            }
        },
        [visible],
        true,
    );

    return [actualVisible, anim] as const;
}
