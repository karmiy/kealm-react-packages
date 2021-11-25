import React from 'react';
import { useThrottleFn } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    const handle = useThrottleFn(() => {
        message.success('This is a message');
    }, 1000);

    return <Button onClick={handle}>Throttle 1000ms</Button>;
};
