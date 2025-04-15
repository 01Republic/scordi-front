import {useEffect} from 'react';

interface UseEventListenerOption<K extends keyof WindowEventMap> {
    eventName: K;
    deps: any[];
    listener: (evt: WindowEventMap[K]) => any;
    enable?: boolean;

    // hooks
    beforeAdd?: () => any;
    afterAdd?: () => any;
    beforeDown?: () => any;
    afterDown?: () => any;
}

export function useEventListener<K extends keyof WindowEventMap>(option: UseEventListenerOption<K>) {
    const {eventName, deps, listener, enable = true} = option;
    const {beforeAdd, afterAdd, beforeDown, afterDown} = option;

    useEffect(() => {
        if (!enable) return;
        if (!window || typeof window !== 'object') return;

        beforeAdd && beforeAdd();
        window.addEventListener(eventName, listener);
        afterAdd && afterAdd();
        return () => {
            beforeDown && beforeDown();
            window.removeEventListener(eventName, listener);
            afterDown && afterDown();
        };
    }, deps);
}
