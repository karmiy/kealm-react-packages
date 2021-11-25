import React from 'react';
import { Badge } from '@kealm/react-mobile';
import { Space } from 'antd';

export default () => {
    return (
        <Space size='large'>
            <Badge dot>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge dot visible={false}>
                <div className='my-demo-badge__box' />
            </Badge>
        </Space>
    );
};
