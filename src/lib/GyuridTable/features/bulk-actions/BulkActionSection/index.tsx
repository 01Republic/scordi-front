import {Dispatch, SetStateAction} from 'react';
import {ListFilter} from 'lucide-react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {VisibleColumnListControl} from '^lib/GyuridTable/features/column-visibility';
import {SortableColumnListControl} from '^lib/GyuridTable/features/sortable';
import {SearchControl} from '^lib/GyuridTable/features/searchable';
import {IconButton} from '^lib/GyuridTable/ui';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    onSearch?: (value: string) => any;
}

/**
 * 테이블의 일괄 작업 컨트롤(필터, 정렬, 검색, 열 표시)을 가로로 배치해 렌더링하는 제네릭 React 컴포넌트입니다.
 *
 * 전달된 props에 따라 정렬 가능한 열 컨트롤과 검색 컨트롤을 조건부로 표시하며, 항상 열 가시성 설정 컨트롤을 포함합니다.
 *
 * @param props - 컴포넌트 동작을 제어하는 속성들:
 *   - columnDefs: 렌더링할 컬럼 정의 목록
 *   - setColumnDefs: 컬럼 정의 배열을 갱신하는 상태 설정 함수
 *   - sortedColumns?: 현재 정렬 상태(있을 경우 정렬 컨트롤이 표시됨)
 *   - setSortedColumns?: 정렬 상태를 갱신하는 함수(있을 경우 정렬 컨트롤이 표시됨)
 *   - onSearch?: 검색어 변경 시 호출되는 핸들러(있을 경우 검색 컨트롤이 표시됨)
 *
 * @returns 테이블 상단의 일괄 액션 UI를 표현하는 JSX 요소
 */
export function BulkActionSection<T>(props: Props<T>) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                <IconButton Icon={() => <ListFilter fontSize={14} />} name="필터" onClick={() => 1} />
                {props.setSortedColumns && (
                    <SortableColumnListControl {...props} setSortedColumns={props.setSortedColumns} />
                )}
                {props.onSearch && <SearchControl onSearch={props.onSearch} />}
                <VisibleColumnListControl {...props} />
            </div>

            <div>
                <button
                    type="button"
                    className="btn btn-primary text-white no-animation btn-animation min-h-[28px] h-[28px] flex items-center p-1.5 whitespace-nowrap rounded-[6px] text-14 leading-none"
                    // onClick={onClick}
                >
                    새로 만들기
                </button>
            </div>
        </div>
    );
}
