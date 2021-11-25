import React, { useEffect } from 'react';
import { useUpdate } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    const forceUpdate = useUpdate();

    useEffect(() => {
        message.info('render finished');
    });

    return <Button onClick={forceUpdate}>Force Render</Button>;
};
