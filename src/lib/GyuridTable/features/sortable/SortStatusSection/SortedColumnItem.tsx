import {Dispatch, SetStateAction} from 'react';
import {ArrowDown, ArrowUp, X} from 'lucide-react';
import {ColumnDef} from '^lib/GyuridTable';
import {SortedColumnInterface} from '^lib/GyuridTable/features/sortable';

interface Props<T> {
    sortedColumn: SortedColumnInterface;
    columnDefs: ColumnDef<T>[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function SortedColumnItem<T>(props: Props<T>) {
    const {sortedColumn, columnDefs, setSortedColumns} = props;

    const {field, sortKey, sortVal} = sortedColumn;
    const columnDef = columnDefs.find((c) => c.field === field);

    return (
        <div
            className="select-none cursor-pointer inline-flex h-[24px] leading-[24px] items-center justify-center whitespace-nowrap gap-1 py-0 px-2 text-14 text-indigo-600 bg-indigo-100/60 hover:bg-indigo-200/60 transition-all rounded-[32px]"
            onClick={() => {
                setSortedColumns &&
                    setSortedColumns([
                        {
                            field,
                            sortKey,
                            sortVal: sortVal === 'ASC' ? 'DESC' : 'ASC',
                        },
                    ]);
            }}
        >
            <div>
                {sortVal === 'ASC' && <ArrowUp fontSize={16} />}
                {sortVal === 'DESC' && <ArrowDown fontSize={16} />}
            </div>

            <div>{columnDef?.headerName || field}</div>

            {setSortedColumns && (
                <div
                    className="px-0.5"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSortedColumns && setSortedColumns([]);
                    }}
                >
                    <X fontSize={12} />
                </div>
            )}
        </div>
    );
}
