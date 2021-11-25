---
phone: false
title: 全局配置
toc: menu
order: 3
---

# 全局配置

Library 提供了 `mergeGlobalConfig` 方法，用于全局配置某些特性

```ts
import { mergeGlobalConfig } from '@kealm/react-components/lib/config';

mergeGlobalConfig({
    // 需要合并的内容
    ...
});
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='Why not Provider?' type='warning'>
      Library 内部实现上不仅只有纯粹的组件，还涵盖了某些特性（如<b>函数式调用</b>）是 Provider 无法传达到的
  </Blockquote>
);
```

## 禁止页面滚动

诸如弹框类组件：Pop、Dialog、Drawer、ActionSheet 等，在打开时往往是不希望页面是可滚动的

Library 内部已经实现了这个效果，但值得注意的是：<b>内置的禁止滚动， 是作用在 body 节点上的</b>

某些场景下或许滚动条并不在页面外层窗口，而是<b>在内部某个设置了 overflow: auto 的 div 上，这时内置的禁用方法便不再适用</b>

这时就需要自定义 `lockScroll` 方法

```ts
// 解锁/恢复滚动  
type UnLockScroll = () => void;

// 禁止滚动
type LockScroll = () => UnLockScroll;
```

如下示例，打开 `Dialog` 是将 document.body 滚动条移除：

<code 
  src='./demos/demo-config-lock.tsx' 
  title='基本用法' 
  description='弹框类组件在打开时将调用全局 **lockScroll** 方法，方法返回一个 **unlock 解绑函数**于弹框关闭时调用恢复页面滚动' 
/>