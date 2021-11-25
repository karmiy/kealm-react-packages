---
toc: menu
nav:
  title: React Mobile
group:
  title: Basic
  path: /basic
  order: 5
---

# Pop 弹框

弹层，抽象动画组件（仅包含动画 + 蒙层），是部分弹框类组件的基层

<code src='./demos' phone />

## 基本用法

`visible` 与 `onVisibleChange` 控制 Pop 的显示隐藏

<code src='./demos/demo-base.tsx' />

## 内容居中

大多数情况下，我们可能更希望弹框中内容可以居中，使用 `isCenter` 即可实现

<code src='./demos/demo-center.tsx' />

## 自定义动画时长

默认情况下，Pop 的动画时长是 150ms，可以使用 `duration` 配置自定义的动画时长

<code src='./demos/demo-duration.tsx' />

## 点击蒙层不关闭

默认情况下，点击蒙层将会关闭弹框，如果不希望点击蒙层时关闭，可以配置 `maskClosable` 为 false

<code src='./demos/demo-mask-closable.tsx' />

## 打开/关闭的钩子函数

Pop 提供了 4 个钩子函数观察弹窗变化的过程，方便在每个时刻进行需要的操作：

- `onOpen`: 弹框开始显示

- `afterOpen`: 弹框完成显示

- `onClose`: 弹框开始关闭

- `afterClose`: 弹框完成关闭

<code src='./demos/demo-hooks.tsx' />

## 初始入场动画

在某些场景中，即使初始 visible = true，我们可能也希望它有一个淡入的初始动画，而不是手动将 visible 从 false 置为 true 迫使其实现初始入场动画

只需要配置 `appear` 属性，即实现这种效果

<code src='./demos/demo-appear.tsx' />

## 关闭即销毁 children

默认情况下，children 的内容在第一次渲染之后是会被保留的

即表示：

- 当 `visible` 的状态变更趋势为 `false => true => false => true` 时

- content 在视图中的状态应为 `null => div => display: none => div`

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      这意味着：
      <b>每次关闭弹框时，其内容部分并不会被卸载，同样，打开时也不会重新初始化</b>
      。这对于实现优化而言或许是更好的做法，每次重新卸载与创建子节点的开销看起来是多余的
  </Blockquote>
);
```

但在某些场景中，我们可能就希望每次关闭时，都能卸载子节点，并在每次打开时重新初始化

这时配置 `unmountOnExit` 即可达到这个效果：

- 当 `visible` 的状态变更趋势为 `false => true => false => true` 时

- content 在视图中的状态应为 `null => div => null => div`

<code src='./demos/demo-unmount-exit.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className        | 外层容器类名                                                 | `string`                    | -- |
| style | 外层容器样式样式 | `React.CSSProperties` | -- |
| visible | 是否显示 | `boolean` | `false` |
| onVisibleChange | 显示状态改变时回调，如点击蒙层关闭 | `(v: boolean) => void` | -- |
| showMask | 是否显示蒙层 | `boolean` | `true` |
| maskClosable | 点击蒙层是否关闭 | `boolean` | `true` |
| onMaskClick | 点击蒙层触发回调 | `(e: React.MouseEvent) => void` | -- |
| renderMask | 自定义蒙层节点 | `ReactNode` | -- |
| maskClassName | 蒙层类名 | `string` | `true` |
| maskStyle | 蒙层样式 | `React.CSSProperties` | -- |
| zIndex | 弹窗层级 | `number` | `1000` |
| isCenter | 是否对内容进行居中布局（justifyContent、alignItems: center） | `boolean` | `false` |
| transitionName | 过渡动画类名，会在入场/离场时为容器叠加 xxx-appear/enter/exit、xxx-appear/enter/exit-active、xxx-appear/enter/exit-done 的类名 | `string` | `'my-pop-fade'` |
| duration | 动画持续时间 | `number` | `150` |
| onOpen | 组件打开时触发 | `() => void` | -- |
| onClose | 组件关闭时触发 | `() => void` | -- |
| afterOpen | 组件打开后触发 | `() => void` | -- |
| afterClose | 组件关闭后触发 | `() => void` | -- |
| appear | 初始入场是否做动画，即初始 visible 为 true，是否会有动画效果 | `boolean` | `true` |
| unmountOnExit | 关闭时是否卸载 children 节点，若为 true，children 节点将在每次 Pop 打开时重新初始化 | `boolean` | `false` |
| getContainer | 指定挂载的 HTML 节点 | `ResolvableTarget<Element>` | `document.body` |
| lockScrollEnabled | 启动用，将在显示时调用全局 lockScroll 方法禁止页面滚动 | `boolean` | `true` |

#### Type

```ts
type ResolvableTarget<T = Element> =
    | (() => T | null)
    | T
    | null
    | React.MutableRefObject<T | null | undefined>;
```