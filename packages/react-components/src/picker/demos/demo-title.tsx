import React, { useState } from 'react';
import { Picker } from '@kealm/react-components';
import { Button } from 'antd';

enum SEX {
    '男' = 1,
    '女' = 2,
}

export default () => {
    const [value, setValue] = useState<SEX>();
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open Picker</Button>
            <Picker
                title='请选择性别'
                visible={visible}
                onVisibleChange={setVisible}
                data={[
                    { label: '男', value: SEX.男 },
                    { label: '女', value: SEX.女 },
                ]}
                value={value}
                onChange={setValue}
            />
        </div>
    );
};