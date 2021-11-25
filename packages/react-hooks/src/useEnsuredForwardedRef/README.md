---
phone: false
group:
  title: Miscellaneous
  path: /miscellaneous
  order: 9
---

# useEnsuredForwardedRef

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

更安全的使用 forwardRef

## 应用场景

当我们需要获取组件内的 HTMLElement 时，通常会使用 forwardRef 传递 ref 挂载在组件内的节点中

但当组件内同样也需要获取该节点时，**ref 可能会得到 undefined**，因为不能保证父级一定挂载了 ref

```tsx | pure
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    useDidMount(() => {
        // log: undefined
        // 因为父级未传递 ref
        console.log((ref as React.MutableRefObject<HTMLInputElement>)?.current);
    });

    return <input ref={ref} type='text' />;
});

export default () => {
    // ref is not mounted
    return <Input />;
}
```

## 代码演示

<code 
  src='./demos/demo.tsx'
  title='基本用法'
  description='使用 useEnsuredForwardedRef 可以很好的解决上述问题，保证组件内外都可以获得正确的 ref'
/>

## API

```ts
const ref: MutableRefObject<T> = useEnsuredForwardedRef<T>(forwardedRef: MutableRefObject<T>);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| forwardedRef | forwardRef 传递下来的 ref 变量 | `MutableRefObject<T>` | -- |

### Return

| 参数 | 说明                               | 类型                  | 默认值 |
| ---- | ---------------------------------- | --------------------- | ------ |
| ref  | 包装后的 ref，挂载于原本需要的节点 | `MutableRefObject<T>` | --     |