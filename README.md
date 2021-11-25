# @kealm 公共模块

## 入库原则

将一个**组件 / hooks**提取至该仓库，需：

- 纯公共（不包含任何业务逻辑、客户端协议）

- 组件 UI 具备定性，如 `Tab` 选项卡，各个需求的展示效果都不一致，不统一，不适合抽离到该库，更适合作为不含主 UI 的抽象组件或逻辑 hooks 化

- 考虑的足够远（不仅考虑到本次需求需要达到的功能，还要考虑自己能力范畴下能衍生到的高度）

- 组件始终 H5 和 RN 两边同步，而非只实现了一端就发布（优势除了同步，还在于 H5 和 RN 双向思考，可以在设计上达到更好的契合度）

## 如何抽象组件设计

一个组件，先从其行为思考，是否可抽离行为，若有，从基础行为组件开始封装，为后续更多组件做铺垫

例如：`Dialog`、`ActionSheet`、`Toast` 等都有弹框打开收起的行为，将此行为抽象为 `Pop`，从 `Pop` 做第一层封装组件

## 如何设计组件 API

1、任何组件，应该都包含自己的核心节点，如 `Input`，在 H5 是 input 节点，RN 是 TextInput，那么 H5 的 props 应该继承 `React.InputHTMLAttributes<HTMLInputElement>`，RN 的 props 应该继承 `TextInputProps`。若没有核心节点，则继承根节点的 props，如根节点是 div，应该是 `React.HTMLAttributes<HTMLDivElement>`

2、样式，H5 应该包含 class、style（通常在上一步的继承的 props 里已经带上了，不需要额外写），RN 应该包含 styles

3、继承基础组件的 props，如 `Drawer` 是基于 `Pop` 实现，应该继承 `PopProps`，若一个组件同时基于 2 个组件实现，如 `DatePicker` 基于 `DatePickerView` + `Drawer`，可以考虑两者更侧重的那一项（`DatePickerViewProps`）作为继承的 props，另一项提供 drawerProps 的独立配置

4、基础 API，常规通用的配置，即一目了然所需要的配置，通常每个人产出的差异不大，如弹框 `Pop` 的 visible、onVisibleChange、zIndex、open/close event、duration 等，`Input` 的 defaultValue、value、onChange 等

5、扩展 API，可以把组件的设计想象成一棵树，基础 API 构成了它的枝干，每一根枝干都可以往外继续衍生，能扩展到多远需要自身考虑的细节程度与经验的积累，建议同时参考多个主流第三方组件库

如 `Pop` 组件：

- 蒙层可以衍生出：showMask、maskClosable、onMaskClick、renderMask

- 事件可以衍生出：onOpen、afterOpen、onClose、afterClose

- 性能考虑可以涉及到：先不渲染，渲染过一次后变成隐藏，并衍生出 unmountOnExit

## 设计思想

- 灵活性：API 的类型设计灵活化，遵循 ReactNode > Partial Object > Raw Type 设计 API

- 稳定性：API 的设计足够稳定，在重构组件实现时不影响 API 的结构，做到升级时使用者无感知

- 性能保证：减少无用 render，如一个数据其实作为 ref 存储即可，不需要驱动视图更新，就不应该作为一个 state

- 性能委托：不在组件内做大量性能优化（如 useMemo），将性能优化权交给使用者（不过并不完全否决组件内使用 useMemo，少许场景也可以考虑，如 `DatePickView` 的年列表，数据量较大又稳定，可以考虑使用），因为大量的 useMemo 确实提高了遇到性能瓶颈的下限，但是同样反观，在遇到性能瓶颈前，useMemo 带来的缓存不免是一种变相浪费，此外，组件的使用者可能也会自己进行 useMemo 优化，这时基层组件内的 useMemo 必要性就不是很大了

- 涵盖面广：不为了实现当下功能而实现，考虑周全，初期想得远，后续扩展功能时可能由于考虑不全重新来过的概率会降低

- 解耦：将功能逻辑尽可能的抽离为 hook，将 H5 和 RN 视为 UI 实现不同，逻辑相同的组件，这也是同步产出 H5 和 RN 组件的一个优势点，如 `Stepper` 组件的 useStepper

## 开始

仓库所有命令都在根目录进行

- 从 master 拉取 feature 分支

- npm install 安装依赖

- npm run bootstrap 安装 monorepo 依赖

- npm run dev 启动文档项目

## 更新发布包

- npm run upgrade 升级版本，选择准备发布的包进行升级

- 选择版本，提供了 3 个选项

    - 小改动（BugFix、Add Feature）升级第三位即可
    - 新增组件、hooks，升级第二位
    - 大改版升级第一位

- MR 到 master，提交到 CI 自动打包发布

> Gitlab CI 报错不用紧张，仓库下有 3 个包，如果只更新其中一个，另外 2 个在构建发布时由于版本号未变是会报错的，重点在公司 cnpm 上查看包是否更新到指定版本

## 更新发布文档

- npm run docs:build 即可，会打包并提交到 CDN 资源