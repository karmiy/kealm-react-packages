---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# PickerView 选择器

最基本的选择器，与 Picker 不同的是，它是直接渲染在区域中，而不是弹出窗口

<code src='./demos' phone />

## 基本用法

通过 `data` 配置选项列表，`value`、`onChange` 进行受控

<code src='./demos/demo-basic' />

## 视图区域显示数量

默认情况下，PickerView 在视图区域内最多可以展示 7 个 Item（中间 1 项 + 上下各 3项）

配置 `itemCount` 即可自定义可见 Item 的数量

<code src='./demos/demo-item-count' />

## 选项高度

PickerView 默认每个 item 为 34，配置 `itemHeight` 即可自定义 item 高

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      支持 px，vw，vh，rem，默认 px
  </Blockquote>
);
```

<code src='./demos/demo-item-height' />


## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 类名                                         | `string`                                                     | --     |
| style        | 样式                                         | `React.CSSProperties`                                        | --     |
| data         | 选项列表                                     | `Array<{ label: React.ReactNode; value: any; className?: string; style?: React.CSSProperties }>` | --     |
| defaultValue | 默认值，没有配置 value 时有效                | `any`                                                        | --     |
| value        | 当前值，与 onChange 配合进行组件受控         | `any`                                                        | --     |
| onChange     | 选项改变时回调，与 value 配合进行组件受控    | `(value: any) => void`                                       | --     |
| itemHeight   | item 选项高度，支持 px，vw，vh，rem，默认 px | `number / string`                                            | `34`   |
| itemCount    | 视图区域显示数量                             | `number`                                                     | `7`    |

除了默认配置项，`div` 可以接收的所有 props，都会作用到组件根节点，如

- onClick