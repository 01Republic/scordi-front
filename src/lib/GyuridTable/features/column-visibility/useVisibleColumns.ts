import {Dispatch, SetStateAction, useCallback} from 'react';
import {ColumnDef} from '^lib/GyuridTable';

interface UseVisibleColumnsOption {
    //
}

/**
 * 테이블 열 정의들의 가시성(hide) 상태를 관리하는 훅을 반환한다.
 *
 * columnDefs 배열의 각 ColumnDef 객체의 `hide` 플래그를 변경하여 열을 숨기거나 보이게 한다.
 * 반환된 헬퍼는 단일 열의 표시 토글, 특정 값으로 설정, 모든 열에 대한 일괄 설정 및
 * 주어진 columnDefs에서 보이는/숨겨진 열들을 필터링하는 유틸을 제공한다.
 *
 * 변경은 불변(immutable) 방식으로 이루어지며, 내부적으로 각 컬럼을 얕게 복사한 뒤 `hide`를 갱신한다.
 *
 * @param columnDefs - 현재의 열 정의 배열; getVisibles/getInVisibles에 전달해 필터링할 수 있다.
 * @param setColumnDefs - 열 정의 상태를 갱신하는 React 상태 설정자.
 * @param option - 현재 사용되지 않는 옵션 객체(향후 확장을 위해 남겨둠).
 *
 * @returns 객체:
 * - getVisibles(columnDefs): 주어진 컬럼에서 `hide !== true`인(보이는) 컬럼 배열을 반환한다.
 * - getInVisibles(columnDefs): 주어진 컬럼에서 `hide === true`인(숨겨진) 컬럼 배열을 반환한다.
 * - showColumn(field): 지정한 필드의 컬럼을 보이게 설정한다.
 * - hideColumn(field): 지정한 필드의 컬럼을 숨긴다.
 * - showAllColumns(): 모든 컬럼을 보이게 설정한다.
 * - hideAllColumns(): 모든 컬럼을 숨긴다.
 * - toggleVisible(field): 지정한 필드의 컬럼 `hide` 값을 토글한다.
 */
export function useVisibleColumns(
    columnDefs: ColumnDef<any>[],
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<any>[]>>,
    option: UseVisibleColumnsOption = {},
) {
    // const [originalColumnDefs, setOriginalColumnDefs] = useState(columnDefs);

    const setColumn = useCallback(
        (field: string, hide?: boolean) => {
            setColumnDefs((columns) => {
                return columns.map((column) => {
                    const col = {...column};
                    if (column.field === field) {
                        // hide 값이 주어지면, 주어진 값으로 지정하고
                        // hide 값이 주어지지 않으면, 기존 값을 반전시킨다.
                        col.hide = typeof hide === 'boolean' ? hide : !column.hide;
                    }
                    return col;
                });
            });
        },
        [setColumnDefs],
    );

    const setAllColumns = useCallback(
        (hide: boolean) => {
            setColumnDefs((cols) => {
                return cols.map((c) => ({...c, hide}));
            });
        },
        [setColumnDefs],
    );

    const getVisibles = useCallback(<T>(columnDefs: ColumnDef<T>[]) => {
        return columnDefs.filter((col) => !col.hide);
    }, []);

    const getInVisibles = useCallback(<T>(columnDefs: ColumnDef<T>[]) => {
        return columnDefs.filter((col) => col.hide);
    }, []);

    return {
        getVisibles,
        getInVisibles,
        showColumn: (field: string) => setColumn(field, false),
        hideColumn: (field: string) => setColumn(field, true),
        showAllColumns: () => setAllColumns(false),
        hideAllColumns: () => setAllColumns(true),
        toggleVisible: (field: string) => setColumn(field),
    };
}
