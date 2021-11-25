import { DependencyList } from 'react';
import { isEmpty } from '../utils/base';
import { Timer } from './types';

export const isDepsChanged = (prevDeps?: DependencyList, currentDeps?: DependencyList) => {
    if (prevDeps?.length !== currentDeps?.length) return true;

    return !!currentDeps?.some((item, index) => item !== prevDeps?.[index]);
};

export const sleep = (
    duration = 1000,
    getTimer?: (timer: ReturnType<typeof setTimeout>) => void,
) => {
    return new Promise(r => {
        const timer = setTimeout(r, duration);
        getTimer?.(timer);
    });
};

/**
 * @description 合并对象，且过滤掉合并方的空值
 * @param a
 * @param b
 * @returns
 */
export const assignOmitEmpty = <T extends object, U extends object>(a: T, b: U): T & U => {
    const _b = {} as U;
    for (const k in b) {
        const v = b[k];
        if (isEmpty(v)) continue;

        _b[k] = v;
    }

    return Object.assign(a, _b);
};

/**
 * @description 计时器 - 超时
 * @param timeout
 * @returns
 */
export const createOverTimer = (timeout?: number) => {
    let overTimer: Timer = null;
    if (timeout) {
        // 超时后置 null，即 null 代表超时
        overTimer = setTimeout(() => (overTimer = null), timeout);
    }

    const isOverTime = () => timeout && !overTimer;
    const clearTimer = () => overTimer && clearTimeout(overTimer);
    return { isOverTime, clearTimer };
};

const cache: Record<string, { data: any; timer: Timer; startTime: number }> = {};

export const setCache = (key: string, cacheTime: number, data: any) => {
    const currentCache = cache[key];
    if (currentCache?.timer) {
        clearTimeout(currentCache.timer);
    }

    let timer: Timer = null;

    if (cacheTime > -1) {
        // 数据在不活跃 cacheTime 后，删除掉
        timer = setTimeout(() => {
            delete cache[key];
        }, cacheTime);
    }

    cache[key] = {
        data,
        timer,
        startTime: new Date().getTime(),
    };
};

export const getCache = (key: string) => {
    const currentCache = cache[key];
    return {
        data: currentCache?.data,
        startTime: currentCache?.startTime,
    };
};

const fetchGroups: Record<string, Promise<any>> = {};

const removeFetchGroup = (key: string) => {
    delete fetchGroups[key];
};

export const setFetchGroup = (key: string, fetch: Promise<any>) => {
    // 存储的是 Fetcher.request，始终是 resolve
    fetch = fetch.then(([data, err]) => {
        removeFetchGroup(key);
        return [data, err];
    });
    fetchGroups[key] = fetch;
    return fetch;
};

export const getFetchGroup = (key: string) => {
    return fetchGroups[key];
};
