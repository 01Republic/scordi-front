import {PaginationMetaData} from '^types/utils/paginated.dto';
import {TableHeader, TableRow} from '^lib/GyuridTable/row';
import {ColumnDef, DefaultColDef} from './column';
import {cn} from '^public/lib/utils';
import {Dispatch, SetStateAction} from 'react';
import {SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable/features/sortable';
import {BulkActionSection} from '^lib/GyuridTable/features/bulk-actions';
import {ViewButtonsSection} from '^lib/GyuridTable/views';

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

    const isSorting = !!sortedColumns?.length;

    return (
        <div className={cn(`relative text-14 w-full`, className)}>
            <div className="flex items-center w-full mb-4">
                <div className="flex items-center w-full">
                    <ViewButtonsSection
                        columnDefs={columnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                    />
                </div>

                <div className="flex items-center ml-auto">
                    <BulkActionSection
                        columnDefs={columnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                    />
                </div>
            </div>

            {isSorting && (
                <>
                    <hr className="mt-4" />

                    <div className="flex items-center w-full py-1">
                        <div className="flex items-center w-full">
                            {isSorting && (
                                <SortStatusSection
                                    columnDefs={columnDefs}
                                    sortedColumns={sortedColumns}
                                    setSortedColumns={setSortedColumns}
                                />
                            )}
                        </div>

                        <div className="flex items-center ml-auto">
                            {isSorting && (
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
                </>
            )}

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
