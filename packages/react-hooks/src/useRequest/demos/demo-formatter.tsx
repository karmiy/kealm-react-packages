import React from 'react';
import { useRequest } from '@kealm/react-hooks';
import { Space, Button } from 'antd';

const sleep = (duration: number) => new Promise(r => setTimeout(r, duration));

const getUsers = async () => {
    await sleep(1000);

    return {
        count: 3,
        list: [
            { user_id: 1817, user_name: 'Karmiy', user_des: `I'm Karmiy...` },
            { user_id: 1818, user_name: 'Kealm', user_des: `I'm Kealm...` },
            { user_id: 1819, user_name: 'Katerina', user_des: `I'm Katerina...` },
        ],
    };
};

export default () => {
    const { data, loading, run } = useRequest(getUsers, {
        formatter(res) {
            return res.list.map(item => ({
                id: item.user_id,
                name: item.user_name,
                content: item.user_des,
            }));
        },
    });

    return (
        <Space direction='vertical'>
            <Button onClick={run}>getUsers</Button>
            {loading ? (
                <div>loading...</div>
            ) : (
                data?.map(item => {
                    return (
                        <div key={item.id}>
                            id: {item.id}, name: {item.name}, content: {item.content}
                        </div>
                    );
                })
            )}
        </Space>
    );
};
