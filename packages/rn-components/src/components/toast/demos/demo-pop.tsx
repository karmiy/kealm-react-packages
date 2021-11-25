import React, { useCallback } from 'react';
import { Button, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openToast = useCallback(() => {
        const { destroy } = Toast.loading({
            content: '加载中...',
            // afterOpen 打开后打印
            afterOpen: () => console.log('afterOpen'),
        });

        setTimeout(() => {
            destroy();
        }, 2000);
    }, []);

    return (
        <PortalWrapper>
            <Button plain onPress={openToast}>
                Open Toast
            </Button>
        </PortalWrapper>
    );
};
