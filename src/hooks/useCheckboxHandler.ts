import {useCallback, useState} from 'react';
import {useList} from '^hooks/useResource';

export type CheckboxHandler<T> = {
    init: (items: T[]) => void;
    append: (items: T[]) => void;
    checkOne: (item: T, checked: boolean) => void;
    checkAll: (checked: boolean) => void;
    isChecked: (item: T) => boolean;
    isCheckedAll: () => boolean;
    checkedItems: T[];
    isEmpty: boolean;
};

export const useCheckboxHandler = <T, V = any>(
    initialState: T[] | (() => T[]),
    getKey: (item: T) => V,
): CheckboxHandler<T> => {
    const {list: items, setList: setItems, add: addItems} = useList<T, V>([], {getKey});
    const {
        list: checkedItems,
        setList: setCheckedItems,
        add,
        remove,
        clearList,
        reset,
    } = useList(initialState, {getKey});

    const checkOne = useCallback((item: T, checked: boolean) => (checked ? add(item) : remove(item)), [add, remove]);
    const checkAll = useCallback((checked: boolean) => setCheckedItems(checked ? items : []), [items]);

    const isChecked = useCallback(
        (item: T) => checkedItems.some((i) => getKey(i) === getKey(item)),
        [checkedItems, getKey],
    );
    const isCheckedAll = useCallback(() => checkedItems.length === items.length, [checkedItems, items]);

    const init = (data: T[]) => {
        setItems(data);
        clearList();
    };

    const append = (data: T[]) => {
        addItems(...data);
    };

    return {
        init,
        append,
        checkOne,
        checkAll,
        isChecked,
        isCheckedAll,
        checkedItems,
        isEmpty: checkedItems.length === 0,
    };
};
