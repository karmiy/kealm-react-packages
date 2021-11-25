---
toc: menu
phone: true
nav:
  title: React Mobile
group:
  title: Data
  path: /data
  order: 6
---

# Picker 选择器

常用的弹框选择器（暂不支持多列，有需要可以使用 Drawer + PickerView 实现）

<code src='./demos' phone />

## 基本用法

最基本的选择器使用

- `data` 自定义列表数据

- `visible`、`onVisibleChange` 控制 Picker 显示隐藏

- `value`、`onChange` 使 Picker 受控

<code src='./demos/demo-basic' />

## 默认选中项

当初始 `value` 为空值（undefined）时，我们可能希望 Picker 默认展示的不是第一项，而是其他项作为默认值

这种场景下可以配置 `defaultValue` 作为默认选中项，如下默认选择 '女'

<code src='./demos/demo-default' />

## 自定义标题

配置 `title` 即可展示引导性标题

<code src='./demos/demo-title' />

## 取消、确定按钮文本

Picker 允许更改取消、确定按钮的文本，只需配置 `cancelText`、`okText`

并且提供了 `onCancel`、`onOk` 事件方便在点击按钮后执行所需的行为

<code src='./demos/demo-btn-text' />

## 支持 PickerView 组件配置

Picker 继承至 PickerView，这意味着 Picker 支持 [PickerView](/react-components/data/picker-view#api) 组件的配置

如配置 Picker 为：

- item 高为 60

<code src='./demos/demo-picker-view' />

## 支持 Drawer 组件配置

Picker 基于 PickerView + Drawer 封装，组件提供了 `DrawerProps` 配置

而 Drawer 又是基于 Pop 封装，这意味着 Picker 支持 [Drawer](/react-components/feedback/drawer#api) + [Pop](/react-components/basic/pop#api) 的全部配置

如配置 Picker 为：

- 在打开完毕后的事件 `afterOpen` 进行吐司

- `duration` 动画时长调整为 500ms

<code src='./demos/demo-picker-view' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| className    | 类名                                         | `string`                                                     | --     |
| style        | 样式                                         | `React.CSSProperties`                                        | --     |
| data            | 选项列表                                  | `Array<{ label: React.ReactNode; value: any; className?: string; style?: React.CSSProperties }>` | --       |
| defaultValue    | 默认值，没有配置 value 时有效             | `any`                                                        | --       |
| value           | 当前值，与 onChange 配合进行组件受控      | `any`                                                        | --       |
| onChange        | 选项改变时回调，与 value 配合进行组件受控 | `(value: any) => void`                                       | --       |
| visible         | 是否显示                                  | `boolean`                                                    | `false`  |
| onVisibleChange | 显示状态改变时回调，如点击蒙层关闭        | (v: boolean) => void                                         | --       |
| title           | 标题                                      | `ReactNode`                                                  | --       |
| cancelText      | 取消按钮                                  | `ReactNode`                                                  | `'取消'` |
| onCancel        | 点击取消按钮的回调                        | `() => void`                                                 | --       |
| okText          | 确定按钮                                  | `ReactNode`                                                  | `'确定'` |
| onOk            | 点击确定按钮的回调                        | `(value: any) => void`                                       | --       |
| drawerProps     | Drawer 组件的 Props                       | [DrawerProps](/react-components/feedback/drawer#api)         | --       |

除了默认配置项，Picker 继承至 `PickerView` 组件，还可以传递 [PickerViewProps](/react-components/data/picker-view#api)，如

- itemHeight
- itemCount