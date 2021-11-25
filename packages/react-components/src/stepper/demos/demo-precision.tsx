import React from 'react';
import { Stepper } from '@kealm/react-components';
import { Space, Tag } from 'antd';

export default () => {
    return (
        <Space direction='vertical'>
            <Space align='center'>
                <Stepper precision={1} />
                <Tag color='green'>precision = 1</Tag>
            </Space>
            <Space align='center'>
                <Stepper precision={2} />
                <Tag color='green'>precision = 2</Tag>
            </Space>
        </Space>
    );
};
