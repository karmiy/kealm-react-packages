import { useEffect } from 'react';
import { useLiveRef } from '../useLiveRef';
import { ResolvableTarget, getTargetElement, on, off } from '../utils/dom';

export function useClickAway<E extends Event = Event>(
    target: ResolvableTarget | ResolvableTarget[],
    onClickAway: (event: E) => void,
    eventName = 'click',
) {
    const clickHandlerRef = useLiveRef(onClickAway);

    useEffect(() => {
        const handler = (e: any) => {
            const eventTarget = e.target;
            const targets = Array.isArray(target) ? target : [target];

            if (
                targets.some(item => {
                    const el = getTargetElement(item);

                    return !el || (el as Element)?.contains?.(eventTarget as Node);
                })
            ) {
                return;
            }
            clickHandlerRef.current(e);
        };

        on(document, eventName, handler);

        return () => off(document, eventName, handler);
    }, [target, clickHandlerRef, eventName]);
}
