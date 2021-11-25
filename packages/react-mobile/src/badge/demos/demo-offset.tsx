import React from 'react';
import { Badge } from '@kealm/react-mobile';
import { Space } from 'antd';

export default () => {
    return (
        <Space size='large'>
            <Badge count={3} offset={{ right: 10, top: 10 }}>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge count={33} offset={{ right: 10, top: 10 }}>
                <div className='my-demo-badge__box' />
            </Badge>
            <Badge dot offset={{ right: 10, top: 10 }}>
                <div className='my-demo-badge__box' />
            </Badge>
        </Space>
    );
};
