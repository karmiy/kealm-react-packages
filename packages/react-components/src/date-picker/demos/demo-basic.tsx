import React, { useState } from 'react';
import { DatePicker } from '@kealm/react-components';
import { Space, Button, Tag } from 'antd';
import { format } from 'date-fns';

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <Space>
            <Button onClick={() => setVisible(true)}>Open DatePicker</Button>
            {value && <Tag color='blue'>{format(value, 'yyyy-MM-dd')}</Tag>}
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                value={value}
                onChange={setValue}
            />
        </Space>
    );
};
