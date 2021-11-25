---
phone: false
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useThrottleFn

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

创建一个节流函数

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='接收一个需要附带节流效果的函数，并配置节流时长 delay，在 delay 间隔内函数只会回调一次'
/>

## API

```ts
const fn = useThrottleFn<T extends (...args: any[]) => any>(
    fn: T,
    delay = 500
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn | 节流函数 | `(...args: any[]) => any` | -- |
| delay | 节流时长 | `number` | 500 |
