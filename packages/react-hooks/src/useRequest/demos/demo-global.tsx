import React from 'react';
import { useRequest, RequestConfigProvider } from '@kealm/react-hooks';
import { Space, Button, message } from 'antd';

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
    const { data, loading, error, run } = useRequest(getUserInfo);

    return (
        <Space size='middle'>
            <Button onClick={run} loading={loading}>
                GetUserInfo
            </Button>
            {error ? <div>{error.message}</div> : null}
            {data ? <div>UserName: {data?.name}</div> : null}
        </Space>
    );
};

export default () => {
    return (
        <RequestConfigProvider
            value={{
                initialRequest: false,
                onSuccess() {
                    message.success('global success');
                },
            }}
        >
            <Demo />
        </RequestConfigProvider>
    );
};
