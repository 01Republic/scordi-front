import {RecoilState, useRecoilState, useResetRecoilState} from 'recoil';
import {useState} from 'react';

interface UseListOfOption<T> {
    getKey: keyof T | ((item: T) => any);
}

export const useListOf = <T>(atom: RecoilState<T[]>, option: UseListOfOption<T>) => {
    const {getKey} = option;
    const [list, setList] = useRecoilState(atom);
    const reset = useResetRecoilState(atom);

    const keyOf = (item: T) => {
        return typeof getKey === 'function' ? getKey(item) : item[getKey];
    };

    const add = (item: T) => {
        setList((prev) => [...prev, item]);
    };

    const remove = (item: T) => {
        setList((prev) => {
            return prev.filter((it) => keyOf(it) !== keyOf(item));
        });
    };

    const clearList = () => setList([]);

    return {
        list,
        add,
        remove,
        clearList,
        reset,
    };
};

export function useList<T>(initialState: T[] | (() => T[]), option: UseListOfOption<T>) {
    const {getKey} = option;
    const [list, setList] = useState(initialState);
    const reset = () => setList(initialState);

    const keyOf = (item: T) => {
        return typeof getKey === 'function' ? getKey(item) : item[getKey];
    };

    const add = (item: T) => {
        setList((prev) => [...prev, item]);
    };

    const remove = (item: T) => {
        setList((prev) => {
            return prev.filter((it) => keyOf(it) !== keyOf(item));
        });
    };

    const clearList = () => setList([]);

    return {
        list,
        setList,
        add,
        remove,
        clearList,
        reset,
    };
}

/**
 * 배열을 setState 로 다룸에 있어 필요한 추가적인 함수를 제공합니다.
 * @param setState
 * @param getKey
 */
export function useListControl<T>(setState: React.Dispatch<React.SetStateAction<T[]>>, getKey: (item: T) => any) {
    const add = (item: T) => {
        setState((prev) => {
            const existAlready = prev.find((it) => getKey(it) === getKey(item));
            return existAlready ? prev : [...prev, item];
        });
    };

    const remove = (item: T) => {
        setState((prev) => {
            return prev.filter((it) => getKey(it) !== getKey(item));
        });
    };

    return {add, remove};
}
