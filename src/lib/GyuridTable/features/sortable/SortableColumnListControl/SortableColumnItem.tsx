import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {MenuItem} from '^lib/GyuridTable/features/MenuDropdown';
import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {X} from 'lucide-react';

interface Props<T> {
    sortedColumn: SortedColumnInterface;
    setSortedColumns: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    columnDefs: ColumnDef<T>[];
}

/**
 * 단일 정렬 항목 행을 렌더링하는 제네릭 React 컴포넌트입니다.
 *
 * 선택한 컬럼과 정렬 방향을 변경하거나 해당 정렬 항목을 제거할 수 있는 UI(컬럼 선택 드롭다운, 정렬 방향 드롭다운, 삭제 버튼)를 제공합니다.
 *
 * @template T - 테이블의 행 데이터 타입
 * @param props - 컴포넌트 props
 * @param props.sortedColumn - 현재 항목의 정렬 정보(필드, 정렬키, 정렬값)
 * @param props.setSortedColumns - 정렬 항목 배열 상태를 갱신하는 상태 설정 함수
 * @param props.columnDefs - 선택 가능한 컬럼 정의 목록(각 항목의 field와 headerName 사용)
 * @returns 렌더된 React 노드
 */
export function SortableColumnItem<T>(props: Props<T>) {
    const {sortedColumn, columnDefs, setSortedColumns} = props;

    const onSort = useCallback(
        (field: string, sortVal: 'ASC' | 'DESC', sortKey?: string) => {
            setSortedColumns([{field, sortKey: sortKey || field, sortVal}]);
        },
        [setSortedColumns],
    );

    const remove = useCallback(
        (field: string) => {
            setSortedColumns((columns) => {
                return columns.filter((col) => col.field !== field);
            });
        },
        [setSortedColumns],
    );

    return (
        <MenuItem className="min-h-[42px] !bg-white">
            <div className="flex items-center gap-2">
                {/* 정렬할 컬럼 선택 */}
                <select
                    className="select select-sm select-bordered"
                    defaultValue={sortedColumn.field}
                    onChange={(e) => onSort(e.target.value, 'ASC')}
                >
                    {columnDefs.map((col) => {
                        const field = String(col.field || '');
                        return (
                            <option key={field} value={field}>
                                {col.headerName || field}
                            </option>
                        );
                    })}
                </select>

                {/* 정렬 방향 선택 */}
                <select
                    className="select select-sm select-bordered"
                    defaultValue={sortedColumn.sortVal}
                    onChange={(e) => onSort(sortedColumn.field, e.target.value as 'ASC' | 'DESC')}
                >
                    {['ASC', 'DESC'].map((val) => (
                        <option key={val} value={val}>
                            {val === 'ASC' ? '오름차순' : '내림차순'}
                        </option>
                    ))}
                </select>
            </div>
            <div className="ml-auto">
                <button
                    type="button"
                    className="!outline-none btn-animation transition-all duration-[20ms] w-[20px] h-[20px] inline-flex items-center justify-center hover:bg-gray-150 rounded-full"
                    onClick={() => remove(sortedColumn.field)}
                >
                    <X />
                </button>
            </div>
        </MenuItem>
    );
}
