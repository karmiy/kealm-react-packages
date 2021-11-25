---
phone: false
group:
  title: Element
  path: /element
  order: 8
---

# useClickAway

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag tags={['react']} />;
```

监听元素外的点击事件

常用于弹框类组件，点击弹框外部区域关闭弹框

## 代码演示

### 绑定到 ref

<code 
  src='./demos/demo-ref.tsx' 
  title='绑定到 ref' 
  description='挂载到 ref，点击元素外的区域将使 count + 1'
/>

### 绑定到 DOM

<code 
  src='./demos/demo-dom.tsx' 
  title='绑定到 DOM' 
  description='不方便拿到 ref 时，可为 target 传递真实的 DOM 节点'
/>

## API

```ts
type ResolvableTarget<T = Element> =
    | (() => T | null)
    | T
    | null
    | React.MutableRefObject<T | null | undefined>;

useClickAway<E extends Event = Event>(
    target: ResolvableTarget | ResolvableTarget[],
    onClickAway: (event: E) => void,
    eventName = 'click',
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| target | 目标节点，点击节点外的区域才会响应回调 | `ResolvableTarget \| ResolvableTarget[]` | -- |
| onClickAway | 点击元素外围触发的回调 | `(event: E) => void` | -- |
| eventName | 事件名 | `string` | 'click' |
