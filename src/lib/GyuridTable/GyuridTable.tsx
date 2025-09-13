import {cn} from '^public/lib/utils';
import {Dispatch, SetStateAction, useMemo} from 'react';
import {TableFooter, TableFooterProps, TableHeader, TableRow} from './row';
import {ColumnDef, DefaultColDef, useColumnDefs, useDefaultColDef} from './column';
import {ViewButtonsSection} from './views';
import {useVisibleColumns} from './features';
import {SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable/features/sortable';
import {BulkActionSection} from '^lib/GyuridTable/features/bulk-actions';
import {Button} from '^lib/GyuridTable/ui';
import {LoadingStatus} from '^lib/GyuridTable/features/loading-state';

interface GyuridTableConfig<T> {
    entries: T[];
    columnDefs: ColumnDef<T>[];
    setColumnDefs?: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    isLoading?: boolean;
    className?: string;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;

    onSearch?: (value: string) => any;
    paging?: TableFooterProps<T>;
}

export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, isLoading = false, className = ''} = props;
    const {defaultColDef: _defaultColDef, columnDefs: _columnDefs, setColumnDefs: _setColumnDefs} = props;
    const {paging = {}, onSearch} = props;
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
                    <LoadingStatus isLoading={isLoading} />

                    <BulkActionSection
                        columnDefs={columnDefs}
                        setColumnDefs={setColumnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                        onSearch={onSearch}
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
                                <Button ghost onClick={() => setSortedColumns && setSortedColumns([])}>
                                    초기화
                                </Button>
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
