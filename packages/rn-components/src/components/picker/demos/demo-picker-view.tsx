import React, { useState } from 'react';
import { Picker, Button, PortalWrapper } from '@kealm/rn-components';

enum SEX {
    '男' = 1,
    '女' = 2,
}

export default () => {
    const [value, setValue] = useState(SEX.男);
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button onPress={() => setVisible(true)}>Open Picker</Button>
            <Picker
                visible={visible}
                onVisibleChange={setVisible}
                data={[
                    { label: '男', value: SEX.男 },
                    { label: '女', value: SEX.女 },
                ]}
                value={value}
                onChange={setValue}
                sideCount={2}
            />
        </PortalWrapper>
    );
};
