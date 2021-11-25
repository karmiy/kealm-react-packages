---
toc: menu
order: 1
nav:
  title: React Native
  order: 3
group:
  title: General
  path: /general
  order: 4
---

# Text 文本

定义了默认样式的 Text 文本组件

## 基本用法

RN 中的文本样式不能像 H5 的 CSS 继承父级

该组件对 Text 进行了简单的二次封装，定义了一些默认样式效果：

- `fontSize`: 14

- `color`: '#323232'

- `fontFamily`: !isIos ? 'System' : undefined（修复某些机型下（如小米 10）文本显示不全 + [字体优化落地需求](https://www.tapd.cn/33626548/prong/stories/view/1133626548001115315)）

- `lineHeight`: fontSize * 1.5（仅 Android 有补充此 lineHeight，修复 Android 某些机型下，文本垂直方向显示不全）

仅需视为 RNText 使用即可，继承 RNText 所有 props

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { View } from 'react-native';
import { Text } from '@kealm/rn-components';

export default () => {
    return (
        <View>
            <Text>同 RN 的 Text 一样使用它</Text>
            <Text>仅定义了默认的字体大小与颜色</Text>
        </View>
    );
};
```

## API


同 [TextProps](https://reactnative.cn/docs/text)

## Theme

| **变量名** | **对应基础主题**     | **值**    |
|--------------------|--------------|--------|
| c_text_font_size | `font_size_M`        | `14`        |
| c_text_color     | `color_text_primary` | `'#323232'` |