import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button, Input } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(1000);

    return { name: 'Karmiy' };
};

export default () => {
    const [value, setValue] = useState('');
    const { data, loading, mutate } = useRequest(getUserInfo, {
        onSuccess(res) {
            setValue(res.name);
        },
    });

    return (
        <Space size='middle'>
            <Input value={value} onChange={e => setValue(e.target.value)} />
            <Button
                onClick={() =>
                    mutate(prevData => {
                        if (!prevData) return;
                        return { ...prevData, name: value };
                    })
                }
            >
                Edit
            </Button>
            {loading ? <div>loading...</div> : <div>UserName: {data?.name}</div>}
        </Space>
    );
};
