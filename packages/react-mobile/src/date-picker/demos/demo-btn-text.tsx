import React, { useState } from 'react';
import { DatePicker } from '@kealm/react-mobile';
import { Button, message } from 'antd';

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>Open DatePicker</Button>
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                value={value}
                onChange={setValue}
                cancelText='关闭'
                onCancel={() => message.success('onCancel')}
                okText='完成'
                onOk={() => message.success('onOk')}
            />
        </div>
    );
};
