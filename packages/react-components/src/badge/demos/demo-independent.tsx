import React from 'react';
import { Badge } from '@kealm/react-components';
import { Space } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export default () => {
    return (
        <Space size='large' align='center'>
            <Badge count={3} />
            <Badge count={33} color='rgb(82, 196, 26)' />
            <Badge count={<CheckOutlined />} color='#1394ff' />
        </Space>
    );
};
