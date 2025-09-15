import {useCallback, useState} from 'react';
import {isDefinedValue} from '^utils/array';

/**
 * 테이블 행 체크박스 그룹과 헤더 체크박스를 DOM 기준으로 제어하고, 선택된 엔트리 목록을 반환하는 React 훅.
 *
 * 내부적으로 `.gyurid-row-checkbox`(각 행)와 `.gyurid-header-checkbox`(헤더)를 찾은 뒤 체크 상태를 읽고 변경하며,
 * 상태 변경 시 내부 플래그를 증가시켜 컴포넌트 리렌더를 유도합니다.
 *
 * 반환값:
 * - getAllCheckedEntries(entries: T[]): 전달한 엔트리 배열에서 체크된 행에 대응하는 요소만 추출하여 반환합니다.
 * - changeCheckboxAll(checked: boolean): 모든 행 체크박스의 checked 상태를 지정한 값으로 설정합니다.
 * - changeCheckbox(idx: number, checked: boolean): 인덱스 `idx`에 해당하는 행 체크박스의 상태를 변경하고, 헤더 체크박스의 `checked`/`indeterminate` 상태를 동기화합니다.
 *
 * 주의:
 * - 동작은 문서 내 지정된 CSS 셀렉터로 요소를 직접 조회하므로 해당 요소들이 존재한다고 가정합니다.
 */
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
