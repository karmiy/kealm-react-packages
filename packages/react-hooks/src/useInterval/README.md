---
phone: false
group:
  title: SideEffect
  path: /side-effect
  order: 7
---

# useInterval

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

自动启用 setInterval

## 代码演示

### 基本用法

<code 
  src='./demos/demo-base.tsx' 
  title='基本用法' 
  description='每1000ms，执行一次累加'
/>

### 关闭定时器

<code 
  src='./demos/demo-clear.tsx' 
  title='关闭定时器' 
  description='当 delay 参数为 null 时，将关闭定时器。此例中定时器将于计数到 10 停止'
/>

### 立即执行

<code 
  src='./demos/demo-immediate.tsx' 
  title='立即执行' 
  description='第 3 个参数 immediate 代表是否初始立即执行回调，默认 false'
/>

## API

```ts
useInterval(
    fn: () => any,
    delay?: number | null,
    immediate = false,
    deps: DependencyList = [],
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fn | 组件初始化完成时执行的回调 | `() => any` | -- |
| delay | 间隔时长，为 null 时将停止定时器 | `number \| null` | 0 |
| immediate | 是否初始也立即执行回调 | `boolean` | false |
| deps | 依赖项，变化时将会重启定时器 | `DependencyList` | [] |
