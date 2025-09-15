import {Dispatch, SetStateAction} from 'react';
import {ColumnDef} from '^lib/GyuridTable';
import {SortedColumnInterface} from '^lib/GyuridTable/features/sortable';
import {isDefinedValue} from '^utils/array';
import {SortedColumnItem} from './SortedColumnItem';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function SortStatusSection<T>(props: Props<T>) {
    const {columnDefs, sortedColumns = [], setSortedColumns} = props;

    if (sortedColumns.length === 0) return <></>;

    return (
        <div className="flex items-center text-14 py-2">
            {sortedColumns.map((sortedColumn) => (
                <SortedColumnItem
                    key={sortedColumn.field}
                    sortedColumn={sortedColumn}
                    columnDefs={columnDefs}
                    setSortedColumns={setSortedColumns}
                />
            ))}
        </div>
    );
}
