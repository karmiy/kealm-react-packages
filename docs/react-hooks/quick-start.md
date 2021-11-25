---
phone: false
order: 1
---

# 快速上手

## 安装

```shell
npm install @kealm/react-hooks --save
```

## 运用

至 `@kealm/react-hooks` 中按需引入需要的 Hook 即可使用

```tsx | pure
import { useDidMount } from '@kealm/react-hooks';

export default () => {
    useDidMount(() => {
        // do something
    });
};
```