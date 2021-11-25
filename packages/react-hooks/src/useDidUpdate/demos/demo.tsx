import React, { useState } from 'react';
import { useDidUpdate } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    const [count, setCount] = useState(0);

    useDidUpdate(() => {
        message.info('count updated');
    }, [count]);

    return <Button onClick={() => setCount(v => ++v)}>Add Count: {count}</Button>;
};
