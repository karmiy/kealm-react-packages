---
toc: menu
order: 2
nav:
  title: React Native
group:
  title: General
  path: /general
  order: 4
---

# Button 按钮

常用的操作按钮

<code src='./demos' phone />

## 按钮类型

Button 具有 3 种类型，具备不同的颜色主题效果：

- `primary`: 蓝（#4794ff）

- `regular`: 红（#ff4d88）

- `info`: 灰（#666）

默认为 `primary`

<code src='./demos/demo-type.tsx' />

## 按下时的不透明度

组件借由 TouchableOpacity 包装，默认 `activeOpacity` 为 1（无按下态效果），可以通过 activeOpacity 自定义按下时的透明效果

<code src='./demos/demo-opacity.tsx' />

## 按钮 Plain 简约风格

配置 `plain` 可以让 Button 切换为简约风

<code src='./demos/demo-plain.tsx' />

## 无边框 Plain 风格

将 `plainWithBorder` 设为 false 可以让 plain 按钮去除边框，通常应用在页面背景非白色调

<code src='./demos/demo-plain-border.tsx' />

## 自定义按钮色调

当默认的 type 色调不满足需求时，可以配置 `color` 自定义按钮的颜色

<code src='./demos/demo-color.tsx' />

## 禁用

`disabled` 配置即可让按钮切换为禁用状态

<code src='./demos/demo-disabled.tsx' />

## 按钮大小

默认情况下，按钮高度为 28，将 `size` 置为 large 即可变更为高度 48 的大型按钮

<code src='./demos/demo-size.tsx' />

## 自定义按钮大小

当 size 内置的按钮宽高不满足需求时，可以通过 `width`、`height` 自定义按钮宽高

<code src='./demos/demo-rect.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles          | 组件样式，可以覆盖任何默认样式                               | `object`                             | --          |
| activeOpacity   | 被触摸操作激活时以多少不透明度显示（Button 外层由 TouchableOpacity 包装） | `number`                             | `1`         |
| width           | 按钮宽度                                                     | `string / number`                    | --          |
| height          | 按钮高度                                                     | `string / number`                    | --          |
| type            | 按钮类型                                                     | `enum('primary', 'regular', 'info')` | `'primary'` |
| size            | 按钮大小，默认 28 高，大按钮 48                              | `enum('large')`                      | --          |
| radius          | 按钮圆角                                                     | `number`                             | --          |
| plain           | 是否是 plain 风格的按钮                                      | `boolean`                            | `false`     |
| plainWithBorder | plain 风格时是否带边框                                       | `boolean`                            | `true`      |
| fontSize        | 字体大小                                                     | `number`                             | --          |
| color           | 自定义颜色，非 plain 为背景填充色，plain 风格时为边框、字色  | `string`                             | --          |

除了默认配置项，还可以传递 [TouchableOpacityProps](https://reactnative.cn/docs/touchableopacity)，如

- style 样式
- disabled 是否禁用
- onPress 点击事件

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|------|--------------------|--------------|--------|
| Default   | c_button_height_default                  |                       | `28`        |
|          | c_button_radius_default                  |                       | `15`        |
|          | c_button_padding_horizontal_default      |                       | `12`        |
|          | c_button_font_size                       | `font_size_M`         | `14`        |
| Size     | c_button_height_large                    |                       | `48`        |
|          | c_button_radius_large                    |                       | `24`        |
|          | c_button_padding_horizontal_large        |                       | `28`        |
|          | c_button_font_size_large                 | `font_size_XXXL`      | `18`        |
| Plain    | c_button_plain_background_color          | `color_white`         | `'#fff'`    |
| Type     | c_button_primary_color                   | `color_primary`       | `'#4794ff'` |
|          | c_button_regular_color                   | `color_regular`       | `'#ff4d88'` |
|          | c_button_info_color                      | `color_info`          | `'#666'`    |
| Disabled | c_button_disabled_background_color       | `disabled_background` | `'#ddd'`    |
|          | c_button_disabled_text_color             | `color_white`         | `'#fff'`    |
|          | c_button_plain_disabled_border_color     | `disabled_background` | `'#ddd'`    |
|          | c_button_plain_disabled_background_color | `color_white`         | `'#fff'`    |
|          | c_button_plain_disabled_text_color       | `disabled_text_color` | `'#ccc'`    |