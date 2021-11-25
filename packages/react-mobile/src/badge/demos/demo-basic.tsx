import React from 'react';
import { Badge } from '@kealm/react-mobile';
import { Space } from 'antd';

export default () => {
    return (
        <Space size='large'>
            <Badge count={3}>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge count={33}>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge count={3} visible={false}>
                <div className='my-demo-badge__box' />
            </Badge>
        </Space>
    );
};
