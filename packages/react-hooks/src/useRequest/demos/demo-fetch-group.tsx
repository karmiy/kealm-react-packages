import React from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button, message } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    message.info('request something');
    await sleep(1000);

    return { name: 'Karmiy' };
};

const Demo: React.FC<{ isFetchGroup?: boolean }> = ({ isFetchGroup = false }) => {
    const requestA = useRequest(getUserInfo, {
        initialRequest: false,
        ...(isFetchGroup ? { fetchGroup: 'getUserInfo' } : {}),
    });

    const requestB = useRequest(getUserInfo, {
        initialRequest: false,
        ...(isFetchGroup ? { fetchGroup: 'getUserInfo' } : {}),
    });

    const runGetUserInfo = () => {
        requestA.run();
        requestB.run();
    };

    return (
        <Space direction='vertical'>
            <Space size='middle'>
                <Button onClick={runGetUserInfo}>
                    GetUserInfo{isFetchGroup ? '（Group）' : ''}
                </Button>
            </Space>
            {requestA.loading ? <div>loading...</div> : <div>UserName: {requestA.data?.name}</div>}
            {requestB.loading ? <div>loading...</div> : <div>UserName: {requestB.data?.name}</div>}
        </Space>
    );
};

export default () => {
    return (
        <Space size={80}>
            <Demo />
            <Demo isFetchGroup />
        </Space>
    );
};
