import React, { useState } from 'react';
import { usePrevious } from '@kealm/react-hooks';
import { Button, Space } from 'antd';

export default () => {
    const [count, setCount] = useState(0);
    const prevCount = usePrevious(count);

    return (
        <Space direction='vertical'>
            <Button onClick={() => setCount(v => ++v)}>Add Count</Button>
            <span>previous count: {prevCount}</span>
            <span>current count: {count}</span>
        </Space>
    );
};
