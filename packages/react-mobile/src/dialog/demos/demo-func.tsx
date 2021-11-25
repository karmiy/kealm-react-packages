import React, { useCallback } from 'react';
import { Dialog } from '@kealm/react-mobile';
import { Button } from 'antd';

export default () => {
    const openDialog = useCallback(() => {
        const { destroy, update } = Dialog.confirm({
            title: '美柚请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
        });

        setTimeout(() => {
            // 2s 后更新标题
            update({
                title: '这是一个新标题',
            });

            // 3s 后销毁组件
            setTimeout(() => {
                destroy();
            }, 1000);
        }, 2000);
    }, []);

    return <Button onClick={openDialog}>Open Dialog</Button>;
};
