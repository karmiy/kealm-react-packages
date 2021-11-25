import React, { useState } from 'react';
import { DatePicker, Button, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button onPress={() => setVisible(true)}>Open DatePicker</Button>
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                value={value}
                onChange={setValue}
                cancelText='关闭'
                okText='完成'
            />
        </PortalWrapper>
    );
};
