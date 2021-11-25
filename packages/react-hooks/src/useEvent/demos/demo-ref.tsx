import React, { useRef } from 'react';
import { useEvent } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    const ref = useRef<HTMLDivElement>(null);

    useEvent(
        'click',
        () => {
            message.info('click event');
        },
        {
            target: ref,
        },
    );

    return <Button ref={ref}>Click me</Button>;
};
