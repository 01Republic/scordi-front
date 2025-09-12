import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {Dispatch, SetStateAction} from 'react';
import {IconButton} from './IconButton';
import {ArrowUpDown, ListFilter, Search, Settings2} from 'lucide-react';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function BulkActionSection<T>(props: Props<T>) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                <IconButton Icon={() => <ListFilter fontSize={14} />} name="필터" onClick={() => 1} />
                <IconButton Icon={() => <ArrowUpDown fontSize={14} />} name="정렬" onClick={() => 1} />
                <IconButton Icon={() => <Search fontSize={14} />} name="검색" onClick={() => 1} />
                <IconButton Icon={() => <Settings2 fontSize={14} />} name="설정" onClick={() => 1} />
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
