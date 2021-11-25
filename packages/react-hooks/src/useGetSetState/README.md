---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useGetSetState

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

同 [useSetState](/react-hooks/state/use-set-state) 管理对象

又返回同 [useGetSet](/react-hooks/state/use-get-set) 的 get（**总能拿到最新的值**） set 结构

```tsx | pure
-------------------- useState --------------------
const [get, set] = useGetSet({ id: 1, age: 17 });

const onClick = () => {
    set(prevState => ({
        ...prevState, // ❌ 不方便，需要 ...prevState 手动还原对象结构
        id: 1,
    }));
};

-------------------- useSetState --------------------
const [state, set] = useSetState({ id: 1, age: 17 });

const onClick = () => {
    set({
        id: 2,
    });
    console.log(state); // ❌ 还是打印 1，无法实时拿到最新值 2
};

-------------------- useGetSetState --------------------
const [get, set] = useGetSetState({ id: 1, age: 17 });

const onClick = () => {
    set({
        id: 2, // ✔ 只需传递更新项，无需传递完整对象
    });
    console.log(get()); // ✔ 打印 2，实时拿到最新值
};
```

## 代码演示

<code src='./demos/demo.tsx' title='基本用法' description='useGetSetState 总能在更新时同步获取到最新值' />

## API

```ts
type Getter<T> = () => T;
type Setter<T> = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

const [get, set]: [Getter<T>, Setter<T>] = useSetState<T>(state: T | (() => T));
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| state | 被管理的组件状态，同 useState | -- | -- |

### Return

| 参数 | 说明                                                        | 类型                                                         | 默认值 |
| ---- | ----------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| get  | 函数，返回当前状态，总能拿到最新值                          | `() => T`                                                    | --     |
| set  | 函数，更新当前状态，同 useState，不需要传递完整结构，见示例 | `(newState: Partial<T> \| ((prevState: T) => Partial<T>)) => void` | --     |

