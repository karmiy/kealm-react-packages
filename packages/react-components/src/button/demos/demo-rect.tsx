import React from 'react';
import { Button } from '@kealm/react-components';
import { Space } from 'antd';

export default () => {
    return (
        <Space direction='vertical'>
            <Button type='primary' width={290} height={32}>
                Custom Rect Button
            </Button>
            <Button type='primary' plain width={290} height={32}>
                Custom Rect Plain Button
            </Button>
        </Space>
    );
};
