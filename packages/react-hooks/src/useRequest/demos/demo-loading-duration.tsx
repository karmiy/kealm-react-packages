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

    const withLoadingDurationRequest = useRequest(getUserInfo, {
        loadingDuration: 1000,
    });

    const runGetUserInfo = () => {
        generalRequest.run();
        withLoadingDurationRequest.run();
    };

    return (
        <Space direction='vertical'>
            <Button onClick={runGetUserInfo}>GetUserInfo</Button>
            {generalRequest.loading ? (
                <div>loading...</div>
            ) : (
                <div>UserName: {generalRequest.data?.name}</div>
            )}
            {withLoadingDurationRequest.loading ? (
                <div>loading...</div>
            ) : (
                <div>UserName: {withLoadingDurationRequest.data?.name}</div>
            )}
        </Space>
    );
};
