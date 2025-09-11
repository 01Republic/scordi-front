import {PaginationMetaData} from '^types/utils/paginated.dto';
import {TableHeader, TableRow} from '^lib/GyuridTable/row';
import {ColumnDef, DefaultColDef} from './column';
import {cn} from '^public/lib/utils';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {Dispatch, SetStateAction} from 'react';
import {SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable/features/sortable';

interface GyuridTableConfig<T> {
    entries: T[];
    pagination?: PaginationMetaData;
    columnDefs: ColumnDef<T>[];
    defaultColDef?: DefaultColDef<T>;
    isLoading?: boolean;
    className?: string;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, defaultColDef, columnDefs, isLoading = false, className = ''} = props;
    const {sortedColumns, setSortedColumns} = props;

    return (
        <div className={cn(`relative text-14 w-full`, className)}>
            <div className="flex items-center w-full">
                <div className="flex items-center w-full">
                    <SortStatusSection
                        columnDefs={columnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                    />
                </div>

                <div className="flex items-center ml-auto">
                    {!!sortedColumns?.length && (
                        <div
                            className="btn btn-ghost no-animation btn-animation min-h-[28px] h-[28px] px-2 whitespace-nowrap rounded-[6px] text-14 text-gray-500"
                            onClick={() => {
                                setSortedColumns && setSortedColumns([]);
                            }}
                        >
                            초기화
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <ul className="overflow-x-auto w-full">
                <TableHeader columnDefs={columnDefs} defaultColDef={defaultColDef} />
                {entries.map((entry, index) => (
                    <TableRow key={index} entry={entry} columnDefs={columnDefs} defaultColDef={defaultColDef} />
                ))}
            </ul>
        </div>
    );
}
