import React from 'react';
import { Button } from '@kealm/react-components';
import { Space } from 'antd';

export default () => {
    return (
        <Space>
            <Button type='primary' disabled>
                Disabled
            </Button>
            <Button type='primary' plain disabled>
                Disabled Plain
            </Button>
        </Space>
    );
};
