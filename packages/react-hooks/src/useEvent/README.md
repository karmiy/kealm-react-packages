---
phone: false
group:
  title: Element
  path: /element
  order: 8
---

# useEvent

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag tags={['react']} />;
```

为元素绑定事件（addEventListener）

## 代码演示

### 绑定到 ref

<code 
  src='./demos/demo-ref.tsx' 
  title='绑定到 ref' 
  description='挂载 ref 为元素绑定点击事件'
/>

### 绑定到 DOM

<code 
  src='./demos/demo-dom.tsx' 
  title='绑定到 DOM' 
  description='不方便拿到 ref 时，可为 target 传递真实的 DOM 节点绑定事件'
/>

## API

```ts
type ResolvableTarget<T = Element> =
    | (() => T | null)
    | T
    | null
    | React.MutableRefObject<T | null | undefined>;

type TargetElement = HTMLElement | Element | Document | Window;

interface Options {
    target?: ResolvableTarget<TargetElement>;
    once?: boolean;
    passive?: boolean;
    capture?: boolean;
}

useEvent(
    eventName: string,
    handler: (event: Event) => any,
    options?: Options,
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| eventName | 事件名 | `string` | -- |
| handler | 事件回调 | `(event: E) => void` | -- |
| options | 可选配置 | `Options` | -- |

### Options

| 参数    | 说明                                                         | 类型                              | 默认值 |
| ------- | ------------------------------------------------------------ | --------------------------------- | ------ |
| target  | 目标元素                                                     | `ResolvableTarget<TargetElement>` | --     |
| once    | 同 addEventListener 配置，是否事件只执行一次                 | `boolean`                         | --     |
| passive | 同 addEventListener 配置，true 时表示 listener 永远不会调用 preventDefault() | `boolean`                         | --     |
| capture | 同 addEventListener 配置，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发 | `boolean`                         | --     |