import React from 'react';
import { useDebounceFn } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    const handle = useDebounceFn(() => {
        message.success('This is a message');
    }, 1000);

    return <Button onClick={handle}>Debounce 1000ms</Button>;
};
