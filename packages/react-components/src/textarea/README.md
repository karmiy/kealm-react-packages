---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# Textarea 文本域

文本域，多行输入框

<code src='./demos' phone />

## 基本用法

默认透明背景，由 `value` 与 `onChange` 进行受控使用

<code src='./demos/demo-basic' />

## 灰底

配置 `grey` 将背景置为灰色（#f5f5f5）

<code src='./demos/demo-grey' />

## 大小

默认情况下，Textarea 字体大小为 14，配置 `size = 'medium'` 时字体大小将变更为 16，且行高从 22 调整为 24

<code src='./demos/demo-size' />

## 固定高

默认情况下，Textarea 将会跟随当前环境自适应宽高

配置 `textareaHeight` 即可固定文本域的高度（默认带上下 padding 12，如设置 textareaHeight 76，则实际高度 76 + 12 + 12 = 100）

<code src='./demos/demo-height' />

## 禁用

配置 `disabled` 即可禁用 Textarea

<code src='./demos/demo-disabled' />

## 自定义圆角大小

默认情况下，Textarea 的 borderRadius 圆角为 8

当圆角大小不满足需求时，可以配置 `radius` 自定义大小

<code src='./demos/demo-radius' />

## 自适应高度

配置 `autoHeight` 即可实现 Textarea 的高度随内容自适应

<code src='./demos/demo-auto-height' />

## 最大、最小行数

```ts | pure
type autoHeight = boolean | { maxRows?: number; minRows?: number };
```

`autoHeight` 不仅可以是一个 boolean，也可以是一个对象，可配置最大、最小的行数

<code src='./demos/demo-auto-rows' />

## 固定行数

配置 `rows` 即可固定 Textarea 的行数

<code src='./demos/demo-rows' />

## 最大字数、字数上限倒计

Textarea 组件提供了 `maxCount` + `onOverage` 实现输入框的字数限制与字数超额回调（通常是吐司提示）

`countShowThreshold` 指定当剩余多少字数时在右下角显示倒计数

<code src='./demos/demo-max-count' />

## 带快捷标签

Textarea 提供了 `tags` 配置，在底部加入快捷标签选择

```ts | pure
interface TextareaTag {
    key: string;
    label: string;
    handler?: (key: string, label: string) => void;
}
```

可以通过 `isTagsOut` 将标签置于 Textarea 外部

<code src='./demos/demo-tags' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| ref              | 传递给 textarea 的 ref            | `React.RefObject<HTMLTextareaElement>`       | --      |
| className        | 根节点类名                                   | `string`                                                     | --      |
| style            | 样式                                             | `React.CSSProperties`                                        | --      |
| textareaStyle      | textarea 节点样式                                            | `React.CSSProperties`                                        | --      |
| textareaHeight     | textarea 元素高度                                            | `string / number`                                            | --      |
| defaultValue       | 默认值                                                       | `string`                                                     | --      |
| value              | 输入框内容，与 onChange 配合组件受控                         | `string`                                                     | --      |
| onChange           | 输入框内容变化时的回调                                       | `(val: string) => void`                                      | --      |
| onClick            | 容器点击事件                                                 | `(e: React.MouseEvent<HTMLDivElement>) => void`             | --      |
| disabled           | 是否禁用                                                     | `boolean`                                                    | `false` |
| placeholder        | 占位符文本                                                   | `string`                                                     | --      |
| size               | 大小，默认行高 22，字体 14，medium 时为 24 16                | `enum('medium')`                                             | --      |
| radius             | 输入框圆角 borderRadius                                      | `string / number`                                            | --      |
| grey               | 是否灰色背景                                                 | `boolean`                                                    | `false` |
| maxCount           | 最大字数                                                     | `number`                                                     | --      |
| showCount          | 是否显示倒计数，会占大约 24 高度的区域预留显示，配置 maxCount 后有效 | `boolean`                                                    | `true`  |
| countShowThreshold | 剩余多少字开始显示倒计数文本                                 | `number`                                                     | `9`     |
| onOverage          | 字数超过 maxCount 时触发的回调                               | `() => void`                                                 | --      |
| rows               | 固定行数，rows 与 autoHeight 选择其一                        | `number`                                                     | --      |
| autoHeight         | 是否自适应高度，rows 与 autoHeight 选择其一                  | `boolean / { maxRows?: number; minRows?: number }`           |         |
| tags               | 放置于输入框下方的可点击标签，点击后自动为输入框插入 label 的文本内容 | `Array<{ key: string; label: string; handler?: (key: string, label: string) => void }>` | --      |
| isTagsOut          | tags 标签是否放置在输入框外面                                | `boolean`                                                    | `false` |
| footer             | 可插入于输入框底部                                           | `ReactNode`                                                  | --      |

除了默认配置项，`textarea` 可以接收的所有 props，都会作用到组件内部的 textarea 节点，如

- onFocus
- onBlur