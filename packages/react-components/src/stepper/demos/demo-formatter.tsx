import React from 'react';
import { Stepper } from '@kealm/react-components';
import { Space } from 'antd';

export default () => {
    return (
        <Space direction='vertical'>
            <Stepper
                width={150}
                defaultValue={1000}
                formatter={v => `$ ${v}`.replace(/B(?=(d{3})+(?!d))/g, ',')}
                parser={v => v.replace(/\$\s?|(,*)/g, '')}
            />
            <Stepper
                width={150}
                defaultValue={1000}
                formatter={v => `${v}%`}
                parser={v => v.replace('%', '')}
            />
        </Space>
    );
};
