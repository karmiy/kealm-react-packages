---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# Badge 徽标

图标右上角的圆形徽标数字

<code src='./demos' phone />

## 基本用法

简单的徽章展示，使用 `visible` 控制显示与隐藏，`count` 展示数量

<code src='./demos/demo-basic' />

## 小红点

配置 `dot` 即可仅展示简约的小红点

<code src='./demos/demo-dot' />

## 自定义偏移量

默认情况下，Badge 将会被定位在 { top: 0; right: 0 } 的位置

当默认位置不符合需求时，可以配置 `offset` 将 Badge 调整到一个合适的位置

<code src='./demos/demo-offset' />

## 自定义徽标色

配置 `color` 自定义徽标色

<code src='./demos/demo-color' />

## 独立使用

不包裹 `children` 即可独立使用

<code src='./demos/demo-independent' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| wrapperClassName | 外层容器类名 | `string` |  |
| className | 类名，将作用于徽标节点 | `string` | -- |
| style | 样式，将作用于徽标节点 | `React.CSSProperties` | -- |
| visible | 是否显示 | `boolean` | `true` |
| count | 展示的内容 | `ReactNode` | -- |
| dot              | 是否只显示小红点，不显示数量             | `boolean`                                              | `false`                |
| dotRect | 小圆点直径 | `number / string` | `8` |
| color            | 自定义徽标色                             | `string`                                               | --                     |
| offset           | 偏移量，在徽标的默认位置不满足时进行调整 | `{ [top / right / bottom / left]?: number \| string }` | `{ top: 0, right: 0 }` |

除了默认配置项，`div` 可以接收的所有 props，都会作用到徽标节点，如

- onClick