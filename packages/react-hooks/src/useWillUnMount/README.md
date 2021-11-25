---
phone: false
group:
  title: LifeCycle
  path: /life-cycle
  order: 5
---

# useWillUnMount

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

组件卸载时时调用，相当于 Class Component 的 componentWillUnMount

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='在组件卸载 unmount 时进行弹窗' 
/>

## API

```ts
useWillUnMount(
    fn: () => any,
    async = true
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | 组件卸载时执行的回调 | `() => void` | -- |
| async   | 是否异步存储，为 true 时 hooks 内部使用 useEffect 异步更新，反之 useLayoutEffect | `boolean` | `true` |