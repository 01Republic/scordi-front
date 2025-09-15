import {useEffect, useState} from 'react';
import {SortedColumnInterface} from './SortedColumn.interface';

interface UseSortColumnsOption {
    initialStates: SortedColumnInterface[];
    onChange: (column: SortedColumnInterface) => void;
}

/**
 * 컬럼 정렬 상태를 관리하는 React 훅.
 *
 * 초기 정렬 상태(initialStates)로 내부 상태를 초기화하고, 상태 변경 시 onChange 콜백을 호출합니다.
 * onSort을 호출하면 내부 정렬 상태를 단일 항목 배열로 설정합니다(기존 정렬은 대체).
 *
 * 자세한 동작:
 * - sortedColumns 상태가 변경될 때마다 onChange에 현재 활성 정렬(배열의 첫 요소)을 전달합니다.
 *   활성 정렬이 없으면 initialStates[0]를 대신 전달합니다. 둘 다 없는 경우 undefined가 전달될 수 있습니다.
 * - onSort(field, sortVal, sortKey?)는 sortedColumns를 [{ field, sortKey: sortKey ?? field, sortVal }]로 설정합니다.
 *
 * @returns 객체:
 * - sortedColumns: 현재 정렬 상태 배열
 * - setSortedColumns: 정렬 상태를 직접 설정하는 상태 업데이트 함수
 * - onSort: 특정 필드로 정렬을 적용하는 유틸리티 함수
 */
export function useSortColumns(option: UseSortColumnsOption) {
    const {initialStates, onChange} = option;
    const [sortedColumns, setSortedColumns] = useState(initialStates);

    useEffect(() => {
        onChange(sortedColumns[0] || initialStates[0]);
    }, [sortedColumns]);

    const onSort = (field: string, sortVal: 'ASC' | 'DESC', sortKey?: string) => {
        setSortedColumns([{field, sortKey: sortKey || field, sortVal}]);
    };

    return {
        sortedColumns,
        setSortedColumns,
        onSort,
    };
}
