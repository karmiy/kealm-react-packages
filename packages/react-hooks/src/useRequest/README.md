---
phone: false
group:
  title: Async
  path: /async
  order: 4
---

# useRequest

```tsx
/**
 * inline: true
 */
import React from 'react';
import { SupportTag } from '@kealm/react-packages';

export default () => <SupportTag />;
```

对异步请求行为进行统一管理

## 代码演示

### 初始自动请求

<code 
  src='./demos/demo-initial.tsx'
  description='useRequest 第一个参数接收一个异步请求函数，默认在初始化时自动执行，同时自动管理请求状态 `data`、`error`、`loading` 并返回'
 />

### 手动请求

<code 
  src='./demos/demo-run.tsx'
  description='当不希望 useRequest 在初始自动请求时，可以将 `initialRequest` 设置为 `false`，并使用 `run` 方法在需要时手动执行'
 />

### Deps 自请求

<code 
  src='./demos/demo-deps.tsx'
  description='我们或许期望在某些数据变更时可以自动请求，配置 `deps` 即可达到这个效果'
 />

### 取消请求

<code 
  src='./demos/demo-cancel.tsx'
  description='或许在某些场景，我们需要中断本次请求，这时可以调用 `cancel` 方法进行中断'
 />

### 依赖请求

<code 
  src='./demos/demo-ready.tsx'
  description='某些场景下，请求之间是存在先后关联的，即后一个请求需要等待前一个请求数据返回才开始请求，这时可以为后者配置 `ready` 参数，只有当 `ready` 置为 `true` 时，才会发起初始请求'
 />

### 防抖

<code 
  src='./demos/demo-debounce.tsx'
  description='配置 `debounceInterval` 即可在连续请求行为进行防抖处理'
 />

### 节流

<code 
  src='./demos/demo-throttle.tsx'
  description='配置 `throttleInterval` 即可在连续请求行为进行节流处理'
 />

### 请求超时

<code 
  src='./demos/demo-timeout.tsx'
  description='配置 `timeout` 指定请求超时时限，超时后，将抛出 `{ code: 408, message: "请求超时" }` 的错误。本例中请求时长为 `2000ms`，当选择超时时限为 `1500ms` 时将会请求超时'
 />

### 失败重试

<code 
  src='./demos/demo-retry.tsx'
  description='配置 `retryTimes` 指定请求失败后的重试次数，还可以指定 `retryInterval` 控制 2 次重试的间隔时长'
 />

### 轮询

<code 
  src='./demos/demo-polling.tsx'
  description='配置 `pollingInterval` 可以指定 useRequest 轮询请求的间隔，本例中每次 `3s` 进行一次轮询请求'
 />

### Loading Delay

<code 
  src='./demos/demo-loading-delay.tsx'
  description='当请求接口响应迅捷时，`loading` 过渡动画将出现闪烁问题，这并不是我们所期望的，这时配置 `loadingDelay` 推迟 `loading` 置为 `true` 的时间或许是更好的选择'
 />

### Loading Duration

<code 
  src='./demos/demo-loading-duration.tsx'
  description='当请求接口响应迅捷时，`loading` 过渡动画将出现闪烁问题，或许在某些场景下，我们更希望 `loading` 可以有一个兜底时长，而不是那么快速的重置为 `false`，这时配置 `loadingDuration` 推迟 `loading` 置为 `false` 的时间可以满足这个效果'
 />

### Cache SWR

<code 
  src='./demos/demo-swr.tsx'
  description='配置 `cacheKey` 即可开启 `SWR`：useRequest 将会把请求后的数据全局缓存起来，下次同一个 `cacheKey` 的请求将立即获取缓存数据，并在背后发起新请求。可以通过指定 `cacheTime` 来设置缓存时长，也可以指定 `staleTime` 保鲜时间阻止发起新请求（如缓存开始时间在 12:00，某 useRequest 的 staleTime 为 10min，那么在 12:10 之前进行初始请求，只会立即获取缓存数据，而不会在背后发起新请求）'
 />

 ```tsx
/**
 * inline: true
 */
import React from 'react';
import { Blockquote } from '@kealm/react-packages';

export default () => (
  <Blockquote title='TIP'>
      <div>1、cache 只会缓存 fetchService 返回的数据，而不会缓存 formatter 后的数据</div>
      <div>2、立即获取缓存数据，只在 useRequest 初始化时有效，后续手动 run 与 deps 的响应请求都不会取缓存中的数据</div>
  </Blockquote>
);
 ```

### 请求组

<code 
  src='./demos/demo-fetch-group.tsx'
  description='在某些场景中，页面多处组件内部都需要在 **同一时间** 请求 **同一个接口**（如页面初始化时）来获取各自所需的内容，这时将请求置于各组件内独立管理难免会导致同一时间发起多个相同的请求，但同时又不期望把请求被动的提取至父组件进行统一管理，这时不妨配置 `fetchGroup` 指定请求组。同一个 `fetchGroup` 组内的请求在同一时间只会发起一次请求，并共享它'
 />

### Mutate 突变

<code 
  src='./demos/demo-mutate.tsx'
  description='可以通过 `mutate` 直接修改 `data` 的值，通常用于已知接口返回内容，在请求同时先行更新数据来达到快速响应，消除请求等待时间的效果。`mutate` 的参数可以是 `data`，也可以是函数 `(currentData) =&gt; nextData`'
 />

### Formatter

<code 
  src='./demos/demo-formatter.tsx'
  description='当接口返回的数据不满足要求时，可以通过 `formatter` 对返回的 `data` 进行格式化处理'
 />

### beforeRequest

<code 
  src='./demos/demo-before-request.tsx'
  description='当请求前需要校验某些行为时，可以通过 `beforeRequest` 进行处理，`beforeRequest` 会返回 `Promise`，当值为 `false` 时将阻止 useRequest 的请求执行'
 />

## 全局配置

useRequest 提供了 `RequestConfigProvider` 允许全局配置部分 `options`，目前支持的全局配置：

- `initialRequest`
- `onSuccess`
- `onError`
- `debounceInterval`
- `throttleInterval`
- `timeout`
- `retryTimes`
- `retryInterval`
- `pollingInterval`
- `loadingDelay`
- `loadingDuration`
- `beforeRequest`

<code 
  src='./demos/demo-global.tsx'
  description='本例中全局配置初始自动请求 `initialRequest` 为 `false`，并提供默认 `onSuccess`'
 />

## API

```ts
interface FetchService<T, P extends any[]> {
    (...params: P): Promise<T>;
}

interface Options<T, P extends any[]> {
    initialRequest?: boolean;
    ready?: boolean;
    deps?: DependencyList;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    params?: P extends [] ? undefined : P extends [infer A] ? A | P : P;
    debounceInterval?: number;
    throttleInterval?: number;
    timeout?: number;
    retryTimes?: number;
    retryInterval?: number;
    pollingInterval?: number;
    loadingDelay?: number;
    loadingDuration?: number;
    cacheKey?: string;
    cacheTime?: number;
    staleTime?: number;
    fetchGroup?: string;
	formatter: (data: T) => any;
    beforeRequest?: (...params: P) => Promise<boolean>;
}

const {
    data,
    error,
    loading,
    run,
    mutate,
    cancel
} = useRequest<T, P extends any[]>(
    fetchService: FetchService<T, P>, 
    options?: Options
);
```

### Params

| 参数 | 说明               | 类型         | 默认值 |
|------|--------------------|--------------|--------|
| fetchService | fetch 方法，useRequest 将在请求时调用 | `FetchService` | -- |
| options | 配置项，见下小节 | `Options` | -- |

### Options

| 参数             | 说明                                                         | 类型                   | 默认值   |
| ---------------- | ------------------------------------------------------------ | ---------------------- | -------- |
| initialRequest   | 初始化时是否自动请求                                         | `boolean`              | `true`   |
| ready            | 是否准备完毕，在 ready 前不会自动请求，通常用于依赖请求      | `boolean`              | `true`   |
| deps             | 依赖请求，类似 `useEffect` 的 deps，当依赖变化时将会自动发起请求 | `DependencyList`       | --       |
| onSuccess        | 请求成功后回调                                               | `(data: T) => void`    | --       |
| onError          | 请求失败后回调                                               | `(error: any) => void` | --       |
| params           | 请求参数，会被带入初始请求与 deps 请求，不会作为手动 run 的请求参数，根据 fetchService 的参数适应。例如 fetchService 只有一个参数 (id: number) 时，可以是 params: [id] 或 params: id，多个参数时只能是数组结构 | `Array<P> \| P`        | --       |
| debounceInterval | 请求防抖间隔                                                 | `number`               | --       |
| throttleInterval | 请求节流间隔                                                 | `number`               | --       |
| timeout          | 超时时限                                                     | `number`               | --       |
| retryTimes       | 失败重试次数                                                 | `number`               | --       |
| retryInterval    | 失败重试时，每次请求的间隔时长                               | `number`               | --       |
| pollingInterval  | 轮询请求间隔                                                 | `number`               | --       |
| loadingDelay     | loading 置为 `true` 的延迟时长，常用于防 loading 闪烁问题    | `number`               | --       |
| loadingDuration  | loading 置为 `false` 的兜底时长，防 loading 闪烁的另一种方式 | `number`               | --       |
| cacheKey         | 缓存唯一标识，同一个 cacheKey 下的初始请求将会立即响应缓存数据 | `string`               | --       |
| cacheTime        | 缓存时长，标识着缓存有效期，默认 5 分钟                      | `number`               | `300000` |
| staleTime        | 保鲜时长，控制初始请求立即响应缓存数据后，是否还会在背后发起请求。如缓存开始时间在 12:00，某 useRequest 的 staleTime 为 10min，那么在 12:10 之前进行初始请求，只会立即获取缓存数据，而不会在背后发起新请求 | `number`               | `0`      |
| fetchGroup       | 请求组标识，同一个请求组，在同一个时间发起的多个请求，只会发起一次，其他请求都会共享这次请求响应 | `string`               | --       |
| beforeRequest    | 请求发起拦截，控制是否允许 useRequest 发起请求，需要返回 `Promise`，返回值的 `boolean` 类型象征着是否允许 | `Promise<boolean>`     | --       |
| formatter        | 格式化方法，对请求返回的 data 进行格式化处理                 | `(data: T) => any`     | --       |

### Return

| 参数    | 说明                 | 类型                                            | 默认值 |
| ------- | -------------------- | ----------------------------------------------- | ------ |
| data    | 请求返回的数据       | `T`                                             | --     |
| error   | 请求异常的数据       | `any`                                           | --     |
| loading | 是否正在请求中       | `boolean`                                       | --     |
| run     | 手动发起请求的方法   | `(...params: P) => Promise<T>`                  | --     |
| mutate  | 手动更新当前 data 值 | `(value: T \| ((currentData: T) => T)) => void` | --     |
| cancel  | 手动取消本地请求     | `() => void`                                    | --     |

