import React, { useState } from 'react';
import { useDidMount, useUnMountedState } from '@kealm/react-hooks';
import { Space, Button, Spin } from 'antd';

const request = () =>
    new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });

const Demo: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const { getIsUnMount } = useUnMountedState();

    useDidMount(async () => {
        setLoading(true);

        await request();

        // If unmounted, return
        if (getIsUnMount()) return;

        // Warning: Can't perform a React state update on an unmounted component
        setLoading(false);
    });

    return <Spin spinning={loading} />;
};

export default () => {
    const [mount, setMount] = useState(false);

    return (
        <Space size='middle'>
            <Button onClick={() => setMount(v => !v)}>{mount ? 'unmount' : 'mount'}</Button>
            {mount ? <Demo /> : null}
        </Space>
    );
};
