---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useGetSet

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

同 useState 的状态管理 hook，于其不同的是，第一个参数由 state 变为了 get 函数

值得注意的是：**get 总能拿到最新的值**，而不会出现 useState 中在 set 后不能立即取得新 state 的问题，在很多场景下相比 useState 更有用

## 代码演示

<code 
  src='./demos/demo.tsx'
  title='基本用法'
  description='useGetSet 总能在更新时同步获取到最新值'
 />

## API

```ts
type Getter<T> = () => T;
type Setter<T> = (newState: T | ((prevState: T) => T)) => void;

const [get, set]: [Getter<T>, Setter<T>] = useGetSet<T>(state: T | (() => T));
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| state | 被管理的组件状态，同 useState | -- | -- |

### Return

| 参数 | 说明                               | 类型                                             | 默认值 |
| ---- | ---------------------------------- | ------------------------------------------------ | ------ |
| get  | 函数，返回当前状态，总能拿到最新值 | `() => T`                                        | --     |
| set  | 函数，更新当前状态，同 useState    | `(newState: T \| ((prevState: T) => T)) => void` | --     |

