import React, { useRef, useState } from 'react';
import { useClickAway } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

export default () => {
    const ref = useRef<HTMLDivElement>(null);

    const [count, setCount] = useState(0);

    useClickAway(ref, () => setCount(v => ++v));

    return (
        <Space align='center'>
            <Button ref={ref}>Click outside</Button>
            <span>Count: {count}</span>
        </Space>
    );
};
