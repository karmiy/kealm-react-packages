import React from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(3000);

    return Math.random() > 0.5
        ? { name: 'Karmiy' }
        : Promise.reject({ message: 'something has gone wrong...' });
};

export default () => {
    const { data, loading, error, run, cancel } = useRequest(getUserInfo, {
        initialRequest: false,
    });

    return (
        <Space direction='vertical'>
            <Space size='middle'>
                <Button onClick={run} loading={loading}>
                    GetUserInfo
                </Button>
                <Button onClick={cancel} type='primary'>
                    Cancel
                </Button>
            </Space>
            {error ? <div>{error.message}</div> : null}
            {data ? <div>UserName: {data?.name}</div> : null}
        </Space>
    );
};
