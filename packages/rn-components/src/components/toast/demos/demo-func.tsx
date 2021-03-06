import React, { useCallback } from 'react';
import { Button, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openToast = useCallback(() => {
        const { destroy, update } = Toast.loading({
            content: '加载中...',
        });

        setTimeout(() => {
            // 2s 后更新为 'success' 状态
            update({
                content: '加载完成',
                type: 'success',
            });

            // 3s 后销毁组件
            setTimeout(() => {
                destroy();
            }, 1000);
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
