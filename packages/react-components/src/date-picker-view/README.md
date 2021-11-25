---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# DatePickerView 日期选择

用于选择日期或者时间，基于 PickerView 进行封装，根据 type 的不同有着多种选择形式

与 DatePicker 不同的是，它是直接渲染在区域中，而不是弹出窗口

<code src='./demos' phone />

## 基本用法

常规的受控组件，由 `value` 与 `onChange` 进行受控选择

<code src='./demos/demo-basic' />

## 最大、最小日期

DatePickerView 默认最小日期为 new Date('1900/01/01 00:00:00')，最大日期为当前时间 new Date()

可以通过配置 `minDate`、`maxDate` 自定义日期区间

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      minDate、maxDate 请配置固定的时间，请勿传递如 new Date() 此类每次 render 都不同的值，这将引起无限 render
  </Blockquote>
);
```

<code src='./demos/demo-clamp' />

## 日期选择类型

DatePickerView 允许通过配置 `type` 来选择日期类型结构：

- `date`: 年、月、日

- `time`: 时、分

- `datetime`: 年、月、日、时、分

- `datehour`: 年、月、日、时

- `year`: 年

- `year-month`: 年、月

- `month-day`: 月、日

如下展示一个 “年、月、日、时” 的日期选择器

<code src='./demos/demo-type' />

## 自定义单位名称

DatePickerView 默认会为每一项显示单位名称：

- `years`: 年

- `month`: 月

- `date`: 日

- `hours`: 时

- `minutes`: 分

如果希望更改某一项的单位名称，可以通过配置 `unit` 进行修改，若不希望显示单位，可赋值为 null

```ts | pure
type UnitItemType = string | null;

interface Unit {
    year?: UnitItemType;
    month?: UnitItemType;
    date?: UnitItemType;
    hours?: UnitItemType;
    minutes?: UnitItemType;
}
```

如下，将 `year` 单位调整为 “年份”，并去除 `hours`、`minutes` 的单位名

<code src='./demos/demo-unit' />

## 支持 PickerView 组件配置

DatePicker 基于 PickerView 封装，组件提供了 [PickerViewProps](/react-components/data/picker-view#api) 便于传递 PickerView 的相关配置

如将 PickerView 的 `itemHeight` 调整为 44

<code src='./demos/demo-picker-view' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 类名                                         | `string`                                                     | --     |
| style        | 样式                                         | `React.CSSProperties`                                        | --     |
| defaultValue    | 默认日期，没有配置 value 时有效                            | `Date`                                                       | --                                                           |
| value           | 当前日期，与 onChange 配合进行组件受控                     | `Date`                                                       | --                                                           |
| onChange        | 选项改变时回调，与 value 配合进行组件受控                  | `(value: Date) => void`                                      | --                                                           |
| maxDate         | 最大日期                                                   | `Date`                                                       | `new Date()`                                                 |
| minDate         | 最小日期                                                   | `Date`                                                       | `new Date('1900/01/01 00:00:00')`                            |
| type            | 日期类型                                                   | `enum('date', 'time', 'datetime', 'datehour', 'year', 'year-month', 'month-day')` | `'date'`                                                     |
| unit            | 年、月、日、时、分项的单位名称，配置为 null 则不会显示单位 | `{ year?: string \| null; month?: string \| null; date?: string \| null; hours?: string \| null; minutes?: string \| null}` | `{ year: '年', month: '月', date: '日', hours: '时', minutes: '分' }` |
| pickerViewProps | PickerView 组件的 Props                                    | [PickerViewProps](/react-components/data/picker-view#api)    | --                                                           |

除了默认配置项，`div` 可以接收的所有 props，都会作用到组件根节点，如

- onClick