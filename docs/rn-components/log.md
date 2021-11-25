---
phone: false
toc: false
order: 2
---

# 更新日志

### 0.3.16

> 2021-11-18

- Feature
    - `Dialog.confirm` 新增 promisify 返回

### 0.3.15

> 2021-11-08

- Feature
    - `Text` 调整 fontFamily 为 System 兼容美柚字体落地需求

### 0.3.14

> 2021-10-26

- Feature
    - `Input` 新增 focusClear 配置

### 0.3.13

> 2021-10-21

- Bug Fix
    - 修复 `Textarea` 特殊安卓机型下 maxRows 无效

### 0.3.11

> 2021-08-31

- Feature
    - `Badge` 新增 dotRect 配置

### 0.3.10

> 2021-08-25

- Feature
    - `Toast` 新增 autoClose、duration 配置

- Chore
    - `Badge` 初始 offset 调整为 0 0

### 0.3.7

> 2021-08-16

- Feature
    - `Stepper` 新增 plain、fontSize 配置

### 0.3.4

> 2021-08-04

- Bug Fix
    - `Input`、`Textarea` 新增 enabledChsPatch 配置（修复 RN 641 内嵌 Pop 时在 iOS 无法输入中文）

### 0.3.0

> 2021-07-22

- Feature
    - 新增 `Stepper` 组件

### 0.3.0

> 2021-07-17

- Feature
    - 新增 `SafeAreaBar`、`SafeAreaBottom` 组件

### 0.2.14

> 2021-07-09

- Bug Fix
    - 兼容修复 RN 0.64.1 iOS new Date 为 null 的错误

### 0.2.13

> 2021-07-02

- Bug Fix
    - 修复 RN 0.64.1 `Input` 文本居上
    - 修复 RN 0.64.1 `Textarea` autoHeight 在有文本 => 无文本时发生高度突变

### 0.2.11

> 2021-06-17

- Feature
    - `Pop` 新增 isLazyMount 配置

### 0.2.7

> 2021-06-06

- Feature
    - `Badge` 新增 color 配置

### 0.2.3

> 2021-05-22

- Feature
    - `Pop` 新增 renderMask 配置

### 0.2.0

> 2021-05-09

- Feature
    - 新增 `Collapse` 折叠组件

### 0.1.0

> 2021-05-04

- Feature
    - `Input`、`Textarea` 新增 clipEndEditing 配置

### 0.0.9

> 2021-05-04

- Feature
    - 依赖 `@kealm/react-hooks`
    - 新增导出 `useStyles`, `useStyleTools`

### 0.0.5

> 2021-04-23

- Bug Fix
    - 修复 `Pop` 类组件函数式调用在页面后退后无效

### 0.0.4

> 2021-04-21

- Bug Fix
    - 修复 vivo Y70s `PickerView` 滚动即置底

### 0.0.3

> 2021-04-20

- Bug Fix
    - 修复 `PickerView` Android 无法滚动

### 0.0.2

> 2021-04-19

- Feature
    - 发布 `@kealm/rn-components`

- Bug Fix
    - 修复图片缺失
