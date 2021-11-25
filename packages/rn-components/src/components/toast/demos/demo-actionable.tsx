import React, { useCallback } from 'react';
import { Button, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openToast = useCallback(() => {
        const { destroy } = Toast.loading({
            content: '加载中...',
            isActionable: false, // 吐司过程中不可操作页面
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
