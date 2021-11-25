import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const USER_MANAGE = [
    { id: 1817, name: 'Karmiy', content: `I'm Karmiy...` },
    { id: 1818, name: 'Kealm', content: `I'm Kealm...` },
    { id: 1819, name: 'Katerina', content: `I'm Katerina...` },
];

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(1000);

    return USER_MANAGE[Math.floor(Math.random() * 3)];
};

const Demo: React.FC = () => {
    const { data, loading } = useRequest(getUserInfo, {
        cacheKey: 'getUserInfo',
    });

    if (!data && loading) return <div>loading...</div>;

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
