import React, { useCallback } from 'react';
import { Dialog } from '@kealm/react-components';
import { Button, message } from 'antd';

export default () => {
    const openDialog = useCallback(() => {
        Dialog.confirm({
            title: '美柚请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
            afterOpen: () => message.success('afterOpen'), // 打开完成后调用
        });
    }, []);

    return <Button onClick={openDialog}>Open Dialog</Button>;
};
