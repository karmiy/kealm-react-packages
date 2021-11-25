import React, { useCallback } from 'react';
import { Button, Dialog, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openDialog = useCallback(async () => {
        const { promisify } = Dialog.confirm({
            title: '系统请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
        });

        const result = await promisify();

        result
            ? Toast.open({ content: 'Ok 🙂', duration: 1000 })
            : Toast.open({ content: 'Cancel 🤕', duration: 1000 });
    }, []);

    return (
        <PortalWrapper>
            <Button plain onPress={openDialog}>
                Open Dialog
            </Button>
        </PortalWrapper>
    );
};
