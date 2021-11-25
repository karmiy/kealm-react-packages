import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(1000);

    return { name: 'Karmiy' };
};

const Demo: React.FC = () => {
    const { data, loading, error } = useRequest(getUserInfo);

    if (error) return <div>something has gone wrong</div>;

    if (loading) return <div>loading...</div>;

    return <div>UserName: {data?.name}</div>;
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
