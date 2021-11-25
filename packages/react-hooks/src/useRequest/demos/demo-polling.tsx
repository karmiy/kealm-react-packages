import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Switch } from 'antd';

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

export default () => {
    const [isOpen, setIsOpen] = useState(true);

    const { data, loading } = useRequest(getUserInfo, {
        pollingInterval: isOpen ? 3000 : 0,
    });

    return (
        <Space size='middle'>
            <Switch checked={isOpen} onChange={setIsOpen} />
            {loading ? <div>loading...</div> : <div>UserName: {data?.name}</div>}
        </Space>
    );
};
