import React, { useState } from 'react';
import { useWillUnMount } from '@kealm/react-hooks';
import { Button, message } from 'antd';

const Demo: React.FC = () => {
    useWillUnMount(() => {
        message.success('unMount success');
    });

    return <div>Demo</div>;
};

export default () => {
    const [mount, setMount] = useState(true);

    return (
        <div>
            <Button onClick={() => setMount(v => !v)}>{mount ? 'unmount' : 'mount'}</Button>
            {mount ? <Demo /> : null}
        </div>
    );
};
