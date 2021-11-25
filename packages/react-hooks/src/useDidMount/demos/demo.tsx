import React, { useState } from 'react';
import { useDidMount } from '@kealm/react-hooks';
import { Button, message } from 'antd';

const Demo: React.FC = () => {
    useDidMount(() => {
        message.success('mount success');
    });

    return <div>Demo</div>;
};

export default () => {
    const [mount, setMount] = useState(false);

    return (
        <div>
            <Button onClick={() => setMount(v => !v)}>{mount ? 'unmount' : 'mount'}</Button>
            {mount ? <Demo /> : null}
        </div>
    );
};
