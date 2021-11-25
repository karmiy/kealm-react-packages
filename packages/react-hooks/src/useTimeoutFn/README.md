---
phone: false
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useTimeoutFn

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

管理 setTimeout，负责创建、销毁定时器

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='传递唯一标识 key 创建、销毁定时器。此例中点击按钮，3 秒后弹出 message'
/>

## API

```ts
interface SetTimer {
    (key: string, handler: Function, duration = 0): void;
}

interface ClearTimer {
    (key: string): void;
}

interface HasTimer {
    (key: string): boolean;
}
const { setTimer, clearTimer, hasTimer } = useTimeoutFn();
```

### Result

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| setTimer | 创建定时器 | `(key: string, handler: Function, duration?: number) => void` | -- |
| clearTimer | 根据 key 清除对应定时器 | `(key: string) => void` | -- |
| hasTimer | 判断对应 key 当前是否存在定时器 | `(key: string) => boolean` | -- |
