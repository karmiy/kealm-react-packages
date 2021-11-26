---
phone: false
title: Store
toc: menu
order: 3
---

# 全局状态 Store

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

简洁的全局状态管理，`createStore` 构造仓库模型，得到一个随处可用，共享状态的 hook

## 结构说明

```tsx | pure
import { createStore } from '@kealm/react-hooks';

/**
 * @description 创建全局状态 hook
 * @param moduleName 唯一仓库名
 * @param initialState: 初始状态
 * @param actions 状态操作行为列表
 * @returns hook
 */
const [useXXXStore] = createStore(moduleName, initialState, actions);
```

createStore 的 actions 接收 2个参数：

- `context`：对象，意指当前上下文，携带着一些数据信息
- `payload`：自定义参数，即这个 action 会接收的参数值

context 携带着：

- `state`：当前状态
- `commit`：函数，接收下一代 nextState 更新全局状态
- `dispatch`：函数，用于在当前 action 中执行其他 action

```tsx | pure
interface RawDispatch {
    (actionName: string, ...params: any[]): any;
}

export type ResolvableState<S> = S | (() => S) | ((prevState: S) => S);

interface ActionContext<S> {
    state: S; // 当前状态
    commit: (nextState: ResolvableState<S>) => void; // 提交需要更新的 state
    dispatch: RawDispatch; // 转发执行其他 action
}
```

## 代码演示

### 基本用法

createStore 创建共享的 hook

hook 的返回值解构后有 2 份数据：

- `state`：当前状态
- `actions`：createStore 创建时定义的 action 项

<code 
  src='./demos/demo-store-base.tsx' 
  title='基本用法' 
  description='构造 useCountStore，任何位置引入 useCountStore 都可以共享状态' 
/>

### 非组件环境使用

store 的状态共享依赖于在组件内运用创造的 Store Hook

然而：

- 组件外不能运用 React State，更无法使用 Hook 操作 Store

这在某些场景下并不适用，有时我们或许需要在**非组件的环境**中进行操作，如：

- 在与 React 组件解耦的 Router 鉴权中将服务端返回的 token 存储至 Store 中

为了解决这个问题，createStore 的返回值中携带了可以在任何位置（组件内/外）调用的方法，以便在组件外对 Store 状态行为可控：

- `getState`：函数，返回当前 state
- `dispatch`：函数，接收 action 名与传递参数

<code 
  src='./demos/demo-store-global.tsx' 
  title='非组件环境使用' 
  description='getState, dispatch 不论在组件内，还是在组件外的环境中都可以被正常调用' 
/>