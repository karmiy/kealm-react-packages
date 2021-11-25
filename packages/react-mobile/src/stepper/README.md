---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# Stepper 步进器

步进器由增加按钮、减少按钮和输入框组成，用于在一定范围内输入、调整数字

<code src='./demos' phone />

## 基本用法

基本的数字输入框，加、减按钮累加数值，自编辑输入框更新数值

由 `value`、`onChange` 受控，默认 1，可使用 `defaultValue` 配置默认值

<code src='./demos/demo-basic' />

## Plain 简约风格

配置 `plain` 可以让 Stepper 切换为简约风

<code src='./demos/demo-plain' />

## 禁用状态

配置 `disabled`，禁用按钮的点击与输入框编辑

<code src='./demos/demo-disabled' />

## 不可编辑

默认情况下，Stepper 的输入框是可以手动编辑的，配置 `editable` 为 false 即可禁用

<code src='./demos/demo-editable' />

## 自定义宽高

配置 `width`、`height` 即可自定义 Stepper 尺寸

<code src='./demos/demo-rect' />

## 最大/小值

默认没有大小限制，配置 `max`、`min` 即可限制区间范围

<code src='./demos/demo-clamp' />

## 步数

允许配置 `step` 定义递增递减的步数控制

<code src='./demos/demo-step' />

## 精度

控制显示的精度，`precision` 的值必须是一个非负整数，并且不能小于 step 的小数位数

<code src='./demos/demo-precision' />

## 格式化展示

通过 `formatter` 格式化数字，以展示具有具体含义的数据

需要配合 `parser` 一起使用，parser 负责告知 Stepper 如何将 formatter 后的字符串复原

<code src='./demos/demo-formatter' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 类名                                                       | `string`                | --          |
| style        | 样式                                                       | `React.CSSProperties`   | --          |
| width        | 宽度                                                       | `string / number`       | --          |
| height       | 高度                                                       | `string / number`       | --          |
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

除了默认配置项，`div` 可以接收的所有 props，都会作用到组件根节点，如

- onMouseDown
- onMouseUp