import {useState} from 'react';
import {DefaultToastOptions, Renderable, toast as toaster, ValueOrFunction} from 'react-hot-toast';

export {toaster as plainToast};

export function useToast() {
    // 이 전 실행된 토스트 알림과 같은 알림인지 확인하는 state
    const [activeIds, setActiveIds] = useState<string[]>([]);

    const active = (id: string) => setActiveIds((ids) => [...ids, id]);
    const inactive = (id: string) => setActiveIds((ids) => ids.filter((_id) => _id !== id));

    const activeScope = (id: string, logic: () => any, duration = 4000) => {
        if (activeIds.includes(id)) return;
        active(id);
        logic();
        setTimeout(() => inactive(id), duration);
    };

    const info = (msg: string, id?: string) => {
        id ||= msg;
        const duration = 4000;
        activeScope(id, () => {
            toaster(msg, {id, icon: 'ℹ️', duration});
        });
    };

    const success = (msg: string, id?: string) => {
        id ||= msg;
        const duration = 2000;
        // activeScope(id, () => toaster.success(msg, {id, duration}), 2000);
        toaster.success(msg, {id, duration});
    };

    const error = (msg: string, id?: string) => {
        id ||= msg;
        const duration = 4000;

        activeScope(id, () =>
            toaster.error(msg, {
                id,
                duration,
            }),
        );
    };

    return {
        toast: {info, success, error, basic: toaster},
    };
}

export function savingToast<T>(
    promise: Promise<T>,
    msgs: {
        loading?: Renderable;
        success?: ValueOrFunction<Renderable, T>;
        error?: ValueOrFunction<Renderable, any>;
    } = {},
    opts?: DefaultToastOptions,
) {
    const messages = {
        loading: msgs.loading || '저장하는 중',
        success: msgs.success || '저장 성공!',
        error: msgs.error || '문제가 생겨 저장하지 못했어요 :(',
    };
    return toaster.promise(promise, messages, opts);
}
