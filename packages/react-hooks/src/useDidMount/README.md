---
phone: false
nav:
  title: React Hooks
  order: 1
group:
  title: LifeCycle
  path: /life-cycle
  order: 5
---

# useDidMount

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

组件初始化完成时调用，相当于 Class Component 的 componentDidMount

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='在组件首次 mount 时进行弹框' 
/>

## API

```ts
useDidMount(
    fn: () => any,
    async = true
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | 组件初始化完成时执行的函数 | `() => void` | -- |
| async   | 是否异步存储，为 true 时 hooks 内部使用 useEffect 异步更新，反之 useLayoutEffect | `boolean` | `true` |