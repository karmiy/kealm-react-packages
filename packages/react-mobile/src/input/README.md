---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# Input 输入框

常规的输入框，通常由 value 与 onChange 进行受控使用

<code src='./demos' phone />

## 基本用法

默认情况下为 36 高、白底、带圆角的输入框

<code src='./demos/demo-basic' />

## 禁用

配置 `disabled` 即可禁用输入框

<code src='./demos/demo-disabled' />

## 输入框大小

默认情况下，Input 高度为 36，配置 `size` 为 'large' 可将其高度置为 48

<code src='./demos/demo-size' />

## 自定义宽高

当内置 size 的尺寸不符合需求时，可以通过 `width`、`height` 自定义 Input 的宽高

<code src='./demos/demo-rect' />

## 自定义圆角大小

默认情况下，Input 的 borderRadius 圆角为 18，在 size = 'large' 时为 24

当圆角大小不满足需求时，可以配置 `radius` 自定义大小

<code src='./demos/demo-radius' />

## 灰底

默认情况下，Input 为白底背景，配置 `grey` 即可将其更换为灰底（#f5f5f5）

<code src='./demos/demo-grey' />

## 带 label 的输入框

带前置标签的 Input

<code src='./demos/demo-label' />

## 可清空

配置 `allowClear` 允许 Input 的内容被清空，在 Input 有内容时，右侧将会出现一个清空按钮

`onClear` 事件将在点击清空按钮时被调用（不需要在 onClear 手动 setValue('')，onClear 仅仅作为一个点击响应事件）

<code src='./demos/demo-clear' />

## 字数限制

Input 组件提供了 `maxCount` + `onOverage` 实现输入框的字数限制与字数超额回调（通常是吐司提示）

此外，中文的限制规则，还可以根据 `specialCharCount` 来决定

- specialCharCount 为 false：中文视为 1 个字符（默认）

- specialCharCount 为 true：中文视为 2 个字符

<code src='./demos/demo-overage' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| ref              | 传递给 input 的 ref                              | `React.RefObject<HTMLInputElement>`                          | --      |
| className        | 类名                                             | `string`                                                     | --      |
| style            | 样式                                             | `React.CSSProperties`                                        | --      |
| width            | 宽度                                             | `string / number`                                            | --      |
| height           | 高度                                             | `string / number`                                            | --      |
| defaultValue     | 默认值                                           | `string`                                                     | --      |
| value            | 输入框内容，与 onChange 配合组件受控             | `string`                                                     | --      |
| onChange         | 输入框内容变化时的回调                           | `(val: string) => void`                                      | --      |
| onClick          | 容器点击事件                                     | `(e: React.MouseEvent<HTMLDivElement>) => void`             | --      |
| disabled         | 是否禁用                                         | `boolean`                                                    | `false` |
| placeholder      | 占位符文本                                       | `string`                                                     | --      |
| size             | 大小，默认高度 36，'large' 时高度 48             | `enum('large')`                                              | --      |
| label            | 左侧插槽，会放置在输入框左侧                     | `ReactNode`                                                  | --      |
| allowClear       | 是否允许清空，为 true 时，会在输入框有内容时显示 | `boolean`                                                    | `false` |
| focusClear | 是否只在聚焦时显示清空按钮 | `boolean` | `false` |
| onClear          | 点击清空按钮时触发                               | `(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | --      |
| grey             | 是否灰色背景                                     | `boolean`                                                    | `false` |
| innerSpace       | 左右 padding                                     | `string / number`                                            | `16`    |
| radius           | 输入框圆角 borderRadius                          | `string / number`                                            | --      |
| maxCount         | 最大字数                                         | `number`                                                     | --      |
| onOverage        | 字数超过 maxCount 时触发的回调                   | `() => void`                                                 | --      |
| specialCharCount | 是否将中文视为 2 个字符                          | `boolean`                                                    | `false` |

除了默认配置项，`input` 可以接收的所有 props，都会作用到组件内部的 input 节点，如

- onFocus
- onBlur