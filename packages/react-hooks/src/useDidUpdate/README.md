---
phone: false
group:
  title: LifeCycle
  path: /life-cycle
  order: 5
---

# useDidUpdate

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

deps 依赖更新时调用，类似于 watch 监听

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='点击按钮更新计数，每次 count 改变时将触发回调的执行' 
/>

## API

```ts
useDidUpdate(
    fn: () => any,
    deps?: DependencyList,
    async = true
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | 组件初始化完成时执行的函数 | `() => void` | -- |
| deps | 依赖项，更新时将会驱动 fn 的执行 | `DependencyList` | -- |
| async   | 是否异步存储，为 true 时 hooks 内部使用 useEffect 异步更新，反之 useLayoutEffect | `boolean` | `true` |