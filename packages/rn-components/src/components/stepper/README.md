---
toc: menu
nav:
  title: React Native
group:
  title: Data
  path: /data
  order: 7
---

# Stepper 步进器

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字

<code src='./demos' phone />

## 基本用法

基础使用

基本的数字输入框，加、减按钮累加数值，自编辑输入框更新数值

由 `value`、`onChange` 受控，默认 1，可使用 `defaultValue` 配置默认值

<code src='./demos/demo-base.tsx' />

## plain 简约风格

配置 `plain` 可以将 Stepper 切换为简约风格

<code src='./demos/demo-plain.tsx' />

## 禁用状态

配置 `disabled`，禁用按钮的点击与输入框编辑

<code src='./demos/demo-disabled.tsx' />

## 不可编辑

默认情况下，Stepper 的输入框是可以手动编辑的，配置 `editable` 为 false 即可禁用

<code src='./demos/demo-editable.tsx' />

## 自定义宽高

配置 `width`、`height` 即可自定义 Stepper 尺寸

<code src='./demos/demo-rect.tsx' />

## 最大/小值

默认没有大小限制，配置 `max`、`min` 即可限制区间范围

<code src='./demos/demo-clamp.tsx' />

## 步数

允许配置 `step` 定义递增递减的步数控制，如配置步长为 0.1（每次点击按钮，递增/减 0.1）

<code src='./demos/demo-step.tsx' />

## 精度

控制显示的精度，`precision` 的值必须是一个非负整数，并且不能小于 step 的小数位数

<code src='./demos/demo-precision.tsx' />

## 格式化展示

通过 `formatter` 格式化数字，以展示具有具体含义的数据

需要配合 `parser` 一起使用，parser 负责告知 Stepper 如何将 formatter 后的字符串复原

<code src='./demos/demo-formatter.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles       | 组件样式，可以覆盖任何默认样式                             | `object`                | --          |
| width        | 按钮宽度                                                   | `string / number`       | --          |
| height       | 按钮高度                                                   | `string / number`       | --          |
| defaultValue | 默认值                                                     | `number`                | `1`         |
| value        | 当前数值，与 onChange 关联                                 | `number`                | --          |
| onChange     | 数值改变后触发，与 value 关联                              | `(v: number) => void`   | --          |
| max          | 最大值                                                     | `number`                | `Infinity`  |
| min          | 最小值                                                     | `number`                | `-Infinity` |
| step         | 步数                                                       | `number`                | `1`         |
| disabled     | 禁用                                                       | `boolean`               | `false`     |
| readonly     | 输入框是否不可编辑                                         | `boolean`               | `false`     |
| precision    | 精度，必须是一个非负整数，且不小于 step 的小数位数         | `number`                | --          |
| formatter    | 指定输入框展示值的格式                                     | `(v: string) => string` | --          |
| parser       | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | `(v: string) => string` | --          |
| plain        | 是否开启简约风格                                           | `boolean`               | `false`     |
| fontSize     | 字体大小，仅对 plain 风格有效                              | `number`                | --          |

除了默认配置项，还可以传递 [ViewProps](https://reactnative.cn/docs/view)，将作用在组件根元素上，如

- style 样式

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------------------|
| Default | c_stepper_width            |                     | `108`                      |
|         | c_stepper_height           |                     | `32`                       |
|         | c_stepper_background_color | `color_white`       | `‘#fff’`                   |
|         | c_stepper_border_width     |                     | `StyleSheet.hairlineWidth` |
|         | c_stepper_border_color     | `border_color_base` | `‘#e8e8e8’`                |
|         | c_stepper_radius           |                     | `16`                       |
| Plain   | c_stepper_plain_font_size  | `font_size_L`       | `15`                       |