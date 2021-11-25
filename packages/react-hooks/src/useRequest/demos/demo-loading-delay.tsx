import React from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(100);

    return { name: 'Karmiy' };
};

export default () => {
    const generalRequest = useRequest(getUserInfo);

    const withLoadingDelayRequest = useRequest(getUserInfo, {
        loadingDelay: 200,
    });

    const runGetUserInfo = () => {
        generalRequest.run();
        withLoadingDelayRequest.run();
    };

    return (
        <Space direction='vertical'>
            <Button onClick={runGetUserInfo}>GetUserInfo</Button>
            {generalRequest.loading ? (
                <div>loading...</div>
            ) : (
                <div>UserName: {generalRequest.data?.name}</div>
            )}
            {withLoadingDelayRequest.loading ? (
                <div>loading...</div>
            ) : (
                <div>UserName: {withLoadingDelayRequest.data?.name}</div>
            )}
        </Space>
    );
};
