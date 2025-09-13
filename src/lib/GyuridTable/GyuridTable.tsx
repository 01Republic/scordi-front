import {PaginationMetaData} from '^types/utils/paginated.dto';
import {TableFooter, TableFooterProps, TableHeader, TableRow} from '^lib/GyuridTable/row';
import {ColumnDef, DefaultColDef, useColumnDefs, useDefaultColDef} from './column';
import {cn} from '^public/lib/utils';
import {Dispatch, SetStateAction, useMemo} from 'react';
import {SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable/features/sortable';
import {BulkActionSection} from '^lib/GyuridTable/features/bulk-actions';
import {ViewButtonsSection} from '^lib/GyuridTable/views';
import {useVisibleColumns} from '^lib/GyuridTable/features';

interface GyuridTableConfig<T> {
    entries: T[];
    columnDefs: ColumnDef<T>[];
    setColumnDefs?: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    isLoading?: boolean;
    className?: string;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;

    paging?: TableFooterProps<T>;
}

export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, isLoading = false, className = ''} = props;
    const {defaultColDef: _defaultColDef, columnDefs: _columnDefs, setColumnDefs: _setColumnDefs} = props;
    const {paging = {}} = props;
    const {sortedColumns, setSortedColumns} = props;

    const defaultColDef = useDefaultColDef(_defaultColDef);
    const [columnDefs, setColumnDefs] = _setColumnDefs ? [_columnDefs, _setColumnDefs] : useColumnDefs(_columnDefs);
    const {getVisibles} = useVisibleColumns(columnDefs, setColumnDefs);
    const visibleColumns = useMemo(() => getVisibles(columnDefs), [columnDefs]);

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
                        setColumnDefs={setColumnDefs}
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
                <TableHeader columnDefs={visibleColumns} setColumnDefs={setColumnDefs} defaultColDef={defaultColDef} />
                {entries.map((entry, index) => (
                    <TableRow key={index} entry={entry} columnDefs={visibleColumns} defaultColDef={defaultColDef} />
                ))}
            </ul>

            <TableFooter {...paging} />
        </div>
    );
}
