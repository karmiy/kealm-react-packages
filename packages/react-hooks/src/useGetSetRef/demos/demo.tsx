import React from 'react';
import { useGetSetRef } from '@kealm/react-hooks';
import { Button, Space, message } from 'antd';

export default () => {
    const [getCount, setCount] = useGetSetRef(0);

    return (
        <Space>
            <span>useGetSetRef:</span>
            <Button
                onClick={() => {
                    setCount(v => ++v);
                    message.success(getCount());
                }}
            >
                Add Count
            </Button>
        </Space>
    );
};
