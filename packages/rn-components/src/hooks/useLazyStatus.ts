import { useRef } from 'react';

export default function useLazyStatus(visible: boolean) {
    const lazyRef = useRef(visible);

    if (visible && !lazyRef.current) lazyRef.current = true; // 第二次之后进去后若为 false，置为 true 取消 unmountOnExit

    return lazyRef.current;
}
