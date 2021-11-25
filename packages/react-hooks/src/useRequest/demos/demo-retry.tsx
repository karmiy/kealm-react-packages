import React from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(1000);

    return Math.random() > 0.8
        ? { name: 'Karmiy' }
        : Promise.reject({ message: 'something has gone wrong...' });
};

export default () => {
    const { data, loading, error, run } = useRequest(getUserInfo, {
        retryTimes: 3,
        retryInterval: 500,
    });

    return (
        <Space direction='vertical'>
            <Button onClick={run} loading={loading}>
                GetUserInfo (retryTimes: 3)
            </Button>
            {error ? <div>{error.message}</div> : null}
            {data ? <div>UserName: {data?.name}</div> : null}
        </Space>
    );
};
