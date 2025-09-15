import {useCallback, useState} from 'react';
import {isDefinedValue} from '^utils/array';

export function useRowCheckbox<T>() {
    const headerCheckboxSelector = '.gyurid-header-checkbox';
    const rowCheckboxSelector = '.gyurid-row-checkbox';
    const [_, setFlag] = useState(0);

    const getHeaderCheckbox = useCallback(() => {
        return document.querySelector(headerCheckboxSelector) as HTMLInputElement;
    }, []);

    const getCheckboxList = useCallback((selector: string) => {
        return Array.from(document.querySelectorAll(selector)) as HTMLInputElement[];
    }, []);

    // 체크박스 모두 변경하기
    const changeCheckboxAll = useCallback((checked: boolean) => {
        const checkboxList = getCheckboxList(rowCheckboxSelector);
        checkboxList.forEach((checkbox) => {
            checkbox.checked = checked;
        });
        setFlag((v) => v + 1);
    }, []);

    // 체크박스 한개 변경하기
    const changeCheckbox = useCallback((idx: number, checked: boolean) => {
        const checkboxList = getCheckboxList(rowCheckboxSelector);
        checkboxList[idx].checked = checked;

        const headerCheckbox = getHeaderCheckbox();
        const allChecked = checkboxList.every((c) => c.checked);
        const hasChecked = checkboxList.some((c) => c.checked);

        headerCheckbox.checked = allChecked;
        headerCheckbox.indeterminate = hasChecked && !allChecked;
        setFlag((v) => v + 1);
    }, []);

    // 체크된 엔트리 모두 가져오기
    const getAllCheckedEntries = useCallback((entries: T[]) => {
        const checkboxList = getCheckboxList(rowCheckboxSelector);
        return checkboxList
            .map((checkbox, i) => {
                return checkbox.checked ? entries[i] : undefined;
            })
            .filter(isDefinedValue);
    }, []);

    return {
        getAllCheckedEntries,
        changeCheckboxAll,
        changeCheckbox,
    };
}
