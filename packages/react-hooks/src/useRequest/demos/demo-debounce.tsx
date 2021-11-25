import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Input } from 'antd';

const USER_MANAGE = [
    { id: 1817, name: 'Karmiy', content: `I'm Karmiy...` },
    { id: 1818, name: 'Kealm', content: `I'm Kealm...` },
    { id: 1819, name: 'Katerina', content: `I'm Katerina...` },
];

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUsers = async (content: string) => {
    await sleep(1000);

    return USER_MANAGE.concat(content ? { id: 1820, name: 'Other', content } : []);
};

export default () => {
    const [userName, setUserName] = useState('');
    const { data, loading } = useRequest(getUsers, {
        deps: [userName],
        params: userName,
        debounceInterval: 500,
    });

    return (
        <Space direction='vertical'>
            <Input value={userName} onChange={e => setUserName(e.target.value)} />
            {loading ? (
                <div>loading...</div>
            ) : (
                data?.map(item => {
                    return (
                        <div key={item.id}>
                            id: {item.id}, name: {item.name}, content: {item.content}
                        </div>
                    );
                })
            )}
        </Space>
    );
};
