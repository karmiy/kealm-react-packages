---
phone: false
group:
  title: Miscellaneous
  path: /miscellaneous
  order: 9
---

# usePersistFn

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

函数持久化，返回引用地址始终不变的函数

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='usePersistFn 会返回一个引用地址始终不变的函数，在 count 累加时，接收 showCountPersistFn 的组件不会触发 render' 
/>

## API

```ts
const fn = usePersistFn<T extends (...args: any[]) => any>(fn: T): T;
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn   | 需要持久化的函数 | `(...args: any[]) => any` | -- |

### Return

| 参数 | 说明              | 类型 | 默认值 |
| ---- | ----------------- | ---- | ------ |
| fn   | 引用地址不变的 fn | `T`  | --     |
