import React, { useState } from 'react';
import { useClickAway } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

export default () => {
    const [count, setCount] = useState(0);

    useClickAway(
        () => document.querySelector('.use-click-away-btn'),
        () => setCount(v => ++v),
    );

    return (
        <Space align='center'>
            <Button className='use-click-away-btn'>Click outside</Button>
            <span>Count: {count}</span>
        </Space>
    );
};
