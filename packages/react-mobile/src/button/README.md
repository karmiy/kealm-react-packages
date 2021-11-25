---
toc: menu
nav:
  title: React Mobile
  order: 2
group:
  title: General
  path: /general
  order: 4
---

# Button 按钮

常用的操作按钮

<code src='./demos' phone />

## 按钮类型

Button 具有 3 种类型，具备不同的颜色主题效果：

- `primary`: 蓝（#4794ff）

- `regular`: 红（#ff4d88）

- `info`: 灰（#666）

默认为 `primary`

<code src='./demos/demo-type.tsx' />

## 按下时的不透明度

按钮默认无按下态效果，可以通过 `activeOpacity` 自定义按下时的透明效果

<code src='./demos/demo-opacity.tsx' />

## 按钮 Plain 简约风格

配置 `plain` 可以让 Button 切换为简约风

<code src='./demos/demo-plain.tsx' />

## 无边框 Plain 风格

将 `plainWithBorder` 设为 false 可以让 plain 按钮去除边框，通常应用在页面背景非白色调

<code src='./demos/demo-plain-border.tsx' />

## 自定义按钮色调

当默认的 type 色调不满足需求时，可以配置 `color` 自定义按钮的颜色

<code src='./demos/demo-color.tsx' />

## 禁用

`disabled` 配置即可让按钮切换为禁用状态

<code src='./demos/demo-disabled.tsx' />

## 按钮大小

默认情况下，按钮高度为 28，将 `size` 置为 large 即可变更为高度 48 的大型按钮

<code src='./demos/demo-size.tsx' />

## 自定义按钮大小

当 size 内置的按钮宽高不满足需求时，可以通过 `width`、`height` 自定义按钮宽高

<code src='./demos/demo-rect.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className | 类名 | `string` | -- |
| style | 样式 | `React.CSSProperties` | -- |
| width | 按钮宽度 | `string / number` | -- |
| height | 按钮高度 | `string / number` | -- |
| type | 按钮类型 | `enum('primary', 'regular', 'info')` | `'primary'` |
| size | 按钮大小，默认 28 高，大按钮 48 | `enum('large')` | -- |
| radius | 按钮圆角 | `number` | -- |
| plain | 是否是 plain 风格的按钮 | `boolean` | `false` |
| plainWithBorder | plain 风格时是否带边框 | `boolean` | `true` |
| color | 自定义颜色，非 plain 为背景填充色，plain 风格时为边框、字色 | `string` | -- |
| activeOpacity | 被触摸操作激活时以多少不透明度显示 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |

除了默认配置项，`div` 可以接收的所有 props，都会作用到组件根节点，如

- onMouseDown
- onMouseUp