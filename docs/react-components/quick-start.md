---
phone: false
order: 1
---

# 快速上手

## 安装

```shell
# 依赖 @kealm/react-hooks
npm install @kealm/react-components --save
npm install @kealm/react-hooks --save
```

## 引入组件

```tsx | pure
import { Button } from '@kealm/react-components'; // 按需引入

export default () => <Button>按钮</Button>;
```

## 引入样式

样式的引入有 3 种方式：

- 引入全部样式
- 按需引入样式
- 插件自动引入（**推荐**）

### 引入全部样式

```ts
import { Button, Dialog } from '@kealm/react-components';
import '@kealm/react-components/lib/style'; // 引入全部样式
```

### 按需引入样式

```ts
import { Button, Dialog } from '@kealm/react-components'; // 按需引入
// 引入需要的样式
import '@kealm/react-components/lib/style/button';
import '@kealm/react-components/lib/style/dialog';
```

### 插件自动引入

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote>
      使用 <b>babel-plugin-import</b> 或 <b>babel-plugin-component</b> 自动引入组件样式
  </Blockquote>
);
```

```shell
npm install --save-dev babel-plugin-import
# 或
npm install --save-dev babel-plugin-component
```

```json
// 配置 .babelrc（babel-plugin-import）
{
    "plugins": [
        ["import", { 
            "libraryName": "@kealm/react-components", 
            "styleLibraryDirectory": "lib/style",
        }, "@kealm/react-components"]
    ]
}
```

```json
// 配置 .babelrc（babel-plugin-component）
{
    "plugins": [
        ["component", {
            "libraryName": "@kealm/react-components",
            "styleLibraryName": "style",
        }, "@kealm/react-components"]
    ]
}
```

## PX 转 rem

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote>
      组件以 px 作为默认样式单位，如果需要转换为 rem，可用使用插件进行转换，如 <b>postcss-pxtorem</b>
  </Blockquote>
);
```

```shell
npm install --save-dev postcss-pxtorem
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='WARNING' type='warning'>
      使用最新版的 postcss-pxtorem 可能会抛出错误 <b>"Error: PostCSS plugin postcss-pxtorem requires PostCSS 8"</b>，这时可升级 postcss 或对 postcss-pxtorem 进行降级：<b>npm install --save-dev postcss-pxtorem@5.0.0</b>
  </Blockquote>
);
```

```js
// 配置 postcss.config.js
module.exports = {
    plugins: [
        require('postcss-pxtorem')({
            // 根据自己设计稿决定
            // 如设计稿 375，页面切割为 37.5 份（屏幕宽 37.5rem），此处 rootValue 为 10
            rootValue: 10,
            propList: ['*'],
        })
    ]
};
```

```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote>
      如果希望 postcss-pxtorem <b>仅对当前组件库</b>进行转换，可用在 webpack loader 中进行定制
  </Blockquote>
);
```

```ts
// 配置 webpack rules
const path = require('path');

module.exports = {
    module: {
        rules: [
            // 项目代码的样式编译配置
            {
                test: /\.(sa|sc|c)ss$/,
                use: [...],
                // 排除组件库包
                exclude: [path.join(__dirname, '..', 'node_modules/@kealm/react-components')],
            },
            // 组件库的样式编译配置
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('postcss-pxtorem')({
                                    rootValue: 10,
                                    propList: ['*'],
                                })
                            ]
                        }
                    }
                ],
                // 单独配置仅对组件库的样式进行转换
                include: [path.join(__dirname, '..', 'node_modules/@kealm/react-components')]
            }
        ],
    },
};
```