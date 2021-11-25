import React, { useState } from 'react';
import { DatePicker, Button, PortalWrapper } from '@kealm/rn-components';

const DEFAULT_DATE = new Date('2020/12/11');

export default () => {
    const [value, setValue] = useState<Date>();
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button onPress={() => setVisible(true)}>Open DatePicker</Button>
            <DatePicker
                visible={visible}
                onVisibleChange={setVisible}
                defaultValue={DEFAULT_DATE}
                value={value}
                onChange={setValue}
            />
        </PortalWrapper>
    );
};
