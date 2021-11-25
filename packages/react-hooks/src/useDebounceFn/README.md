---
phone: false
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useDebounceFn

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

创建一个防抖函数

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='接收一个需要附带防抖效果的函数，并配置防抖时长 delay，频繁调用只会在 delay 间隔内执行一次'
/>

## API

```ts
const fn = useDebounceFn<T extends (...args: any[]) => any>(
    fn: T,
    delay = 500
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn | 防抖函数 | `(...args: any[]) => any` | -- |
| delay | 防抖时长 | `number` | 500 |
