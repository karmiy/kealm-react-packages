---
toc: menu
phone: true
nav:
  title: React Mobile
group:
  title: Feedback
  path: /feedback
  order: 7
---

# Drawer 抽屉

抽屉，屏幕边缘滑出的浮层面板

<code src='./demos' phone />

## 基本用法

最常规的行为是一个从底部弹起的弹出层，通过 `visible`、`onVisibleChange` 控制 Drawer 显示隐藏

<code src='./demos/demo-basic' />

## 弹出方向

默认情况下，Drawer 将从底部弹起，配置 `placement` 可以自定义弹出的方向

<code src='./demos/demo-placement' />

## 弹出位置偏移

Drawer 默认会从边缘位置滑出，然而在某些场景中，我们可能希望它的滑出位置距离边缘有一定的偏移量

这时配置 `offset` 即可达到这种效果

<code src='./demos/demo-offset' />

## 支持 Pop 组件配置

Drawer 继承至 Pop 组件，这意味着 Drawer 支持 [Pop](/react-mobile/basic/pop#api) 组件的配置

如支持 Pop 的 `afterOpen` 等钩子函数

<code src='./demos/demo-pop' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 外层容器类名                                   | `string`                                                     | --     |
| style        | 外层容器样式                                   | `React.CSSProperties`                                        | --     |
| contentClassName | 内容容器类名                                                 | `string`                                 | --         |
| visible          | 是否显示                                                     | `boolean`                                | `false`    |
| onVisibleChange  | 显示状态改变时回调，如点击蒙层关闭                           | `(v: boolean) => void`                   | --         |
| placement        | 抽屉弹出的方向                                               | `enum('top', 'right', 'bottom', 'left')` | `'bottom'` |
| offset           | 偏移量，如 placement 为 top 时，offset 即弹出层的弹出位置距离顶部的距离 | `string / number`                        | --         |

除了默认配置项，Drawer 继承至 `Pop` 组件，即可以传递 [PopProps](/react-mobile/basic/pop#api)，如

- onOpen
- onClose