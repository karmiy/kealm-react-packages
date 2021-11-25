import React, { useState } from 'react';
import { DatePicker } from '@kealm/react-mobile';
import { Space, Button, Tag } from 'antd';
import { format } from 'date-fns';

const DEFAULT_DATE = new Date('2020/12/11');

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <Space>
            <Button onClick={() => setVisible(true)}>Open DatePicker</Button>
            <Tag color='blue'>{format(value ?? DEFAULT_DATE, 'yyyy-MM-dd')}</Tag>
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                defaultValue={DEFAULT_DATE}
                value={value}
                onChange={setValue}
            />
        </Space>
    );
};
