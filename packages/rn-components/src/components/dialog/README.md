---
toc: menu
nav:
  title: React Native
group:
  title: Feedback
  path: /feedback
  order: 8
---

# Dialog 对话框

常用的对话框，告知用户并承载相关操作

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
      <p>Dialog 底层由 Pop 组件实现，不要忘记在页面最外层包装 {`<PortalWrapper>`}</p>
      <Link to='/rn-components/basic/pop#顶层-portalwrapper'>什么是 PortalWrapper？</Link>
  </Blockquote>
);
```

## 基本用法（不常用）

最基本的使用，由 `visible`、`onVisibleChange` 控制 Dialog 显示隐藏

配置 `title` `作为对话框的标题，children` 部分将会被视为内容渲染

<code src='./demos/demo-base.tsx' />

## 函数式调用（常用）

相比于基本的组件式使用方式，Dialog 提供了更便捷的使用方式：**函数式调用**

如上例的基本用法，等价于如下形式：

```tsx | pure
Dialog.confirm({
    title: '系统请求使用定位信息权限',
    content: '为了更好的提供本地天气服务，她她圈和发现内容',
});
```

方法接收的参数 `config` 即为组件本身的 props，差异在于：

- children 替换为了 content

- visible 不可用

通用结构如下，返回 `destroy`, `update`, `promisify` 方法，用于**销毁**、**更新**组件配置与**链式执行**：

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      默认情况下，点击取消、确定、蒙层后，会自动调用 destroy 关闭并销毁对话框
  </Blockquote>
);
```

```ts
type CreatePopConfig<T> = Omit<T, 'visible'> & {
    content: React.ReactNode;
};

interface Method {
    (config: CreatePopConfig<DialogProps>): {
        destroy: () => void;
        update: (config: CreatePopConfig<DialogProps>) => void;
        promisify: () => Promise<boolean>; // 见下小节
    };
}
```

Dialog 支持以下 1 种 Method 可以使用：

- Dialog.confirm

如我们希望实现此操作：弹出定位弹框 => 2s 后更新标题 => 3s 后销毁组件，代码如下：

<code src='./demos/demo-func' />

## 函数式调用（Promise 链）

上小节可以看到，函数式除了 `destroy`、`update` 方法，还会返回 `promisify`，执行后将得到 `Promise<boolean>`

在点击确认按钮时将抛出 `true`，反之取消或蒙层关闭时为 `false`，适合应用在 `async await` 的逻辑场景中

<code src='./demos/demo-promise.tsx' />

## 取消、确定按钮文本

Dialog 允许更改取消、确定按钮的文本，只需配置 `cancelText`、`okText`，请注意，如果希望不显示某个按钮，可以配置为 **null**

并且提供了 `onCancel`、`onOk` 事件方便在点击按钮后执行所需的行为

如下只显示一个确认按钮，且文本调整为 "我知道了"

<code src='./demos/demo-btn-text.tsx' />

## 点击蒙层不关闭

Dialog 继承至 [Pop](/rn-components/basic/pop#api)

默认情况下，点击蒙层将会关闭对话框，如果不希望点击蒙层时关闭对话框，可以配置 `maskClosable` 为 false

<code src='./demos/demo-mask-closable.tsx' />

## 支持 Pop 组件配置

Dialog 基于 Pop 封装，这意味着组件支持 [Pop](/rn-components/basic/pop#api) 的全部配置

如在 Dialog 打开完成后的事件 `afterOpen` 中进行打印：

<code src='./demos/demo-pop.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles         | 组件样式，可以覆盖任何默认样式   | `object`        | --       |
| popStyles      | Pop 组件样式                     | `object`        | --       |
| title          | 标题                             | `ReactNode`     | --       |
| okText         | 右侧确定按钮文本，传 null 不显示 | `string / null` | `'确定'` |
| cancelText     | 左侧取消按钮文本，传 null 不显示 | `string / null` | `'取消'` |
| onOk | 点击确定按钮回调 | `() => void` | -- |
| onCancel | 点击取消按钮回调 | `() => void` | -- |
| okClosable | 点击确定按钮，是否关闭对话框 | `boolean` | `true` |
| cancelClosable | 点击取消按钮，是否关闭对话框 | `boolean` | `true` |
| showFooter | 是否显示底部（确定、取消按钮） | `boolean` | `true` |

除了默认配置项，Dialog 继承至 `Pop` 组件，还可以传递 [PopProps](/rn-components/basic/pop#api)，如

- onOpen
- onClose

## Theme

|  | **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|--------|
| Default | c_dialog_width                                 |                      | `270`           |
|  | c_dialog_radius |  | `12` |
|  | c_dialog_background_color | `color_white` | `'#fff'` |
| Body | c_dialog_body_padding_horizontal |  | `15` |
|  | c_dialog_body_min_height_without_title |  | `80` |
| Title | c_dialog_title_margin_top |  | `20` |
|  | c_dialog_title_margin_bottom |  | `8` |
|  | c_dialog_title_line_height |  | `24` |
|  | c_dialog_title_font_size | `font_size_XXXL` | `18` |
|  | c_dialog_title_font_weight |  | `'bold'` |
| Content | c_dialog_content_line_height |  | `20` |
|  | c_dialog_content_margin_bottom |  | `20` |
|  | c_dialog_content_font_size | `font_size_M` | `14` |
|  | c_dialog_content_letter_spacing |  | `0.29` |
|  | c_dialog_content_margin_vertical_without_title |  | `20` |
| Footer | c_dialog_footer_height |  | `50` |
|  | c_dialog_footer_border_width |  | `hairlineWidth` |
|  | c_dialog_footer_border_color | `border_color_base` | `'#e8e8e8'` |
|  | c_dialog_footer_font_size | `font_size_XXXL` | `18` |
|  | c_dialog_footer_text_color | `color_text_regular` | `'#999'` |
|  | c_dialog_footer_ok_text_color | `color_primary` | `'#4794ff'` |

## FAQ

### Dialog 中的 Input 无法编辑

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='danger'>
      值得注意的是：函数式调用对状态的更新<b>完全依赖于手动调用返回的 update，函数式调用的结果仅是调用时的一次快照</b>
  </Blockquote>
);
```

这意味着如下行为是没有意义的：

```tsx | pure
import { Dialog } from '@kealm/rn-components';

export default () => {
    const [value, setValue] = useState('');

    const openDialog = useCallback(() => {
        const { update } = Dialog.confirm({
            title: 'XXXX',
            // ❌ 这个行为没有意义，onChange 更新了 value 并不能驱动 Input 的 value 变更
            content: <Input value={value} onChange={setValue} />,
        });

         // ✔ 只有显示的调用 update 才能正确的驱动更新
        update({
            ...
        });
    }, []);

    return <Button plain onPress={openDialog}>Open Dialog</Button>;
};
```

这种场景下，应当选择最基础的**组件式用法**：

```tsx | pure
import { Dialog } from '@kealm/rn-components';

export default () => {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');

    return (
        <View>
            <Button plain onPress={openDialog}>
                Open Dialog
            </Button>
            <Dialog visible={visible} onVisibleChange={setVisible}>
                <Input value={value} onChange={setValue} />
            </Dialog>
        </View>
    );
};
```