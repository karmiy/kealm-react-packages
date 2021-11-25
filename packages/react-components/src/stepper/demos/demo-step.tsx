import React from 'react';
import { Stepper } from '@kealm/react-components';
import { Space, Tag } from 'antd';

export default () => {
    return (
        <Space direction='vertical'>
            <Space align='center'>
                <Stepper step={2} />
                <Tag color='blue'>Step = 2</Tag>
            </Space>
            <Space align='center'>
                <Stepper step={0.1} />
                <Tag color='blue'>Step = 0.1</Tag>
            </Space>
        </Space>
    );
};
