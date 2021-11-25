---
toc: menu
nav:
  title: React Native
group:
  title: Feedback
  path: /feedback
  order: 8
---

# Toast 轻提示

轻量级吐司反馈/提示

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
      <p>Toast 底层由 Pop 组件实现，不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
      <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```

## 基本用法（不常用）

最基本的使用，由 `visible`、`onVisibleChange` 控制 Toast 显示隐藏

`children` 部分将会被视为内容渲染

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      <p>基础 Toast 默认会在 <b>3s</b> 后自动销毁，携带类型的 Toast 默认不会自动销毁，可配置 <b>autoClose</b> 进行控制</p>
  </Blockquote>
);
```

<code src='./demos/demo-base.tsx' />

## 提示类型

Toast 提供了 3 种吐司类型：

- `loading`

- `success`

- `warning`

配置 `type` 为上述选项皆可展示匹配效果

<code src='./demos/demo-type.tsx' />

## 函数式调用（常用）

相比于基本的组件式使用方式，Toast 提供了更便捷的使用方式：**函数式调用**

如上例的基本用法，等价于如下形式：

```tsx | pure
Toast.open({
    content: '保存成功',
});
```

方法接收的参数 `config` 即为组件本身的 props，差异在于：

- children 替换为了 content

- visible 不可用

通用结构如下，返回 `destroy`, `update` 方法，用于**销毁**组件与**更新**组件配置：

```ts
type CreatePopConfig<T> = Omit<T, 'visible'> & {
    content: React.ReactNode;
};

interface Method {
    (config: CreatePopConfig<ToastProps>): {
        destroy: () => void;
        update: (config: CreatePopConfig<ToastProps>) => void;
    };
}
```

Toast 支持以下 4 种 Method 可以使用：

- `Toast.open(config)`

- `Toast.loading(config)`

- `Toast.success(config)`

- `Toast.warning(config)`

如我们希望实现此操作：弹出 “加载中” 吐司 => 2s 后更新为 success 状态显示 “加载成功” => 3s 后销毁组件，代码如下：

<code src='./demos/demo-func' />

## 提示期间不可操作界面

默认情况下，Toast 作为一个轻提示是不影响页面操作的

但是在某些场景下，使用 loading、success、warning 这类带提示图标的提示时，可能希望禁用用户操作界面

这时配置 `isActionable` 为 false 即可阻止用户操作界面

<code src='./demos/demo-actionable.tsx' />


## 支持 Pop 组件配置

Toast 基于 Pop 封装，这意味着组件支持 [Pop](/rn-components/basic/pop#api) 的全部配置

如在 Toast 打开完成后的事件 `afterOpen` 中进行打印：

<code src='./demos/demo-pop.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles       | 组件样式，可以覆盖任何默认样式   | `object`                                | --                                |
| popStyles    | Pop 组件样式                     | `object`                                | --                                |
| type         | icon 类型                        | `enum('loading', 'success', 'warning')` | --                                |
| isActionable | 吐司过程中是否不影响用户操作页面 | `boolean`                               | `true`                            |
| autoClose    | 是否自动在几秒后销毁             | `boolean`                               | 无 type 时为 `true`，反之 `false` |
| duration     | 触发自动销毁的时长               | `number`                                | `3000`                            |

除了默认配置项，Toast 继承至 `Pop` 组件，即可以传递 [PopProps](/rn-components/basic/pop#api)，如

- onOpen
- onClose

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------|
| Default   | c_toast_background_color              | `color_text_thin_dark_6` | `'rgba(0, 0, 0, .6)'` |
|           | c_toast_radius                        |                          | `8`                   |
|           | c_toast_padding_horizontal            |                          | `8`                   |
|           | c_toast_padding_vertical              |                          | `8`                   |
|           | c_toast_font_size                     | `font_size_M`            | `14`                  |
|           | c_toast_text_color                    | `color_white`            | `'#fff'`              |
| Icon      | c_toast_icon_rect                     |                          | `54`                  |
| With Icon | c_toast_padding_horizontal_with_icon  |                          | `9`                   |
|           | c_toast_padding_vertical_with_icon    |                          | `20`                  |
|           | c_toast_content_width_with_icon       |                          | `102`                 |
|           | c_toast_content_padding_top_with_icon |                          | `11`                  |
|           | c_toast_font_size_with_icon           | `font_size_M`            | `14`                  |
