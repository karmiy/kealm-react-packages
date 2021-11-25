---
phone: false
group:
  title: LifeCycle
  path: /life-cycle
  order: 5
---

# useUpdate

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

强制组件进行一次 render 渲染，相当于 Class Component 中 forceUpdate

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='点击按钮强制组件进行一次渲染' 
/>

## API

```ts
const forceUpdate = useUpdate();
```

### Return

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| forceUpdate | 函数，执行后强制 render 当前组件 | `() => void` | -- |