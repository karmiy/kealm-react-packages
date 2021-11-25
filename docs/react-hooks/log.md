---
phone: false
toc: false
order: 2
---

# 更新日志

### 1.0.5

> 2021-11-12

- Bug Fix
    - 修复 `useRequest` 循环依赖 warning

### 1.0.4

> 2021-11-08

- Feature
    - `useRequest` 缓存策略机制调整，不缓存 formatter 后的数据，仅缓存 fetchService 的源数据

### 1.0.1

> 2021-11-07

- Bug Fix
    - 修复 `useRequest` 参数 fetchService 引用不更新

### 1.0.0

> 2021-11-03

- Feature
    - 新增 `useRequest`

### 0.1.6

> 2021-10-18

- Feature
    - 新增 `useGetSetRef`

### 0.1.4

> 2021-10-13

- Feature
    - 新增 `useUnMountedState`

### 0.1.2

> 2021-10-12

- Feature
    - 新增 `usePersistFn`

### 0.1.1

> 2021-08-20

- Bug Fix
    - `useSetState`，`useGetSet`，`useGetSetState` 兼容无初始 state

### 0.1.0

> 2021-07-01

- Feature
    - 新增 `useSetState`，`useGetSetState`

### 0.0.11

> 2021-06-03

- Bug Fix
    - 全局状态管理 `Store` typescript 类型优化

### 0.0.9

> 2021-05-28

- Feature
    - 全局状态管理 `Store`，context 新增 dispatch

### 0.0.8

> 2021-05-27

- Feature
    - 全局状态管理 `Store` 新增组件外可操作机制（getState、dispatch）

### 0.0.5

> 2021-05-20

- Feature
    - 新增全局状态管理 `Store`

### 0.0.2

> 2021-05-03

- Bug Fix
    - 修复 tslib 缺失

### 0.0.1

> 2021-05-03

- Feature
    - 发布 `@kealm/react-hooks`