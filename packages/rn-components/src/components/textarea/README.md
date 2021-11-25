---
toc: menu
nav:
  title: React Native
group:
  title: Data
  path: /data
  order: 7
---

# Textarea 文本域

文本域，二次封装多行 multiple 的 TextInput，解决 iOS 与 Android 某些行为上的差异化

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

## 细节须知

在使用自适应高的 `autoHeight` 或 `rows` 配置前，需要知道：

RN 自带的 TextInput 在配置 `multiple` 时是可以自适应高度的

然而由于 iOS、Android 与公司 APP 各种兼容问题，使得自适应高度的效果在不同平台上差异很大，适配困难

Textarea 通过某些手段实现了自己的自适应高度（虽然在某些场合下存有瑕疵，但大体上可接受）

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      <p>注：若配置 autoHeight 或 rows，由于 TextInput 在实现自适应高的隐患较多，在初始化到完全显示时几乎无法避免高度突变（在性能较差的手机上会比较明显），如果希望尽可能的减少这种视觉突变，以下给与两个方案</p>

      <p>1、在使用 autoHeight 时尽可能的让初始文本不要超过 1 行，组件内部会在其初始化完成前尽可能的保证有 1 行的高度，使得在初始化前后不会发生高度突变效果</p>

      <p>2、在使用 rows > 1 时，若输入框一开始是不可见的（如弹框内输入框），可以在页面初始化时创建一个与其规格一致（fontSize 相同）的输入框（可以用一个 height: 0; overflow: hidden 的 View 包装使其不影响页面），这样的操作会使同款 Textarea 高度等相关数据持有缓存，在下一次显示同等规格的 Textarea 时将渲染的更快</p>
  </Blockquote>
);
```

## 基本用法

默认透明背景，由 `value` 与 `onChangeText` 进行受控使用

<code src='./demos/demo-base.tsx' />

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      <p>在公司 APP 中，TextInput 多行 multiple 效果在不同平台表现不同</p>
      <p>iOS：默认自适应一行</p>
      <p>Android：默认自带高度</p>
  </Blockquote>
);
```

## 灰底

配置 `grey` 将背景置为灰色（#f5f5f5）

<code src='./demos/demo-grey.tsx' />

## 大小

默认情况下，Textarea 字体大小为 14，配置 `size` = 'medium' 时字体大小将变更为 16

<code src='./demos/demo-size.tsx' />

## 固定高

配置 `disabled` 即可禁用 Textarea

<code src='./demos/demo-disabled.tsx' />

## 禁用

默认情况下，Textarea 将会跟随当前环境自适应宽高

配置 `textareaHeight` 即可固定文本域的高度（默认带上下 padding 12，如设置 textareaHeight 76，则实际高度 76 + 12 + 12 = 100）

<code src='./demos/demo-height.tsx' />

## 自定义圆角大小

默认情况下，Textarea 的 borderRadius 圆角为 8

当圆角大小不满足需求时，可以配置 `radius` 自定义大小

<code src='./demos/demo-radius.tsx' />

## heightOfTheUIRow?

heightOfTheUIRow 顾名思义，即**当前只有一行时，Textarea （在 UI 视觉上的）的高度值**

Textarea 实现了自己的自适应高（`autoHeight`）或固定行（`rows`）

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      <p>RN 的多行输入框与 H5 表现不同：</p>
      <p>在 H5 中，设置 lineHeight 即可稳定 textarea 每行的高度，如 lineHeight 22，则 textarea 在 1、2、3 行时的高度为 22、44、66</p>
      <p>RN 并不会遵循这种规律效果，可能 1 行时高度是 19，在 2 行时为 35，3 行时为 51（不会以倍数叠加变为 44、66），即 RN 中无法保证每一行是固定的高度值</p>
      <p>换位思考，在大多数场景中，我们可能更关心的是：<b>一行时 Textarea 的高度是多少，而对其后续换行递增的高度不那么关心</b></p>
  </Blockquote>
);
```

你需要告诉 Textarea 组件，当其的内容只有 1 行时应当显示出的高度是多少，这便是 `heightOfTheUIRow`（默认 32）的意义，Textarea 将在配置 autoHeight 或 rows 后知道自己该怎么处理这些问题

## 自适应高度

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      用前须知：请先了解什么是 heightOfTheUIRow
  </Blockquote>
);
```

配置 `autoHeight` 即可实现 Textarea 的高度随内容自适应

<code src='./demos/demo-auto-height.tsx' />

## 最大、最小行数

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      用前须知：请先了解什么是 heightOfTheUIRow
  </Blockquote>
);
```

`autoHeight` 不仅可以是一个 boolean，也可以是一个对象：

```ts
type autoHeight = boolean | { maxRows?: number; minRows?: number }; 
```

可以配置对象中的 `maxRows` 与 `minRows` 限制最大、最小的行数

<code src='./demos/demo-auto-rows.tsx' />

## 固定行数

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      用前须知：请先了解什么是 heightOfTheUIRow
  </Blockquote>
);
```

配置 `rows` 即可固定 Textarea 的行数

<code src='./demos/demo-rows.tsx' />

## 最大字数、字数上限倒计

Textarea 组件提供了 `maxCount` + `onOverage` 实现输入框的字数限制与字数超额回调（通常是吐司提示）

`countShowThreshold` 指定当剩余多少字数时在右下角显示倒计数

并通过 `clipEndEditing` 配置（默认 false），给了 2 种方案选择字数超额的裁剪时机：

- 仅在结束编辑时（如失焦收起键盘）才会对文本字数进行裁剪，而不会在编辑过程中立即对字数进行校验（clipEndEditing: true），适合字数较少的场景

- 编辑过程中实时对字数进行校验，超额立即裁剪（clipEndEditing: false），适合字数较多的场景（因为 iOS 中如果输入中文，即键入拼音的过程中，不仅字母会占据字数，还会有多余的空格一起被计算在内，这意味着拼音打一半可能被强制截断，字数较少时体验差）

<code src='./demos/demo-overage.tsx' />

## 带快捷标签

Textarea 提供了 `tags` 配置，在底部加入快捷标签选择

```ts
interface TextareaTag {
    key: string;
    label: string;
    handler?: (key: string, label: string) => void;
}
```

可以通过 `isTagsOut` 将标签置于 Textarea 外部

<code src='./demos/demo-tags.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| ref                | 传递给 TextInput 的 ref                                      | `React.RefObject<TextInput>`                                | --      |
| styles             | 组件样式，可以覆盖任何默认样式                               | `object`                                                     | --      |
| style              | 组件根元素样式（Input 最外层是一个 View，该配置会作用在这个 View 上，而不是 TextInput） | `object`                                                     | --      |
| disabled           | 是否禁用                                                     | `boolean`                                                    | `false` |
| size               | 默认 TextInput.fontSize 为 14，'medium' 时为 16              | `enum('medium')`                                             | --      |
| fontSize           | 输入框一行的高度是由其 fontSize 决定的（lineHeight 存在问题请勿使用，请使用 fontSize 来控制输入框每行的高度），默认 14，'medium' 大小时为 16 | `number`                                                     | --      |
| grey               | 是否灰色背景                                                 | `boolean`                                                    | `false` |
| placeholder        | 占位符文本                                                   | `string`                                                     | --      |
| radius             | 圆角 borderRadius                                            | `number`                                                     | `8`     |
| innerSpace         | 左右 padding                                                 | `number / string`                                            | `16`    |
| showCount          | 是否显示倒计数，会占大约 24 高度的区域预留显示，配置 maxCount 后有效 | `boolean`                                                    | `true`  |
| maxCount           | 最大字数（与原生 maxLength 区分开）                          | `number`                                                     | --      |
| countShowThreshold | 剩余多少字开始显示倒计数文本，                               | `number`                                                     | `9`     |
| onOverage          | 字数超过 maxCount 时触发的回调                               | `() => void`                                                 | --      |
| clipEndEditing     | 是否在结束编辑时对字数进行校验与裁剪，详见示例说明           | `boolean`                                                    | `false` |
| tags               | 放置于输入框下方的可点击标签，点击后自动为输入框插入 label 的文本内容 | `Array<{ key: string; label: string; handler?: (key: string, label: string) => void }>` | --      |
| isTagsOut          | tags 标签是否放置在输入框外面                                | `boolean`                                                    | `false` |
| tagsGapHorizontal  | tags 标签之间水平方向的间距                                  | `number`                                                     | `4`     |
| tagsGapVertical    | tags 标签之间垂直方向的间距                                  | `number`                                                     | `4`     |
| footer             | 可插入于输入框底部                                           | `ReactNode`                                                  | --      |
| textareaHeight     | TextInput 元素的高度，通常在不需要自适应变化时可以指定固定高 | `number / string`                                            | --      |
| heightOfTheUIRow   | 配置 autoHeight 或 rows 时使用：当输入框只有一行时的 UI 视觉高度 | `number`                                                    | `32`    |
| autoHeight         | 是否自适应高度                                               | `boolean / { maxRows?: number; minRows?: number }`           | `false` |
| rows               | 固定行数                                                     | `number`                                                     | --      |
| enabledChsPatch    | 0.3.4 新增，修复 Pop 内无法输入中文，非 Pop 内慎用           | `boolean`                                                    | `false` |

除了默认配置项，Textarea 继承至 RN 原生的 [TextInput](https://www.react-native.cn/docs/textinput)，支持 TextInput 的配置，如

- onFocus
- onBlur

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------------------|
| Default  | c_textarea_radius_default             |                          | `8`         |
|          | c_textarea_font_size_default          | `font_size_M`            | `14`        |
|          | c_textarea_text_color                 | `color_text_primary`     | `'#323232'` |
|          | c_textarea_placeholder_color          | `color_text_placeholder` | `'#b2b2b2'` |
|          | c_textarea_padding_vertical           |                          | `12`        |
|          | c_textarea_padding_horizontal         |                          | `16`        |
|          | c_textarea_background_color_grey      | `background_color_light` | `'#f5f5f5'` |
| Size     | c_textarea_radius_medium              |                          | `8`         |
|          | c_textarea_font_size_medium           | `font_size_XL`           | `16`        |
| Disabled | c_textarea_disabled_placeholder_color | `disabled_text_color`    | `'#ccc'`    |
|          | c_textarea_disabled_color             | `disabled_text_color`    | `'#ccc'`    |
| Count    | c_textarea_count_height               |                          | `24`        |
|          | c_textarea_count_font_size            | `font_size_XL`           | `16`        |
|          | c_textarea_count_text_color           | `color_text_secondary`   | `'#b5b5b5'` |
| Tags     | c_textarea_tags_gap                   |                          | `12`        |
|          | c_textarea_tags_height                |                          | `28`        |
|          | c_textarea_tags_padding_horizontal    |                          | `6`         |
|  | c_textarea_tags_border_width | | `1` |
|  | c_textarea_tags_border_color | `background_color_dark` | `'#ebebeb'` |
|  | c_textarea_tags_radius | | `15` |
|  | c_textarea_tags_add_icon_rect | | `12` |
|  | c_textarea_tags_add_icon_gap | | `4` |
|  | c_textarea_tags_font_size | `font_size_XS` | `12` |