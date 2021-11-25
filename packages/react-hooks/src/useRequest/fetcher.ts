import { asyncWrapper, noop } from '../utils/base';
import { FetcherOptions, FetcherState, FetcherSubscribe, FetchService, Timer } from './types';
import { createOverTimer, getFetchGroup, setFetchGroup, sleep } from './utils';

export class Fetcher<T, P extends any[]> {
    private fetchService: FetchService<T, P>;
    private subscribe: FetcherSubscribe<T>;

    // 请求时序
    private runSeries = 0;

    // 配置项
    private options: FetcherOptions<T> = {
        debounceInterval: 0,
        throttleInterval: 0,
    };

    public setOptions(options?: FetcherOptions<T>) {
        if (!options) return;

        // assignOmitEmpty(this.options, options);
        return Object.assign(this.options, options);
    }

    // 防抖
    private debounceTimer: Timer = null;
    private clearDebounceTimer() {
        if (!this.debounceTimer) return;
        clearTimeout(this.debounceTimer);
        this.debounceTimer = null;
    }

    // 节流
    private throttleTimer: Timer = null;
    private clearThrottleTimer() {
        if (!this.throttleTimer) return;

        clearTimeout(this.throttleTimer);
        this.throttleTimer = null;
    }

    // 延迟 loading
    private loadingDelayTimer: Timer = null;
    private clearLoadingDelayTimer() {
        if (!this.loadingDelayTimer) return;

        clearTimeout(this.loadingDelayTimer);
        this.loadingDelayTimer = null;
    }

    // loading 兜底时长
    private loadingDurationTimer: Timer = null;
    private clearLoadingDurationTimer() {
        if (!this.loadingDurationTimer) return;

        clearTimeout(this.loadingDurationTimer);
        this.loadingDurationTimer = null;
    }

    // 状态
    public state: FetcherState<T> = {
        loading: false,
    };

    private setState(s: Partial<FetcherState<T>>) {
        Object.assign(this.state, s);
        this.subscribe(this.state);
    }

    constructor(
        fetchService: FetchService<T, P>,
        subscribe: (state: FetcherState<T>) => void,
        options?: FetcherOptions<T>,
    ) {
        const { initialData } = options ?? {};
        Object.assign(this.state, initialData);

        this.fetchService = fetchService;
        this.subscribe = subscribe;

        // options
        this.setOptions(options);
    }

    private async request(
        params: P,
        options: {
            currentRunSeries: number;
            loopTimes?: number;
            loopInterval?: number;
            timeout?: number;
            fetchGroup?: string; // 隶属于请求组共享资源，本次请求不受 series 限制
        },
    ) {
        const { currentRunSeries, loopTimes = 1, loopInterval = 0, timeout, fetchGroup } = options;

        let data: T | null = null,
            err: { res: any } | null = null;

        for (const index in [...Array(Math.max(loopTimes, 1)).keys()]) {
            // 重试间隔
            if (+index !== 0 && loopInterval) await sleep(loopInterval);
            if (currentRunSeries !== this.runSeries && !fetchGroup) return [null, null] as const;

            // 超时
            const { isOverTime, clearTimer } = createOverTimer(timeout);
            const [_data, _err] = await asyncWrapper(this.fetchService(...params));

            // 判断是否为已废弃请求
            if (currentRunSeries !== this.runSeries && !fetchGroup) {
                clearTimer();
                return [null, null] as const;
            }

            // 判断是否超时
            if (isOverTime()) return [null, { res: { code: 408, message: '请求超时' } }] as const;

            data = _data;
            err = _err;
            // 成功一次即停止重试
            if (!_err) break;
        }
        return [data, err] as const;
    }

    private startLoading(
        currentRunSeries: number,
        loadingDelay?: number,
        loadingDuration?: number,
    ) {
        this.clearLoadingDelayTimer();
        this.clearLoadingDurationTimer();

        // loading 兜底时长
        let isCleared = false;
        const createLoadingDuration = () => {
            if (loadingDuration) {
                this.loadingDurationTimer = setTimeout(() => {
                    this.loadingDurationTimer = null;

                    if (currentRunSeries !== this.runSeries) return;

                    // loading 兜底到期时，请求尚未结束
                    if (!isCleared) return;

                    this.setState({ loading: false });
                }, loadingDuration);
            }
        };

        // 延迟 loading
        if (!loadingDelay) {
            this.setState({ loading: true });
            createLoadingDuration();
        } else {
            this.loadingDelayTimer = setTimeout(() => {
                this.loadingDelayTimer = null;

                if (currentRunSeries !== this.runSeries) return;
                this.setState({ loading: true });
                createLoadingDuration();
            }, loadingDelay);
        }

        const clearLoading = () => {
            isCleared = true;
            this.clearLoadingDelayTimer();

            if (currentRunSeries !== this.runSeries) return;

            if (!this.state.loading) return;

            // loading => false 时有 loading 兜底尚未到期
            if (this.loadingDurationTimer) return;

            this.setState({ loading: false });
        };

        return { clearLoading };
    }

    public async run(...params: P) {
        const {
            debounceInterval,
            throttleInterval,
            retryTimes,
            retryInterval,
            timeout,
            loadingDelay,
            loadingDuration,
            fetchGroup,
            formatter,
            onSuccess,
            onError,
        } = this.options;

        // 防抖
        this.clearDebounceTimer();
        if (debounceInterval) {
            await sleep(debounceInterval, timer => (this.debounceTimer = timer));
        }

        // 节流
        if (this.throttleTimer) {
            return new Promise<T>(noop);
        }
        if (throttleInterval) {
            sleep(throttleInterval, timer => {
                this.throttleTimer = timer;
            }).then(() => {
                this.throttleTimer = null;
            });
        }

        const currentRunSeries = ++this.runSeries;

        const { clearLoading } = this.startLoading(currentRunSeries, loadingDelay, loadingDuration);

        // 有 fetch group，看是否有正在进行的请求
        const toRunRequest = () =>
            this.request(params, {
                currentRunSeries,
                loopTimes: retryTimes,
                loopInterval: retryInterval,
                timeout,
                fetchGroup,
            });
        const request = fetchGroup
            ? getFetchGroup(fetchGroup) ?? setFetchGroup(fetchGroup, toRunRequest())
            : toRunRequest();
        const [data, err] = await request;

        // 判断是否为已废弃请求
        if (currentRunSeries !== this.runSeries) {
            return new Promise<T>(noop);
        }

        clearLoading();

        if (err) {
            const error = err.res;
            onError?.(error);
            this.setState({ error, data: undefined });
            return Promise.reject(error);
        }

        const _data = formatter ? formatter(data) : data;

        // onSuccess 需要在 setState 之前，因为 setState 在异步操作如 setTimeout 里执行，会导致 React 同步 render
        onSuccess?.({ original: data, prettier: _data });
        this.setState({ data: _data as T, error: undefined });

        return _data as T;
    }

    public cancel() {
        this.runSeries++;
        this.clearDebounceTimer();
        this.clearThrottleTimer();
        this.clearLoadingDelayTimer();
        this.clearLoadingDurationTimer();
        this.state.loading && this.setState({ loading: false });
    }

    public unmount() {
        this.cancel();
    }
}
