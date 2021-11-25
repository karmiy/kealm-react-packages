import React from 'react';
import { Button } from '@kealm/react-components';
import { Space } from 'antd';

export default () => {
    return (
        <Space>
            <Button color='yellowgreen'>Custom Color</Button>
            <Button color='yellowgreen' plain>
                Custom Color with Plain
            </Button>
        </Space>
    );
};
