import { useRef } from 'react';
import { useGetSet, useLiveRef } from '@kealm/react-hooks';
import { usePanGesture } from './usePanGesture';
import { CubicBezier, getBezierParams } from '../_utils/cubic-bezier';
import { isEmpty } from '../_utils/base';

type Bounce = 'noBounce' | 'weakBounce' | 'strongBounce';

const DURATION_MAP = {
    noBounce: 2500,
    weakBounce: 800,
    strongBounce: 400,
};
const BEZIER_MAP = {
    default: 'cubic-bezier(.165, .84, .44, 1)',
    noBounce: 'cubic-bezier(.26, .74, .51, .91)',
    weakBounce: 'cubic-bezier(.25, .46, .45, .94)',
    strongBounce: 'cubic-bezier(.25, .46, .45, .94)',
};

interface Options {
    initialOffset?: number | (() => number);
    maxOffset?: number;
    minOffset?: number;
    momentumTimeThreshold?: number; // 惯性滑动的启动 时间阈值
    momentumDeltaThreshold?: number; // 惯性滑动的启动 距离阈值
    deceleration?: number; // 惯性滑动加速度
    bounceRate?: number; // 回弹阻力
    bounceThreshold?: number; // 强弱回弹的分割值
    maxOverflowY?: number; // 回弹的最大限度
    snapToInterval?: number;
    onMomentumEnd?: () => void; // 动力结束回调
}

export function usePanGestureScroll(options?: Options) {
    const {
        initialOffset = 0,
        momentumTimeThreshold = 300,
        momentumDeltaThreshold = 15,
        maxOffset = Infinity,
        minOffset = -Infinity,
        deceleration = 0.003,
        bounceRate = 10,
        bounceThreshold = 300,
        maxOverflowY = 0,
        snapToInterval,
        onMomentumEnd,
    } = options ?? {};
    const [getOffset, setOffset] = useGetSet(initialOffset); // 当前偏移量
    const offset = getOffset();
    const ref = useRef({
        startOffset: 0, // 按下时刻偏移量
        momentumOffset: {
            startY: 0, // 惯性滑动范围内的 y 偏移
            startTime: 0, // 惯性滑动范围内的开始时间
        },
        raf: 0,
    });
    const onMomentumEndRef = useLiveRef(onMomentumEnd); // 需要保存最新引用，否则 animate 动画回调会拿到初始传入时刻的引用

    const adjustToInterval = (value: number) => {
        if (isEmpty(snapToInterval)) return value;

        return Math.round(value / snapToInterval) * snapToInterval;
    };

    /* 能量守恒，计算终点值 */
    const momentum = (current: number, start: number, duration: number) => {
        let type: Bounce = 'noBounce';
        let overflowY: number;

        const distance = current - start;
        const speed = (2 * Math.abs(distance)) / duration;
        let destination = current + (speed / deceleration) * (distance < 0 ? -1 : 1);

        if (destination < minOffset) {
            overflowY = minOffset - destination;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weakBounce';
            destination = Math.max(minOffset - maxOverflowY, minOffset - overflowY / bounceRate);
        } else if (destination > maxOffset) {
            overflowY = destination - maxOffset;
            type = overflowY > bounceThreshold ? 'strongBounce' : 'weakBounce';
            destination = Math.min(maxOffset + maxOverflowY, maxOffset + overflowY / bounceRate);
        }

        // console.log(destination, DURATION_MAP[type], BEZIER_MAP[type]);
        return {
            destination: adjustToInterval(destination),
            duration: DURATION_MAP[type],
            bezier: BEZIER_MAP[type],
        };
    };

    /* 停止当前运动 */
    const stopAnimation = () => {
        cancelAnimationFrame(ref.current.raf);
    };

    /* 动画、运动 */
    const animate = (
        current: number,
        target: number,
        duration: number,
        cubicBezier: CubicBezier,
        startTime: number,
        onEnd?: () => void,
    ) => {
        ref.current.raf = requestAnimationFrame(() => {
            const now = new Date().getTime();
            const deltaTime = now - startTime;
            const nextOffset = Math[target > current ? 'min' : 'max'](
                cubicBezier.getY(deltaTime / duration) * (target - current) + current,
                target,
            );
            const isEnd = deltaTime >= duration;
            setOffset(isEnd ? Math.round(nextOffset) : nextOffset);
            !isEnd ? animate(current, target, duration, cubicBezier, startTime, onEnd) : onEnd?.();
        });
    };

    /* 改变 offset */
    const mutateOffset = (config: { offset: number; isAnimated?: boolean; duration?: number }) => {
        const { offset: nextOffset, isAnimated = true, duration = 250 } = config;
        if (nextOffset === getOffset()) return;
        if (!isAnimated) return setOffset(nextOffset);

        animate(
            getOffset(),
            nextOffset,
            duration,
            new CubicBezier(...getBezierParams(BEZIER_MAP.default)),
            new Date().getTime(),
        );
    };

    /* 是否需要回弹 */
    const isNeedReset = () => {
        const nextOffset = Math.max(Math.min(getOffset(), maxOffset), minOffset);

        if (nextOffset !== getOffset()) {
            animate(
                getOffset(),
                nextOffset,
                500,
                new CubicBezier(...getBezierParams(BEZIER_MAP.default)),
                new Date().getTime(),
                // 回弹结束
                () => onMomentumEndRef.current?.(),
            );
            return true;
        }

        return false;
    };

    const panGesture = usePanGesture({
        onStart() {
            stopAnimation();
            ref.current.startOffset = getOffset();
            ref.current.momentumOffset.startY = getOffset();
            ref.current.momentumOffset.startTime = new Date().getTime();
        },
        onResponse({ deltaY }) {
            // 获取拖拽的偏移，更新
            const nextOffset = ref.current.startOffset + deltaY;
            setOffset(nextOffset);

            const { startTime } = ref.current.momentumOffset;
            const now = new Date().getTime();
            // 记录在触发惯性滑动条件下的偏移值和时间
            if (now - startTime > momentumTimeThreshold) {
                ref.current.momentumOffset.startY = nextOffset;
                ref.current.momentumOffset.startTime = now;
            }
        },
        onEnd() {
            // 判断是否需要回滚
            if (isNeedReset()) return;

            const { startY, startTime } = ref.current.momentumOffset;
            const deltaDistance = Math.abs(getOffset() - startY);
            const deltaDuration = new Date().getTime() - startTime;

            // 是否启动惯性滑动
            if (deltaDuration < momentumTimeThreshold && deltaDistance > momentumDeltaThreshold) {
                const { destination, bezier, duration } = momentum(
                    getOffset(),
                    startY,
                    deltaDuration,
                );

                animate(
                    getOffset(),
                    destination,
                    duration,
                    new CubicBezier(...getBezierParams(bezier)),
                    new Date().getTime(),
                    () => {
                        // 运动结束不需要回弹，结束
                        if (!isNeedReset()) onMomentumEndRef.current?.();
                    },
                );
                return;
            }
            // 无惯性，是否需要矫正
            const _offset = adjustToInterval(getOffset());
            if (_offset !== getOffset()) {
                animate(
                    getOffset(),
                    _offset,
                    100,
                    new CubicBezier(...getBezierParams(BEZIER_MAP.default)),
                    new Date().getTime(),
                    // 回弹结束
                    () => onMomentumEndRef.current?.(),
                );
                return;
            }
            onMomentumEndRef.current?.();
        },
    });

    return { offset, getOffset, mutateOffset, ...panGesture };
}
