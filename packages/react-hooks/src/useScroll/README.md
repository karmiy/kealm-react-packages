---
phone: false
group:
  title: Element
  path: /element
  order: 8
---

# useScroll

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag tags={['react']} />;
```

监听元素滚动事件

## 代码演示

<code 
  src='./demos/demo.tsx' 
  title='基本用法' 
  description='target 接收挂载的节点，返回 left、top，可配置 handler 在滚动时实时回调监听'
/>

## API

```ts
export type ResolvableTarget<T = Element> =
    | (() => T | null)
    | T
    | null
    | React.MutableRefObject<T | null | undefined>;

interface Options {
    target?: ResolvableTarget<Window | Document | HTMLElement>;
    handler?: (e: Event) => void;
    scrollEventThrottle?: number;
}
    
interface Position {
    left: number;
    top: number;
}

const position: Position = useScroll(options?: Options);
```

### Options

| 参数                | 说明           | 类型                                                  | 默认值 |
| ------------------- | -------------- | ----------------------------------------------------- | ------ |
| target              | 监听滚动的节点 | `ResolvableTarget<Window \| Document \| HTMLElement>` | --     |
| handler             | 滚动回调       | `(event: E) => void`                                  | --     |
| scrollEventThrottle | 节流时长       | `number`                                              | 0      |

### Result

| 参数     | 说明           | 类型                            | 默认值 |
| -------- | -------------- | ------------------------------- | ------ |
| position | 当前滚动偏移量 | `{ left: number; top: number }` | --     |