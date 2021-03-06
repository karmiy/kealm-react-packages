---
toc: menu
nav:
  title: React Native
group:
  title: Feedback
  path: /feedback
  order: 8
---

# ActionSheet 动作面板

常用的动作面板，底部弹起的模态面板，包含与当前情境相关的多个选项

<code src='./demos' phone />

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
      <p>ActionSheet 底层由 Pop 组件实现，不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
      <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```

## 基本用法

通过 `actions` 配置列表选择项，由 `visible`、`onVisibleChange` 控制显示隐藏

<code src='./demos/demo-base.tsx' />

## 禁用项

某些场景我们可能希望禁用某些选项，这时只需要对相应的 action 项配置 `disabled`

<code src='./demos/demo-disabled.tsx' />

## 自定义标题

配置 `title` 即可定义 ActionSheet 的标题

<code src='./demos/demo-title.tsx' />

## 自定义 render 项

有些场景中，action 项的排版可能更为丰富，这时 label 默认渲染出的效果可能不满足需求

这时，配置 `render` 即可自定义 action 项的内容节点

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      使用 render 自定义渲染 action 项时，其他 action 配置项（handler、disabled 等）会失效，把操作权完全交给 render 的节点
  </Blockquote>
);
```

<code src='./demos/demo-render.tsx' />

## 支持 Drawer 组件配置

ActionSheet 基于 Drawer 封装，这意味着组件支持 [Drawer](/rn-components/feedback/drawer#api) + [Pop](/rn-components/basic/pop#api) 的全部配置

如在 ActionSheet 打开完成后的事件 `afterOpen` 中进行打印：

<code src='./demos/demo-drawer.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles       | 组件样式，可以覆盖任何默认样式 | `object`        | --       |
| drawerStyles | Drawer 组件样式                | `object`        | --       |
| title        | 标题                           | `string`        | --       |
| actions      | 选项列表                       | `Array<Action>` | --       |
| cancelText   | 取消按钮文本                   | `string`        | `'取消'` |
| onCancel     | 点击取消按钮回调               | `() => void`    | --       |

`Action` 类型如下：

```ts
interface Action {
    label?: string; // 文本
    style?: StyleProp<TextStyle>; // 样式
    handler?: () => void; // 点击事件
    handlerClosable?: boolean; // 点击后是否关闭 ActionSheet，默认 true
    disabled?: boolean; // 是否禁用
    render?: () => React.ReactNode; // 自定义渲染，使用后上方部分配置会失效
}
```

除了默认配置项，ActionSheet 继承至 `Drawer` 组件，即可以传递 [DrawerProps](/rn-components/feedback/drawer#api)，如

- onOpen
- onClose
- maskClosable

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------|
| Default  | c_action_sheet_radius                    |                         | `12`        |
|          | c_action_sheet_background_color          | `color_white`           | `'#fff'`    |
|          | c_action_sheet_border_color              | `border_color_base`     | `'#e8e8e8'` |
| Title    | c_action_sheet_title_padding_vertical    |                         | `15`        |
|          | c_action_sheet_title_padding_horizontal  |                         | `16`        |
|          | c_action_sheet_title_line_height         |                         | `18`        |
|          | c_action_sheet_title_font_size           | `font_size_S`           | `13`        |
|          | c_action_sheet_title_text_color          | `color_text_regular`    | `'#999'`    |
| Action   | c_action_sheet_action_line_height        |                         | `25`        |
|          | c_action_sheet_action_padding_vertical   |                         | `12`        |
|          | c_action_sheet_action_padding_horizontal |                         | `16`        |
|          | c_action_sheet_action_font_size          | `font_size_XXXL`        | `18`       |
| Disabled | c_action_sheet_disabled_text_color       | `disabled_text_color`   | `'#ccc'`    |
| Space    | c_action_sheet_space_height              |                         | `8`         |
|          | c_action_sheet_space_background_color    | `background_color_base` | `'#f2f2f2'` |
