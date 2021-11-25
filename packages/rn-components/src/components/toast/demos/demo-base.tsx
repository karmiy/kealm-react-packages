import React, { useState } from 'react';
import { Button, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open Toast
            </Button>
            <Toast visible={visible} onVisibleChange={setVisible}>
                保存成功
            </Toast>
        </PortalWrapper>
    );
};
