---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# useLiveRef

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

实时存储 state

## 说明

为了总能获取最新的 state，通常会将 state 实时存储在 useRef 中

```tsx | pure
export default () => {
    const [count, setCount] = useState();
    const countRef = useRef(count);
    countRef.current = count; // keep in real time
}
```

即使实现上很容易，这个行为却很常见，我们将这部分逻辑封装在 useLiveRef 中

```tsx | pure
import { useLiveRef } from '@kealm/react-hooks';

export default () => {
    const [count, setCount] = useState();
    const countRef = useLiveRef(count);

    console.log(countRef.current); // always get the latest value

    return null;
}
```

## API

```ts
const ref = useLiveRef<T>(state: T, async = false);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| state | 当前状态，同 useState | `T` | -- |
| async | 是否异步执行，为 true 时 hooks 内部使用 useEffect 异步存储，默认实时存储 | `boolean` | false |

### Return

| 参数 | 说明                                       | 类型                        | 默认值 |
| ---- | ------------------------------------------ | --------------------------- | ------ |
| ref  | useRef 的返回值，始终存储着最新的 state 值 | `React.MutableRefObject<T>` | --     |

