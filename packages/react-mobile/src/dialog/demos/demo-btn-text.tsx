import React, { useCallback } from 'react';
import { Dialog } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const openDialog = useCallback(() => {
        Dialog.confirm({
            title: '美柚请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
            okText: '我知道了',
            cancelText: null, // 配置为 null 不显示
        });
    }, []);

    return <Button onClick={openDialog}>Open Dialog</Button>;
};
