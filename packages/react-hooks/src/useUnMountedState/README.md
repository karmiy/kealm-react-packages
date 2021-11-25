---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useUnMountedState

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

获取当前组件是否已卸载的状态

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='通常用在异步行为完毕前，防止组件先行卸载导致 `setState` 报错，对组件的状态进行判断' 
/>

## API

```ts
type GetIsUnMount = () => boolean;

const { getIsUnMount } = useUnMountedState();
```

### Return

| 参数 | 说明                               | 类型                                             | 默认值 |
| ---- | ---------------------------------- | ------------------------------------------------ | ------ |
| getIsUnMount  | 函数，返回当前组件卸载状态 | `() => boolean`                                        | --     |