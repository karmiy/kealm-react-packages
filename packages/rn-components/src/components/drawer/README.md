---
toc: menu
nav:
  title: React Native
group:
  title: Feedback
  path: /feedback
  order: 8
---

# Drawer 抽屉

抽屉，屏幕边缘滑出的浮层面板

<code src='./demos' phone />

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
      <p>Drawer 底层由 Pop 组件实现，不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
      <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```

## 基本用法

最常规的行为是一个从底部弹起的弹出层，通过 `visible`、`onVisibleChange` 控制 Drawer 显示隐藏

<code src='./demos/demo-base.tsx' />

## 弹出方向

默认情况下，Drawer 将从底部弹起，配置 `placement` 可以自定义弹出的方向

<code src='./demos/demo-placement.tsx' />

## 弹出位置偏移

Drawer 默认会从边缘位置滑出，然而在某些场景中，我们可能希望它的滑出位置距离边缘有一定的偏移量

这时配置 `offset` 即可达到这种效果

<code src='./demos/demo-offset.tsx' />

## 支持 Pop 组件配置

Drawer 继承至 Pop 组件，这意味着 Drawer 支持 Pop 组件的配置

如支持 Pop 的 `afterOpen` 等钩子函数

<code src='./demos/demo-pop.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles                | 组件样式，可以覆盖任何默认样式                               | `object`                                      | --         |
| popStyles             | Pop 组件样式                                                 | `object`                                      | --         |
| contentContainerProps | Drawer 内容容器配置（Animated.View）                         | [ViewProps](https://reactnative.cn/docs/view) | --         |
| placement             | 抽屉弹出的方向                                               | `enum('top', 'right', 'bottom', 'left')`      | `'bottom'` |
| offset                | 偏移量，如 placement 为 top 时，offset 即弹出层的弹出位置距离顶部的距离 | `number`                                      | --         |

除了默认配置项，Drawer 继承至 `Pop` 组件，还可以传递 [PopProps](/rn-components/basic/pop#api)，如

- onOpen
- onClose

## Theme

| **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|
| c_drawer_wrapper_z_index | `z_index_M`      | `10`   |