import React, { useState } from 'react';
import { Button, ActionSheet, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);

    return (
        <PortalWrapper>
            <Button plain onPress={() => setVisible(true)}>
                Open ActionSheet
            </Button>
            <ActionSheet
                visible={visible}
                onVisibleChange={setVisible}
                title='请做出选择'
                actions={[
                    { label: '满意' },
                    { label: '还行' },
                    { label: '一般' },
                    { label: '不满意' },
                ]}
            />
        </PortalWrapper>
    );
};
