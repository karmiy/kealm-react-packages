---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useSetState

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

使用 useState 管理 object 对象，又期望同 Class 类组件一样在 setState 时做到自动合并，useSetState 或许更为适合

```tsx | pure
-------------------- useState --------------------
const [state, setState] = useState({ id: 1, age: 17 });

setState(prevState => ({
    ...prevState, // ❌ 不方便，需要 ...prevState 手动还原对象结构
    id: 1,
}));

-------------------- useSetState --------------------
const [state, setState] = useSetState({ id: 1, age: 17 });

setState({
    id: 1, // ✔ 更便捷，自动合并 state 对象
});
```

## 代码演示

<code src='./demos/demo.tsx' />

## API

```ts
type Setter<T> = (newState: Partial<T> | ((prevState: T) => Partial<T>)) => void;

const [state, setState]: [T, Setter<T>] = useSetState<T>(state: T | (() => T));
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| state | 被管理的组件状态，同 useState | -- | -- |

### Return

| 参数  | 说明                                                        | 类型                                                         | 默认值 |
| ----- | ----------------------------------------------------------- | ------------------------------------------------------------ | ------ |
| state | 当前状态，同 useState                                       | `T`                                                          | --     |
| set   | 函数，更新当前状态，同 useState，不需要传递完整结构，见示例 | `(newState: Partial<T> \| ((prevState: T) => Partial<T>)) => void` | --     |

