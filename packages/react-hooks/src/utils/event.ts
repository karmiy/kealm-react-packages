import { emptyObj } from './base';

interface ListenerItem {
    fn: Function;
    once: boolean;
}

interface listenerOptions {
    immediatelySyncCache?: boolean;
}

export class EventEmitter {
    private listeners: Record<string, Array<ListenerItem> | undefined> = Object.create(null);

    private payloads: Record<string, Array<any> | undefined> = Object.create(null);

    private subscribeListener(eventName: string, listener: Function, once = false) {
        const eventListeners = this.listeners[eventName];

        const listenerItem = {
            fn: listener,
            once,
        };

        if (!eventListeners) {
            this.listeners[eventName] = [listenerItem];
            return;
        }
        eventListeners.push(listenerItem);
    }

    private unsubscribeListener(eventName: string, listener?: Function) {
        const eventListeners = this.listeners[eventName];

        if (!eventListeners) return;

        // 没有传 listener 取消所有订阅
        if (!listener) {
            delete this.listeners[eventName];
            return;
        }

        const index = eventListeners.findIndex(item => item.fn === listener);
        if (index === -1) return;

        eventListeners.splice(index, 1);
    }

    public on(eventName: string, listener: Function, options: listenerOptions = emptyObj) {
        const { immediatelySyncCache = true } = options;

        if (immediatelySyncCache) {
            const payload = this.payloads[eventName];
            if (payload) {
                listener(...payload);
            }
        }
        this.subscribeListener(eventName, listener);
    }

    public once(eventName: string, listener: Function, options: listenerOptions = emptyObj) {
        const { immediatelySyncCache = true } = options;

        if (immediatelySyncCache) {
            const payload = this.payloads[eventName];
            if (payload) {
                // 响应了则不订阅
                listener(...payload);
                return;
            }
        }
        this.subscribeListener(eventName, listener, true);
    }

    public off(eventName: string, listener?: Function) {
        this.unsubscribeListener(eventName, listener);
    }

    public emit(eventName: string, ...params: Array<any>) {
        const eventListeners = this.listeners[eventName];

        // 先缓存数据，后续订阅的也派发
        this.payloads[eventName] = params;
        // 派发监听
        const _eventListeners = eventListeners?.filter(listener => {
            listener.fn(...params);
            return !listener.once;
        });
        _eventListeners && (this.listeners[eventName] = _eventListeners);
    }

    public getPayload(eventName: string) {
        return this.payloads[eventName];
    }

    public removePayload(eventName: string) {
        delete this.payloads[eventName];
    }
}

export const eventEmitter = new EventEmitter();
