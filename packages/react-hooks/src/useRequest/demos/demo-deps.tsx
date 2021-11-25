import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Select } from 'antd';

const { Option } = Select;

const USER_MANAGE = [
    { id: 1817, name: 'Karmiy', content: `I'm Karmiy...` },
    { id: 1818, name: 'Kealm', content: `I'm Kealm...` },
    { id: 1819, name: 'Katerina', content: `I'm Katerina...` },
];

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async (id: number) => {
    await sleep(1000);

    return (
        USER_MANAGE.find(item => item.id === id) ??
        Promise.reject({ message: 'something has gone wrong...' })
    );
};

export default () => {
    const [userId, setUserId] = useState(USER_MANAGE[0].id);
    const { data, loading, error } = useRequest(getUserInfo, {
        deps: [userId],
        params: userId,
    });

    return (
        <Space size='middle'>
            <Select value={userId} onChange={setUserId} loading={loading}>
                {USER_MANAGE.map(item => (
                    <Option key={item.id} value={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
            {error ? <div>{error.message}</div> : null}
            {data ? <div>{data?.content}</div> : null}
        </Space>
    );
};
