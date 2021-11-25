import React from 'react';
import { Dialog } from '@kealm/react-mobile';
import { mergeGlobalConfig } from '@kealm/react-mobile/lib/config';
import { Button } from 'antd';

/* 页面滚动条 body 上，打开时希望禁止页面滚动 */
mergeGlobalConfig({
    // 定制全局禁止滚动方法
    lockScroll() {
        document.body.style.overflow = 'hidden';

        // 返回一个 unlock 函数
        return () => (document.body.style.overflow = '');
    },
});

export default () => (
    <Button
        onClick={() => {
            Dialog.confirm({
                title: '这是一个标题',
                content: '禁止页面滚动',
            });
        }}
    >
        弹框
    </Button>
);
