---
toc: menu
nav:
  title: React Native
group:
  title: Basic
  path: /basic
  order: 5
---

# Pop 弹框

弹出层抽象动画组件（仅包含动画 + 蒙层），是其他弹框类组件的基层，类似于 RN 自带的 Modal

<code src='./demos' phone />

## 解决了什么？

- RN 自带的 Modal 兼容问题

- RN 中没有 fixed 布局，实现全屏的弹框需要使用 absolute，且设置合适的 top、left，而 absolute 依赖于父级元素，这在较深的组件层级中，单纯的 absolute 将会受到父级元素的影响，难以计算定位值

- 以 absolute 定位布局实现弹框，在较深的组件层级中，由于当前 zIndex 会受到父级及其以上节点的 zIndex 影响，导致层级难以把握，无法确保弹框置顶不被遮挡

## 实现了什么？

- Pop 将 children 部分的节点提取至顶层渲染（作为 `PortalWrapper` 的 children 之一），不受当前组件层级影响

- 节点不透明度从 `0` 到 `1` 的动画过渡效果

- 自带的蒙层

- 可联动进行动画的函数型 children

- 比 RN Modal **更灵活** 的 API 配置

## 顶层 PortalWrapper

页面内 Pop 的 children 子节点都会被提取至 `PortalWrapper` 旁

> PortalWrapper 不会渲染出多余的 View 节点，仅对 Pop 起一个提取的作用

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote type='warning' title='WARNING'>
      如果没有在页面顶层加入 PortalWrapper，你的 Pop 内容将不会被渲染
  </Blockquote>
);
```

```tsx | pure
export default () => {
    return (
        <View style={{ flex: 1 }}>
            {/* 1、将 PortalWrapper 至于页面顶部，通常在页面顶层 flex: 1 节点之下 */}
            <PortalWrapper>
                <View>
                    <View>
                        <View>
                            {/* 2、任意位置使用 Pop */}
                            <Pop>
                                <Text>pop - 1</Text>
                            </Pop>
                            <Pop>
                                <Text>pop - 2</Text>
                            </Pop>
                        </View>
                    </View>
                </View>
            </PortalWrapper>
        </View>
    )
}
```

以上将被渲染为：

```tsx | pure
export default () => {
    return (
        <View style={{ flex: 1 }}>
            <PortalWrapper>
                <View>
                    <View>
                        <View>
                        </View>
                    </View>
                </View>
                {/* Pop 被提取至了 PortalWrapper 之下 */}
                <Pop>
                    <Text>pop - 1</Text>
                </Pop>
                <Pop>
                    <Text>pop - 2</Text>
                </Pop>
            </PortalWrapper>
        </View>
    )
}
```

## 基本用法（无动画）

使用 Pop 实现各种弹框效果的需求，只需要：

- 自定义不同的 `children`

- `visible` 与 `onVisibleChange` 控制 Pop 的显示隐藏

默认情况下，children 的出场是 **无动画** 的

<code src='./demos/demo-base.tsx' />

## 动画效果

如果希望 Pop 的内容也可以实现动画，那么 children 可以传递一个**函数**

函数将接收一个类型为 Animated.Value 的参数 `animate`：

- 在 Pop 显示时，animate 的值将随动画从 `0` 缓动为 `1`

- 在 Pop 隐藏时，animate 的值将随动画从 `1` 缓动为 `0`

这意味着你可以使用 animate 让 children 内容实现各种自己想要的动画效果，只需知道，它是一个在 `[0, 1]` 间变化的值

如下让 children 内容随 Pop 实现透明度的淡入淡出：

<code src='./demos/demo-animated.tsx' />

## 内容居中

大多数情况下，我们可能更希望弹框中内容可以居中，使用 `isCenter` 即可实现

<code src='./demos/demo-center.tsx' />

## 自定义动画时长

默认情况下，Pop 的动画时长是 150ms，可以使用 `duration` 配置自定义的动画时长

<code src='./demos/demo-duration.tsx' />

## 点击蒙层不关闭

默认情况下，点击蒙层将会关闭弹框，如果不希望点击蒙层时关闭，可以配置 `maskClosable` 为 false

<code src='./demos/demo-mask-closable.tsx' />

## 自定义蒙层节点

当时默认的 mask 蒙层效果不满足需求时，配置 `renderMask` 可以自定义蒙层节点

```ts
interface RenderMaskOption {
    animate: Animated.Value; // 当前 pop 组件的动画，同 children
    style: ViewStyle; // 默认 mask 的 style
}

renderMask?: React.ReactNode | ((option: RenderMaskOption) => React.ReactNode);
```

如下自定义渲染一个橙风蒙层：

<code src='./demos/demo-mask.tsx' />

## 输入框与键盘弹起

组件配置 `useKeyboardAvoidingView`，将会在 children 外包装一层 KeyboardAvoidingView

```tsx | pure
// useKeyboardAvoidingView 在 Pop 组件内部的大致逻辑
const Pop = props => {
    const { useKeyboardAvoidingView, children } = props;

    if (useKeyboardAvoidingView) {
        return (
            <View style={styles.wrapper}>
                <KeyboardAvoidingView>
                    {children}
                </KeyboardAvoidingView>
            </View>
        );
    }

    return (
        <View style={styles.wrapper}>
            {children}
        </View>
    );
}
```

默认 `behavior='position'`，可以通过 `keyboardAvoidingViewProps` 进行配置

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      由于父级节点存在定位时，RN 的 KeyboardAvoidingView 可能出现某些怪异行为，useKeyboardAvoidingView 仅仅是为了在 Pop 中内嵌 KeyboardAvoidingView 组件，为键盘弹起问题的解决方案带来更多可能，具体还是根据实际场景而定（可参考 Feedback、Drawer 组件）
  </Blockquote>
);
```

## 打开/关闭的钩子函数

Pop 提供了 4 个钩子函数观察弹窗变化的过程，方便在每个时刻进行需要的操作：

- `onOpen`: 弹框开始显示

- `afterOpen`: 弹框完成显示

- `onClose`: 弹框开始关闭

- `afterClose`: 弹框完成关闭

<code src='./demos/demo-mask-closable.tsx' />

## 初始入场动画

在某些场景中，即使初始 visible = true，我们可能也希望它有一个淡入的初始动画，而不是手动将 visible 从 false 置为 true 迫使其实现初始入场动画

只需要配置 `appear` 属性，即实现这种效果

<code src='./demos/demo-appear.tsx' />

## 关闭即销毁 children

默认情况下，children 的内容在第一次渲染之后是会被保留的

即表示：

- 当 `visible` 的状态变更趋势为 `false => true => false => true` 时

- content 在视图中的状态应为 `null => div => display: none => div`

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      这意味着：
      <b>每次关闭弹框时，其内容部分并不会被卸载，同样，打开时也不会重新初始化</b>
      。这对于实现优化而言或许是更好的做法，每次重新卸载与创建子节点的开销看起来是多余的
  </Blockquote>
);
```

但在某些场景中，我们可能就希望每次关闭时，都能卸载子节点，并在每次打开时重新初始化

这时配置 `unmountOnExit` 即可达到这个效果：

- 当 `visible` 的状态变更趋势为 `false => true => false => true` 时

- content 在视图中的状态应为 `null => div => null => div`

<code src='./demos/demo-unmount-exit.tsx' />

## API

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| styles                    | 组件样式，可以覆盖任何默认样式                               | `object`                                                     | --      |
| visible                   | 是否可见                                                     | `boolean`                                                    | --      |
| onVisibleChange           | 显示状态改变时回调，如点击蒙层关闭                           | `(v: boolean) => void`                                       | --      |
| children                  | 渲染在弹出层内的子节点，可以是一个函数，接收 Pop 的 Animated 动画，当 Pop 打开时，动画数值从 0 变为 1，关闭时，动画数值从 1 变为 0 | `React.ReactNode \| (option: { animate: Animated.Value }) => React.ReactNode` | --      |
| showMask                  | 是否显示蒙层                                                 | `boolean`                                                    | `true`  |
| maskClosable              | 点击蒙层是否关闭                                             | `boolean`                                                    | `true`  |
| onMaskClick               | 点击蒙层触发回调                                             | `(e: GestureResponderEvent) => void`                                                 | --      |
| renderMask                | 自定义蒙层节点，接收 animate（同 children）、style（默认 mask 样式） 配置 | `React.ReactNode \| (option: { animate: Animated.Value; style: ViewStyle }) => React.ReactNode` | --      |
| duration                  | 动画持续时间                                                 | `number`                                                     | `150`   |
| onOpen                    | 组件打开时触发                                               | `() => void`                                                 | --      |
| onClose                   | 组件关闭时触发                                               | `() => void`                                                 | --      |
| afterOpen                 | 组件打开后触发                                               | `() => void`                                                 | --      |
| afterClose                | 组件关闭后触发                                               | `() => void`                                                 | --      |
| zIndex                    | 弹窗层级                                                     | `number`                                                     | `1000`  |
| isCenter                  | 是否对内容进行居中布局（justifyContent 与 alignItems: 'center'） | `boolean`                                                    | `false` |
| useKeyboardAvoidingView   | 是否在 children 外层包装一层 KeyboardAvoidingView，通常在 children 中有输入框时使用，behavior 默认为 'position' | `boolean`                                                    | `false` |
| keyboardAvoidingViewProps | KeyboardAvoidingView 组件的配置                              | [keyboardAvoidingViewProps](https://reactnative.cn/docs/keyboardavoidingview) | --      |
| unmountOnExit             | 关闭时是否卸载 children 节点，若为 true，children 节点将在每次 Pop 打开时重新初始化 | `boolean`                                                    | `false` |
| isLazyMount               | 默认情况下，只有第一次 visible 为 true 时，才会执行初始的内容节点渲染，当该配置为 false 时，即使初始 visible false 尚未打开弹框，也会预先加载内容节点 | `boolean`                                                    | `true`  |
| appear                    | 初始入场是否做动画，即初始 visible 为 true，是否会有动画效果 | `boolean`                                                    | `true`  |

除了默认配置项，还可以传递 [ViewProps](https://reactnative.cn/docs/view)，如

- style 样式

## Theme

| **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|
| c_pop_z_index               | `z_index_XL`             | `1000`                |
| c_pop_mask_background_color | `color_text_thin_dark_4` | `'rgba(0, 0, 0, .4)'` |