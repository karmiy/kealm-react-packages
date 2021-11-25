import React, { useState } from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button, Select } from 'antd';

const { Option } = Select;

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUserInfo = async () => {
    await sleep(2000);

    return { name: 'Karmiy' };
};

export default () => {
    const [timeout, setTimeout] = useState<number>();

    const { data, loading, error, run } = useRequest(getUserInfo, {
        timeout,
    });

    return (
        <Space direction='vertical'>
            <Space size='middle'>
                <Button onClick={run} loading={loading}>
                    GetUserInfo
                </Button>
                <Select value={timeout} onChange={setTimeout} placeholder='设置超时时限' allowClear>
                    <Option value={1500}>1500ms</Option>
                    <Option value={2500}>2500ms</Option>
                </Select>
            </Space>
            <Space size='middle'>
                {error ? <div>{error.message}</div> : null}
                {data ? <div>UserName: {data?.name}</div> : null}
            </Space>
        </Space>
    );
};
