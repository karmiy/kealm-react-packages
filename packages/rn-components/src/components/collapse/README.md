---
toc: menu
nav:
  title: React Native
group:
  title: Animation
  path: /animation
  order: 6
---

# Collapse 折叠

折叠动画组件，控制内容的展开收起

<code src='./demos' phone />

## 基本用法

将需要展开收起的内容作为组件的 `children`

通过 `visible` 控制其行为

<code src='./demos/demo-base.tsx' />

## 自定义动画时长

默认动画时长

默认情况下，Collapse 的动画时长是 300ms，可以使用 `duration` 配置自定义的动画时长

<code src='./demos/demo-duration.tsx' />

## 指定折叠时的高度

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
      collapsedHeight 为实验性配置（2021-05-09）
  </Blockquote>
);
```

默认情况下，Collapse 会在收起后完全折叠，即保持 height: 0

某些场景可能希望收起时保持在一个指定的高度值（如收起时只收到 100 高的位置）

配置 `collapsedHeight` 即可使 Collapse 在折叠后停留在指定高度的位置

<code src='./demos/demo-collapsed-height.tsx' />

## 自定义 children 渲染模式

Collapse 有 3 种模式管理 children 节点：

- `keepAlive`（默认）: 初始隐藏时，不渲染节点，第一次展开时进行初始加载渲染，之后无论收起展开都不会再卸载 children 节点，保持 children 活性

- `always`: 始终渲染 children（即使初始状态是收起隐藏），并不再卸载

- `unmountOnCollapsed`: 每当折叠收起后，都卸载 children 节点，每次展开时重新加载渲染

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| visible            | 是否显示                          | `boolean`                                                 | `false`                    |
| align              | 动画过程中内容的对齐方式          | `enum('top', 'center', 'bottom')`                         | `'top'`                    |
| collapsedHeight    | 折叠收起后的高度                  | `number`                                                  | `0`                        |
| duration           | 动画时长                          | `number`                                                  | `300`                      |
| easing             | 缓动函数                          | [EasingFunction](https://www.react-native.cn/docs/easing) | `Easing.out(Easing.cubic)` |
| onOpen             | 回调，准备展开时触发              | `() => void`                                              | --                         |
| afterOpen          | 回调，展开完成后触发              | `() => void`                                              | --                         |
| onClose            | 回调，准备收起时触发              | `() => void`                                              | --                         |
| afterClose         | 回调，收起完成后触发              | `() => void`                                              | --                         |
| renderChildrenMode | children 节点渲染模式，见示例说明 | `enum('always', 'keepAlive', 'unmountOnCollapsed')`       | `'keepAlive'`              |
| wrapperProps       | Collapse 最外层节点配置           | [ViewProps](https://reactnative.cn/docs/view)             | --                         |
| containerProps     | Collapse 内容容器节点配置         | [ViewProps](https://reactnative.cn/docs/view)             | --                         |
