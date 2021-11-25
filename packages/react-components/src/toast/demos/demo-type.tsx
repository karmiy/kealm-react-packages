import React, { useState, useEffect } from 'react';
import { Toast, ToastProps } from '@kealm/react-components';
import { Button, Select, Space } from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<ToastProps['type']>('loading');

    useEffect(() => {
        if (!visible) return;

        setTimeout(() => setVisible(false), 2000);
    }, [visible]);

    return (
        <Space>
            <Button onClick={() => setVisible(true)}>Open Toast</Button>
            <Select value={type} onChange={setType}>
                <Select.Option value='loading'>loading</Select.Option>
                <Select.Option value='success'>success</Select.Option>
                <Select.Option value='warning'>warning</Select.Option>
            </Select>
            <Toast visible={visible} onVisibleChange={setVisible} type={type}>
                保存成功
            </Toast>
        </Space>
    );
};
