import { useState, useRef, TouchEvent } from 'react';

interface Options {
    onStart?: (info: { startX: number; startY: number }) => void;
    onResponse?: (info: { deltaX: number; deltaY: number }) => void;
    onEnd?: () => void;
}

const MIN_DISTANCE = 10;

const getDirection = (x: number, y: number) => {
    if (x > y && x > MIN_DISTANCE) {
        return 'horizontal';
    }
    if (y > x && y > MIN_DISTANCE) {
        return 'vertical';
    }
    return '';
};

export function usePanGesture(options?: Options) {
    const { onStart, onResponse, onEnd } = options ?? {};
    const panParamsRef = useRef({
        startX: 0,
        startY: 0,
    });
    const [direction, setDirection] = useState<'horizontal' | 'vertical' | ''>('');
    const [isMoving, setIsMoving] = useState(false);

    const isVertical = direction === 'vertical';
    const isHorizontal = direction === 'horizontal';

    const panStart = (e: TouchEvent) => {
        setDirection('');
        const touch = e.touches[0];
        const { clientX: startX, clientY: startY } = touch;
        panParamsRef.current.startX = startX;
        panParamsRef.current.startY = startY;
        onStart?.({ startX, startY });
    };

    const panMove = (e: TouchEvent) => {
        // e.preventDefault(); // 阻止默认，可能出现抖动问题

        setIsMoving(true);
        const touch = e.touches[0];
        const { startX, startY } = panParamsRef.current;

        const { clientX: moveX, clientY: moveY } = touch;
        const deltaX = moveX < 0 ? 0 : moveX - startX;
        const deltaY = moveY - startY;

        onResponse?.({ deltaX, deltaY });

        setDirection(getDirection(Math.abs(deltaX), Math.abs(deltaY)));
    };

    const panEnd = () => {
        setIsMoving(false);
        onEnd?.();
    };

    return { panStart, panMove, panEnd, isVertical, isHorizontal, isMoving };
}
