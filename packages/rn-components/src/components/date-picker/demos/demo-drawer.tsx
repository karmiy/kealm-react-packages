import React, { useState } from 'react';
import { DatePicker, Button, Toast, PortalWrapper } from '@kealm/rn-components';

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
                drawerProps={{
                    afterOpen: () => Toast.open({ content: 'afterOpen' }),
                }}
            />
        </PortalWrapper>
    );
};
