import React from 'react';
import { useTimeoutFn } from '@kealm/react-hooks';
import { Space, Button, message } from 'antd';

export default () => {
    const { setTimer, clearTimer } = useTimeoutFn();

    return (
        <Space>
            <Button
                onClick={() => {
                    setTimer('pop', () => message.success('timer'), 3000);
                }}
            >
                Pop after 3s
            </Button>
            <Button onClick={() => clearTimer('pop')}>Clear</Button>
        </Space>
    );
};
