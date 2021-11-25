---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useGetSetRef

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

返回 `get`，`set` 方法的 useRef

## 说明

通常在使用 useRef 存储非状态数据时，需要操作 `ref.current` 进行数据获取与赋值更新，然而这种编写方式往往显得生硬

这时不妨试试 useGetSetRef 来管理 useRef 的数据存储

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      useGetSetRef 仅用于数据存储，DOM、组件实例等 readonly RefObject 行为请继续使用 useRef
  </Blockquote>
);
```

## 代码演示

<code 
  src='./demos/demo.tsx'
  title='基本用法'
  description='与原生 useRef 存储数据行为一致，useGetSetRef 返回 get，set 方法让我们可以更抽象的操作数据'
 />

## API

```ts
interface Getter<T> {
    (): T;
}

interface Setter<T> {
    (value: T | ((prevValue: T) => T)): T;
}

const [get, set]: [Getter<T>, Setter<T>] = useGetSetRef<T>(initialValue?: T);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| initialValue | 初始数据，同 useRef | -- | -- |

### Return

| 参数 | 说明                                                   | 类型                                             | 默认值 |
| ---- | ------------------------------------------------------ | ------------------------------------------------ | ------ |
| get  | 函数，返回当前 ref.current                             | `() => T`                                        | --     |
| set  | 函数，更新 ref.current，参数即可以是新值，也可以是函数 | `(newValue: T \| ((prevValue: T) => T)) => void` | --     |

