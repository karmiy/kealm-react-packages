import React, { useCallback } from 'react';
import { Button, Dialog, Toast, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openDialog = useCallback(() => {
        Dialog.confirm({
            title: '美柚请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
            afterOpen: () => Toast.open({ content: 'afterOpen' }), // 打开完成后调用
        });
    }, []);

    return (
        <PortalWrapper>
            <Button plain onPress={openDialog}>
                Open Dialog
            </Button>
        </PortalWrapper>
    );
};
