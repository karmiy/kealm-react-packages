import React, { useState } from 'react';
import { Picker } from '@kealm/react-components';
import { Button, Space, Tag } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';

enum SEX {
    '男' = 1,
    '女' = 2,
}

export default () => {
    const [value, setValue] = useState<SEX>();
    const [visible, setVisible] = useState(false);

    return (
        <Space>
            <Button onClick={() => setVisible(true)}>Open Picker</Button>
            {value === SEX.男 ? (
                <Tag icon={<ManOutlined />} color='blue'>
                    Man
                </Tag>
            ) : (
                <Tag icon={<WomanOutlined />} color='magenta'>
                    Woman
                </Tag>
            )}
            {/* 默认选中 '女' */}
            <Picker
                visible={visible}
                onVisibleChange={setVisible}
                data={[
                    { label: '男', value: SEX.男 },
                    { label: '女', value: SEX.女 },
                ]}
                defaultValue={SEX.女}
                value={value}
                onChange={setValue}
            />
        </Space>
    );
};
