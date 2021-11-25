import { DependencyList } from 'react';

export type Timer = ReturnType<typeof setTimeout> | null;
// export type CacheMode = 'original' | 'prettier';

/* ------------------------------ Hook ------------------------------ */
export interface FetchService<T, P extends any[]> {
    (...params: P): Promise<T>;
}

export interface BaseOptions<T, P extends any[]> {
    initialRequest?: boolean; // 手动后初始请求
    // manual?: boolean; // 手动后初始请求、deps 无效
    ready?: boolean;
    deps?: DependencyList;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    params?: P extends [] ? undefined : P extends [infer A] ? A | P : P; // initialRequest 与 deps 自动触发时的参数
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
    // cacheGetMode?: CacheMode;
    // cacheSetMode?: CacheMode;
    fetchGroup?: string;
    beforeRequest?: (...params: P) => Promise<boolean>;
}

// 新增 UU 是为了不让 onSuccess 影响 ts 对 formatter 的推导
// 不过这样会导致 onSuccess 推导的 data 是 any
export type OptionsWithFormatter<T, P extends any[], U, UU extends U> = {
    formatter: (data: T) => U;
} & BaseOptions<UU, P>;

export type Options<T, P extends any[], U, UU extends U> =
    | BaseOptions<T, P>
    | OptionsWithFormatter<T, P, U, UU>;

export interface Result<T, P extends any[]> extends FetcherState<T> {
    run: (...params: P) => Promise<T>;
    mutate: (mutateData: T | ((currentData: T | undefined) => T | undefined) | undefined) => void;
    cancel: () => void;
}

/* ------------------------------ Context ------------------------------ */
export type GlobalRequestConfig = Pick<
    BaseOptions<any, any>,
    | 'initialRequest'
    | 'onSuccess'
    | 'onError'
    | 'debounceInterval'
    | 'throttleInterval'
    | 'timeout'
    | 'retryTimes'
    | 'retryInterval'
    | 'pollingInterval'
    | 'loadingDelay'
    | 'loadingDuration'
    | 'beforeRequest'
>;

/* ------------------------------ Fetcher ------------------------------ */
export interface FetcherState<T> {
    loading: boolean;
    data?: T;
    error?: any;
}

export interface FetcherOptions<T> {
    initialData?: Partial<FetcherState<T>>;
    throttleInterval?: number;
    debounceInterval?: number;
    timeout?: number;
    retryTimes?: number;
    retryInterval?: number;
    formatter?: (data: any) => T; // TODO: class 无法重载，如何实现多种行为
    loadingDelay?: number;
    loadingDuration?: number;
    fetchGroup?: string;
    onSuccess?: (res: { original: any; prettier: T }) => void;
    onError?: (error: any) => void;
}

export interface FetcherSubscribe<T> {
    (state: FetcherState<T>): void;
}
