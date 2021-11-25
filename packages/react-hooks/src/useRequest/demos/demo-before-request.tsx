import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button, Select, message } from 'antd';

const styles = {
    select: { width: 120 },
};

const { Option } = Select;

enum NETWORK {
    '4G',
    'Offline',
}

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
    const [network, setNetwork] = useState<NETWORK>(NETWORK['4G']);
    const { data, run, loading } = useRequest(getUserInfo, {
        async beforeRequest() {
            if (network === NETWORK.Offline) {
                message.warn('咦？网络不见了，请检查网络连接');
                return false;
            }
            return true;
        },
    });

    return (
        <Space direction='vertical'>
            <Space size='middle'>
                <Button onClick={run} loading={loading}>
                    GetUserInfo
                </Button>
                <Select style={styles.select} value={network} onChange={setNetwork}>
                    <Option value={NETWORK['4G']}>4G</Option>
                    <Option value={NETWORK.Offline}>Offline</Option>
                </Select>
            </Space>
            {loading ? <div>loading...</div> : <div>UserName: {data?.name}</div>}
        </Space>
    );
};
