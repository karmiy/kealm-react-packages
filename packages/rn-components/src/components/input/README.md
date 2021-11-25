---
toc: menu
nav:
  title: React Native
group:
  title: Data
  path: /data
  order: 7
---

# Input 输入框

常规的输入框，二次封装 TextInput，通常由 value 与 onChangeText 进行受控使用

<code src='./demos' phone />

## 警告

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='danger'>
      请勿在 APP 中 console.warn 出 ref.current，目前在 IOS 中发现打印 TextInput 的 ref 后，可能会导致输入框无法失焦，并在一段时间后报错内存溢出
  </Blockquote>
);
```

## 基本用法

默认情况下为 36 高、白底、带圆角的输入框

<code src='./demos/demo-base.tsx' />

## 禁用

配置 `disabled` 即可禁用输入框

<code src='./demos/demo-disabled.tsx' />

## 输入框大小

默认情况下，Input 高度为 36，配置 `size` 为 'large' 可将其高度置为 48

<code src='./demos/demo-size.tsx' />

## 自定义宽高

当内置 size 的尺寸不符合需求时，可以通过 `width`、`height` 自定义 Input 的宽高

<code src='./demos/demo-rect.tsx' />

## 自定义字体大小

默认情况下，Input 的字体大小为 15，在 size = 'large' 时为 17

当字体大小不满足需求时，可以配置 `fontSize` 自定义大小

<code src='./demos/demo-font-size.tsx' />

## 自定义圆角大小

默认情况下，Input 的 borderRadius 圆角为 18，在 size = 'large' 时为 24

当圆角大小不满足需求时，可以配置 `radius` 自定义大小

<code src='./demos/demo-radius.tsx' />

## 灰底

默认情况下，Input 为白底背景，配置 `grey` 即可将其更换为灰底（#f5f5f5）

<code src='./demos/demo-grey.tsx' />

## 带 label 的输入框

带前置标签的 Input

<code src='./demos/demo-label.tsx' />

## 可清空

配置 `allowClear` 允许 Input 的内容被清空，在 Input 有内容时，右侧将会出现一个清空按钮

`onClear` 事件将在点击清空按钮时被调用（不需要在 onClear 手动 setValue('')，onClear 仅仅作为一个点击响应事件）

<code src='./demos/demo-clearable.tsx' />

## 字数限制

Input 组件提供了 `maxCount` + `onOverage` 实现输入框的字数限制与字数超额回调（通常是吐司提示）

并通过 `clipEndEditing` 配置（默认 true），给了 2 种方案选择字数超额的裁剪时机：

- 仅在结束编辑时（如失焦收起键盘）才会对文本字数进行裁剪，而不会在编辑过程中立即对字数进行校验（clipEndEditing: true），适合字数较少的场景

- 编辑过程中实时对字数进行校验，超额立即裁剪（clipEndEditing: false），适合字数较多的场景（因为 iOS 中如果输入中文，即键入拼音的过程中，不仅字母会占据字数，还会有多余的空格一起被计算在内，这意味着拼音打一半可能被强制截断，字数较少时体验差）

<code src='./demos/demo-overage.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| ref             | 传递给 TextInput 的 ref                                      | `React.RefObject<TextInput>`        | --      |
| styles          | 组件样式，可以覆盖任何默认样式                               | `object`                             | --      |
| style           | 组件根元素样式（Input 最外层是一个 View，该配置会作用在这个 View 上，而不是 TextInput） | `object`                             | --      |
| width           | 自定义宽度                                                   | `string / number`                    | --      |
| height          | 自定义高度                                                   | `string / number`                    | --      |
| disabled        | 是否禁用                                                     | `boolean`                            | `false` |
| size            | 大小，默认高度 36，'large' 时高度 48                         | `enum('large')`                      | --      |
| fontSize        | 字体大小，默认 15，size = 'large' 时为 17                    | `number`                             | --      |
| grey            | 是否灰色背景                                                 | `boolean`                            | `false` |
| placeholder     | 占位符文本                                                   | `string`                             | --      |
| label           | 左侧插槽，会放置在输入框左侧                                 | `ReactNode`                          | --      |
| allowClear      | 是否允许清空，为 true 时，会在输入框有内容时显示             | `boolean`                            | `false` |
| focusClear | 是否只在聚焦时显示清空按钮 | `boolean` | `false` |
| onClear         | 点击清空按钮时触发                                           | `(e: GestureResponderEvent) => void` | --      |
| innerSpace      | 左右 padding                                                 | `string / number`                    | `16`    |
| radius          | 输入框圆角 borderRadius                                      | `number`                             | `18`    |
| maxCount        | 最大字数（与原生 maxLength 区分开）                          | `number`                             | --      |
| onOverage       | 字数超过 maxCount 时触发的回调                               | `() => void`                         | --      |
| clipEndEditing  | 是否在结束编辑时对字数进行校验与裁剪，详见示例说明           | `boolean`                            | `true`  |
| enabledChsPatch | 0.3.4 新增，修复 Pop 内无法输入中文，非 Pop 内慎用           | `boolean`                            | `false` |

除了默认配置项，Input 继承至 RN 原生的 [TextInput](https://www.react-native.cn/docs/textinput)，支持 TextInput 的配置，如

- onFocus
- onBlur

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------------------|
| Default       | c_input_height_default             |                          | `36`        |
|          | c_input_padding_horizontal_default |                          | `14`        |
|          | c_input_radius_default             |                          | `18`        |
|          | c_input_font_size_default          | `font_size_L`            | `15`        |
|          | c_input_label_gap                  |                          | `8`         |
|          | c_input_clear_gap                  |                          | `8`         |
| Size     | c_input_height_large               |                          | `48`        |
|          | c_input_padding_horizontal_large   |                          | `16`        |
|          | c_input_radius_large               |                          | `24`        |
|          | c_input_font_size_large            | `font_size_XXL`          | `17`        |
| Color    | c_input_background_color           | `color_white`            | `'#fff'`    |
|          | c_input_background_color_grey      | `background_color_light` | `'#f5f5f5'` |
|          | c_input_text_color                 | `color_text_primary`     | `'#323232'` |
|          | c_input_placeholder_color          | `color_text_placeholder` | `'#b2b2b2'` |
| Disabled | c_input_disabled_placeholder_color | `disabled_text_color`    | `'#ccc'`    |
|          | c_input_disabled_color             | `disabled_text_color`    | `'#ccc'`    |
| Clear    | c_input_clear_btn_rect             |                          | `16`        |