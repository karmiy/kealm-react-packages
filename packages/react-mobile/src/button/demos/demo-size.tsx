import React from 'react';
import { Button } from '@kealm/react-mobile';
import { Space } from 'antd';

export default () => {
    return (
        <Space direction='vertical'>
            <Button type='primary' size='large' width={290}>
                Large Button
            </Button>
            <Button type='primary' plain size='large' width={290}>
                Large Plain Button
            </Button>
        </Space>
    );
};
