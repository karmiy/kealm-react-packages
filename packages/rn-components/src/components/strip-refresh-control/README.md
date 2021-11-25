---
toc: menu
nav:
  title: React Native
group:
  title: Gesture
  path: /gesture
  order: 9
---

# StripRefreshControl 下拉刷新

下拉刷新（引用客户端 IMYStripRefresher、AMYStripRefresher）

## 基本用法

通常作为 RN 列表类组件（FlatList、SectionList、VirtualizedList）的 `refreshControl` 使用

![](./demos/images/strip-refresh-control-basic.png)

<code src='./demos/demo-base.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| enabled    | 是否可用       | `boolean`    | `true` |
| refreshing | 是否显示指示器 | `boolean`    | --     |
| onRefresh  | 刷新回调       | `() => void` | --     |
