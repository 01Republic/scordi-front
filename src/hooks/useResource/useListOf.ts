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
        add,
        remove,
        clearList,
        reset,
    };
}
