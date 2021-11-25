---
phone: false
group:
  title: State
  path: /state
  order: 6
---

# usePrevious

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

保存上一次渲染时的状态

## 代码演示

<code src='./demos/demo.tsx' />

## API

```ts
const previousState: T | undefined = usePrevious<T>(state: T);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| state | 需要监听上一次 render 值的状态 | -- | -- |

### Return

| 参数          | 说明                        | 类型 | 默认值 |
| ------------- | --------------------------- | ---- | ------ |
| previousState | 上一次 render 时 state 的值 | --   | --     |