import { useContext } from 'react';
import { useDidMount } from '../useDidMount';
import { useDidUpdate } from '../useDidUpdate';
import { useGetSetRef } from '../useGetSetRef';
import { useInterval } from '../useInterval';
import { usePersistFn } from '../usePersistFn';
import { usePrevious } from '../usePrevious';
import { useSetState } from '../useSetState';
import { useWillUnMount } from '../useWillUnMount';
import { emptyArr, isArray, isFunction, noop } from '../utils/base';
import { RequestConfigContext } from './context';
import { Fetcher } from './fetcher';
import {
    BaseOptions,
    FetcherState,
    FetchService,
    Options,
    OptionsWithFormatter,
    Result,
} from './types';
import { getCache, isDepsChanged, setCache } from './utils';

function useRequest<T, P extends any[], U, UU extends U = any>(
    fetchService: FetchService<T, P>,
    options: OptionsWithFormatter<T, P, U, UU>,
): Result<U, P>;
function useRequest<T, P extends any[]>(
    fetchService: FetchService<T, P>,
    options?: BaseOptions<T, P>,
): Result<T, P>;
function useRequest<T, P extends any[], U, UU extends U = any>(
    fetchService: FetchService<T, P>,
    options?: Options<T, P, U, UU>,
): Result<U, P> {
    const contextConfig = useContext(RequestConfigContext);
    const _options = { ...contextConfig, ...options } as Options<T, P, U, UU>;

    const {
        initialRequest = true,
        ready = true,
        deps = emptyArr,
        params,
        onSuccess,
        onError,
        debounceInterval,
        throttleInterval,
        timeout,
        retryTimes,
        retryInterval,
        pollingInterval,
        loadingDelay,
        loadingDuration,
        cacheKey,
        cacheTime = 1000 * 60 * 5, // 5 分钟缓存
        staleTime = 0,
        fetchGroup,
        beforeRequest,
    } = _options;

    const formatter = usePersistFn((data: T) => {
        let _formatter: OptionsWithFormatter<T, P, U, UU>['formatter'] | undefined;
        if ('formatter' in _options) {
            _formatter = _options.formatter;
            return _formatter(data);
        }
        return data as any as U;
    });

    const [currentState, setCurrentState] = useSetState<FetcherState<U>>(() => {
        // 有缓存取缓存
        if (cacheKey) {
            const cacheData = getCache(cacheKey)?.data;

            if (cacheData) {
                return {
                    data: formatter(cacheData),
                    loading: false,
                };
            }
        }
        return {
            loading: ready && initialRequest && !loadingDelay,
        };
    });

    const [getFetcher, setFetcher] = useGetSetRef<Fetcher<U, P>>();

    const subscribe = usePersistFn((state: FetcherState<U>) => {
        setCurrentState(state);
    });

    const runFetchService = usePersistFn((...args: P) => fetchService(...args));
    const runOnSuccess = usePersistFn((res: { original: T; prettier: U }) => {
        onSuccess?.(res.prettier as T & UU);
        // set cache
        if (cacheKey) setCache(cacheKey, cacheTime, res.original);
    });
    const runOnError = usePersistFn((error: any) => {
        onError?.(error);
    });

    const run = usePersistFn(async (..._params: P) => {
        if (!ready) return new Promise<U>(noop);

        const isNext = await (beforeRequest?.(..._params) ?? Promise.resolve(true));
        if (!isNext) return new Promise<U>(noop);

        // get/create fetcher
        let currentFetcher = getFetcher();

        if (!currentFetcher) {
            currentFetcher = new Fetcher(runFetchService as any as FetchService<U, P>, subscribe, {
                debounceInterval,
                throttleInterval,
                timeout,
                retryTimes,
                retryInterval,
                formatter,
                loadingDelay,
                loadingDuration,
                fetchGroup,
                onSuccess: runOnSuccess,
                onError: runOnError,
            });
            setFetcher(currentFetcher);
        }

        return currentFetcher.run(..._params);
        /* const [_data, _err] = await asyncWrapper(currentFetcher.run(..._params));

        if (_err) {
            const _error = _err.res;
            onError?.(_error);
            return Promise.reject(_error);
        }

        onSuccess?.(_data as T & UU);

        return _data as T & UU; */
    });

    const toRun = (isInitialReq = false) => {
        // 初始请求看缓存保鲜期
        if (isInitialReq) {
            if (cacheKey) {
                const cache = getCache(cacheKey);
                const cacheData = cache?.data;
                const cacheStartTime = cache?.startTime || 0;

                if (
                    cacheData &&
                    (staleTime === -1 || new Date().getTime() - cacheStartTime <= staleTime)
                ) {
                    return;
                }
            }
        }

        // toRun 自动请求，捕获 catch
        run(...((isArray(params) ? params : [params]) as P)).catch(noop);
    };

    const mutate = usePersistFn(
        (mutateData: ((currentData: U | undefined) => U | undefined) | U | undefined) => {
            setCurrentState(prevState => ({
                data: isFunction(mutateData) ? mutateData(prevState.data) : mutateData,
            }));
        },
    );

    const cancel = usePersistFn(() => {
        getFetcher()?.unmount();
        // setCurrentState({ loading: false });
    });

    /* ------------------------------ BLOCK: initial request ------------------------------ */
    const [getIsPendingInitialReq, setIsPendingInitialReq] = useGetSetRef(false);

    useDidMount(() => {
        if (!initialRequest) return;

        // 如果初始请求时尚未 ready，先记录一下等后续初次 ready 后请求
        if (!ready) return setIsPendingInitialReq(true);

        return toRun(true);
    });

    /* ------------------------------ BLOCK: deps request ------------------------------ */
    const prevDeps = usePrevious(deps);
    const prevReady = usePrevious(ready);

    useDidUpdate(() => {
        // ready false => true，存在 pending 初始 request 则做初始请求
        if (!prevReady && ready && getIsPendingInitialReq()) {
            setIsPendingInitialReq(false);
            toRun(true);
            return;
        }
        isDepsChanged(prevDeps, deps) && toRun();
    }, [...deps, ready]);

    /* ------------------------------ BLOCK: options update ------------------------------ */
    useDidUpdate(() => {
        const fetcher = getFetcher();
        fetcher?.setOptions({
            debounceInterval,
            throttleInterval,
            timeout,
            retryTimes,
            retryInterval,
            formatter,
            loadingDelay,
            loadingDuration,
            fetchGroup,
        });
    }, [
        debounceInterval,
        throttleInterval,
        timeout,
        retryTimes,
        retryInterval,
        formatter,
        loadingDelay,
        loadingDuration,
        fetchGroup,
    ]);

    /* ------------------------------ BLOCK: loop ------------------------------ */
    useInterval(toRun, pollingInterval ? pollingInterval : null, false, [pollingInterval]);

    /* ------------------------------ BLOCK: unmount ------------------------------ */
    useWillUnMount(() => {
        const fetcher = getFetcher();
        fetcher?.unmount();
    });

    return {
        run,
        mutate,
        cancel,
        ...currentState,
    } as Result<U, P>;
}

export { useRequest };

export * from './types';
export * from './context';
