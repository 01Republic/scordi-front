import {Dispatch, SetStateAction} from 'react';
import {ListFilter} from 'lucide-react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {VisibleColumnListControl} from '^lib/GyuridTable/features/column-visibility';
import {SortableColumnListControl} from '^lib/GyuridTable/features/sortable';
import {SearchControl} from '^lib/GyuridTable/features/searchable';
import {IconButton} from './IconButton';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    onSearch?: (value: string) => any;
}

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
