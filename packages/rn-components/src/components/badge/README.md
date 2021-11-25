---
toc: menu
nav:
  title: React Native
group:
  title: Data
  path: /data
  order: 7
---

# Badge 徽标

图标右上角的圆形徽标数字

<code src='./demos' phone />

## 基本用法

简单的徽章展示，使用 `visible` 控制显示与隐藏，`count` 展示数量

<code src='./demos/demo-base.tsx' />

## 小红点

配置 `dot` 即可仅展示简约的小红点

<code src='./demos/demo-dot.tsx' />

## 自定义偏移量

默认情况下，Badge 将会被定位在 { top: -3; right: -3 } 的位置

这在大多数情况下可能与预期位置存在偏差

配置 `offset` 即可自定义调整 Badge 到一个合适的位置

<code src='./demos/demo-offset.tsx' />

## 徽标色

配置 `color` 即可自定义自定义 Badge 的颜色

<code src='./demos/demo-color.tsx' />

## 独立使用

不包裹 `children` 即可独立使用

<code src='./demos/demo-independent.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles  | 组件样式，可以覆盖任何默认样式           | `object`                                               | --                       |
| visible | 是否显示                                 | `boolean`                                              | `true`                   |
| count   | 数量                                     | `number / string`                                      | `0`                      |
| dot     | 是否只显示小红点，不显示数量             | `boolean`                                              | `false`                  |
| dotRect | 小圆点直径 | `number` | `8` |
| color   | 自定义徽标色                             | `string`                                               | --                       |
| offset  | 偏移量，在徽标的默认位置不满足时进行调整 | `{ [top / right / bottom / left]?: number \| string }` | `{ top: 0; right: 0 }` |

除了默认配置项，还可以传递 [ViewProps](https://reactnative.cn/docs/view)，将作用在组件根元素上，如

- style 样式

## Theme

| **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|
| c_badge_color              | `color_mark`     | `‘#ff4d4d’` |
| c_badge_rect               |                  | `16`        |
| c_badge_dot_rect |  | `8` |
| c_badge_padding_horizontal |  | `4` |
| c_badge_text_color | `color_white` | `'#fff'` |
| c_badge_font_size | `font_size_XS` | `12` |