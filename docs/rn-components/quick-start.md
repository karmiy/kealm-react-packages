---
phone: false
order: 1
---

# 快速上手

## 安装

> Version 0.0.9 起依赖 @kealm/react-hooks

```shell
npm install @kealm/react-hooks --save
npm install @kealm/rn-components --save
```

## 使用组件

```tsx | pure
import React, { useCallback } from 'react';
import { Button, Dialog, PortalWrapper } from '@kealm/rn-components';

export default () => {
    const openDialog = useCallback(() => {
        Dialog.confirm({
            title: '系统请求使用定位信息权限',
            content: '为了更好的提供本地天气服务，她她圈和发现内容',
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

```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
    <p>如果使用弹窗类组件（Pop、Dialog、Toast、Drawer、ActionSheet 等），不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
    <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```
