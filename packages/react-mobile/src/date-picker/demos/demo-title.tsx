import React, { useState } from 'react';
import { DatePicker } from '@kealm/react-mobile';
import { Button } from 'antd';

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
                title='请选择生日'
            />
        </div>
    );
};
