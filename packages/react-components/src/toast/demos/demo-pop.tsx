import React, { useCallback } from 'react';
import { Toast } from '@kealm/react-components';
import { Button, message } from 'antd';

export default () => {
    const openToast = useCallback(() => {
        const { destroy } = Toast.loading({
            content: '加载中...',
            // afterOpen 打开后打印
            afterOpen: () => message.success('afterOpen'),
        });

        setTimeout(() => {
            destroy();
        }, 2000);
    }, []);

    return <Button onClick={openToast}>Open Toast</Button>;
};
