import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(2000);

    return { name: 'Karmiy' };
};

const Demo: React.FC = () => {
    const requestA = useRequest(getUserInfo);

    const requestB = useRequest(getUserInfo, {
        ready: !!requestA.data,
    });

    return (
        <Space direction='vertical'>
            <div>Request A：{requestA.loading ? 'loading...' : requestA.data?.name}</div>
            <div>Request B：{requestB.loading ? 'loading...' : requestB.data?.name}</div>
        </Space>
    );
};

export default () => {
    const [mount, setMount] = useState(false);

    return (
        <Space direction='vertical'>
            <Button onClick={() => setMount(v => !v)}>{mount ? 'unmount' : 'mount'}</Button>
            {mount ? <Demo /> : null}
        </Space>
    );
};
