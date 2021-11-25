import React, { useCallback } from 'react';
import { Toast } from '@kealm/react-mobile';
import { Button } from 'antd';

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

    return <Button onClick={openToast}>Open Toast</Button>;
};
