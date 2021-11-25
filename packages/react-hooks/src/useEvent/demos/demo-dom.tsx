import React from 'react';
import { useEvent } from '@kealm/react-hooks';
import { Button, message } from 'antd';

export default () => {
    useEvent(
        'click',
        () => {
            message.info('click event');
        },
        {
            target: () => document.querySelector('.use-event-btn') as HTMLDivElement,
        },
    );

    return <Button className='use-event-btn'>Click me</Button>;
};
