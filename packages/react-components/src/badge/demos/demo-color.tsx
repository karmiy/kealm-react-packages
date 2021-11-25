import React from 'react';
import { Badge } from '@kealm/react-components';
import { Space } from 'antd';

export default () => {
    return (
        <Space size='large'>
            <Badge count={3} color='rgb(82, 196, 26)'>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge count={33} color='rgb(82, 196, 26)'>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge dot color='rgb(82, 196, 26)'>
                <div className='my-demo-badge__box' />
            </Badge>
        </Space>
    );
};
