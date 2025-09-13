import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {MenuItem} from '^lib/GyuridTable/features/MenuDropdown';
import {Dispatch, SetStateAction, useCallback, useMemo} from 'react';
import {X} from 'lucide-react';

interface Props<T> {
    sortedColumn: SortedColumnInterface;
    setSortedColumns: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    columnDefs: ColumnDef<T>[];
}

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
