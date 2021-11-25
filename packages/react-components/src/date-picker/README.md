---
toc: menu
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# DatePicker 日期选择器

常用的日期选择器

<code src='./demos' phone />

## 基本用法

基本的日期选择器，通常作为受控组件

- `visible`、`onVisibleChange` 控制 DatePicker 显示隐藏

- `value`、`onChange` 使 DatePicker 受控

<code src='./demos/demo-basic' />

## 默认选择日期

在尚未选择前，有时可能也希望可以默认选择某个日期

这种场景下可以配置 `defaultValue` 指定默认的初始日期

如下默认选择 2020/12/11

<code src='./demos/demo-default' />

## 自定义标题

配置 `title` 即可展示引导性标题

<code src='./demos/demo-title' />

## 取消、确定按钮文本

DatePicker 允许更改取消、确定按钮的文本，只需配置 `cancelText`、`okText`

并且提供了 `onCancel`、`onOk` 事件方便在点击按钮后执行所需的行为

<code src='./demos/demo-btn-text' />

## DatePickerView 组件配置

DatePicker 继承至 DatePickerView，这意味着 DatePicker 支持 [DatePickerView](/react-components/data/date-picker-view#api) 组件的配置

如配置 DatePicker 为：

- `type` 显示为 datehour（年、月、日、时）

- `minDate` 为 2000-01-01

<code src='./demos/demo-date-picker-view' />

## Drawer 组件配置

DatePicker 基于 DatePickerView + Drawer 封装，组件提供了 `DrawerProps` 配置

而 Drawer 又是基于 Pop 封装，这意味着 DatePicker 支持 [Drawer](/react-components/feedback/drawer#api) + [Pop](/react-components/basic/pop#api) 的全部配置

如配置 DatePicker 为：

- 在打开完毕后的事件 `afterOpen` 进行吐司

- `duration` 动画时长调整为 500ms

<code src='./demos/demo-date-picker-view' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 类名                                         | `string`                                                     | --     |
| style        | 样式                                         | `React.CSSProperties`                                        | --     |
| defaultValue    | 默认日期，没有配置 value 时有效           | `Date`                                               | --       |
| value           | 当前日期，与 onChange 配合进行组件受控    | `Date`                                               |          |
| onChange        | 选项改变时回调，与 value 配合进行组件受控 | `(value: Date) => void`                              | --       |
| visible         | 是否显示                                  | `boolean`                                            | `false`  |
| onVisibleChange | 显示状态改变时回调，如点击蒙层关闭        | `(v: boolean) => void`                               | --       |
| title           | 标题                                      | `ReactNode`                                          | --       |
| cancelText      | 取消按钮                                  | `ReactNode`                                          | `'取消'` |
| onCancel        | 点击取消按钮的回调                        | `() => void`                                         | --       |
| okText          | 确定按钮                                  | `ReactNode`                                          | `'确定'` |
| onOk            | 点击确定按钮的回调                        | `(value: Date) => void`                              | --       |
| drawerProps     | Drawer 组件的 Props                       | [DrawerProps](/react-components/feedback/drawer#api) | --       |

除了默认配置项，DatePicker 继承至 `DatePickerView` 组件，还可以传递 [DatePickerViewProps](/react-components/data/date-picker-view#api)，如

- type
- minDate
- unit