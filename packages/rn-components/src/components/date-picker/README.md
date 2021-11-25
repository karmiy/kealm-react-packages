---
toc: menu
nav:
  title: React Native
group:
  title: Data
  path: /data
  order: 7
---

# DatePicker 日期选择器

常用的日期选择器

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
    暂无仿真机示例，可参考 H5 组件库 <Link to='/react-components/data/date-picker'>DatePicker</Link>
  </Blockquote>
);
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
      <p>DatePicker 底层由 Pop 组件实现，不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
      <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
    由于 PickerView 的实现上用到了定时器 setTimeout，在 Android 测试 PickerView 时请关闭 Chorme Debug JS Remotely，因为它会导致 setTimeout 失效。见 <a href='https://github.com/facebook/react-native/issues/9436' target='_blank'>issues</a>
  </Blockquote>
);
```

## 基本用法

基本的日期选择器，通常作为受控组件

- `visible`、`onVisibleChange` 控制 DatePicker 显示隐藏

- `value`、`onChange` 使 DatePicker 受控

![](./demos/images/date-picker-basic.png)

<code src='./demos/demo-base.tsx' />

## 默认选择日期

在尚未选择前，有时可能也希望可以默认选择某个日期

这种场景下可以配置 `defaultValue` 指定默认的初始日期

如下默认选择 2020/12/11

![](./demos/images/date-picker-default.png)

<code src='./demos/demo-default.tsx' />

## 自定义标题

配置 `title` 即可展示引导性标题

![](./demos/images/date-picker-title.png)

<code src='./demos/demo-title.tsx' />

## 取消、确定按钮文本

DatePicker 允许更改取消、确定按钮的文本，只需配置 `cancelText`、`okText`

并且提供了 `onCancel`、`onOk` 事件方便在点击按钮后执行所需的行为

![](./demos/images/date-picker-btn-text.png)

<code src='./demos/demo-btn-text.tsx' />

## DatePickerView 组件配置

DatePicker 继承至 DatePickerView，这意味着 DatePicker 支持 [DatePickerView](/rn-components/data/date-picker-view#api) 组件的配置

如配置 DatePicker 为：

- `type` 显示为 datehour（年、月、日、时）

- `minDate` 为 2000-01-01

<code src='./demos/demo-date-picker-view.tsx' />

## Drawer 组件配置

DatePicker 基于 DatePickerView + Drawer 封装，组件提供了 `DrawerProps` 配置

而 Drawer 又是基于 Pop 封装，这意味着 DatePicker 支持 [Drawer](/rn-components/feedback/drawer#api) + [Pop](/rn-components/basic/pop#api) 的全部配置

如配置 DatePicker 为：

- 在打开完毕后的事件 `afterOpen` 进行吐司

<code src='./demos/demo-drawer.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles               | 组件样式，可以覆盖任何默认样式 | `object`                                          | --       |
| datePickerViewStyles | DatePicker 组件样式            | `object`                                          | --       |
| defaultValue         | 初始 Picker 打开时选中的默认值 | `Date`                                            | --       |
| value                | 当前选中的日期                 | `Date`                                            | --       |
| onChange             | 点击确定时触发                 | `(value: Date) => void`                           | --       |
| visible              | picker 是否显示                | `boolean`                                         | --       |
| onVisibleChange      | picker 可见状态改变时触发      | `(v: boolean) => void`                            | --       |
| title                | 标题                           | `string / ReactNode`                              | --       |
| cancelText           | 取消按钮                       | `string / ReactNode`                              | `'取消'` |
| onCancel             | 点击取消按钮的回调             | `() => void`                                      | --       |
| okText               | 确定按钮                       | `string / ReactNode`                              | `'确定'` |
| onOk                 | 点击确定按钮的回调             | `(value: Date) => void`                           | --       |
| drawerProps          | Drawer 组件的 Props            | [DrawerProps](/rn-components/feedback/drawer#api) | --       |

除了默认配置项，DatePicker 继承至 `DatePickerView` 组件，还可以传递 [DatePickerViewProps](/rn-components/data/date-picker-view#api)，如

- type

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------|
| Default | c_date_picker_radius                 |                      | `12`        |
|         | c_date_picker_background_color       | `color_white`        | `'#fff'`    |
| Header  | c_date_picker_header_height          |                      | `44`        |
|         | c_date_picker_header_border_color    | `border_color_base`  | `'#e8e8e8'` |
| Title   | c_date_picker_title_height           |                      | `44`        |
|         | c_date_picker_title_font_size        | `font_size_XL`       | `16`        |
|         | c_date_picker_title_text_color       | `color_text_primary` | `'#323232'` |
| Btn     | c_date_picker_btn_height             |                      | `44`        |
|         | c_date_picker_btn_padding_horizontal |                      | `16`        |
|         | c_date_picker_btn_font_size          | `font_size_XL`       | `16`        |
|         | c_date_picker_btn_text_color         | `color_text_primary` | `'#323232'` |
|         | c_date_picker_btn_ok_text_color      | `color_primary`      | `'#4794ff'` |
| View    | c_date_picker_view_padding_vertical  |                      | `16`        |
