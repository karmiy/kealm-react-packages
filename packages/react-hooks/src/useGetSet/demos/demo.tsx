import React, { useState } from 'react';
import { useGetSet } from '@kealm/react-hooks';
import { Button, Space, message } from 'antd';

export default () => {
    const [getCount, setCount] = useGetSet(0);
    const [value, setValue] = useState(0);

    return (
        <Space size='large'>
            <Space>
                <span>useGetSet:</span>
                <Button
                    onClick={() => {
                        setCount(v => ++v);
                        message.success(getCount()); // 可以立即拿到最新值
                    }}
                >
                    Add Count: {getCount()}
                </Button>
            </Space>
            <Space>
                <span>useState:</span>
                <Button
                    onClick={() => {
                        setValue(v => ++v);
                        message.success(value); // 不能立即拿到最新值
                    }}
                >
                    Add Count: {value}
                </Button>
            </Space>
        </Space>
    );
};
