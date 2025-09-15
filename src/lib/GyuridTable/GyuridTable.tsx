import {cn} from '^public/lib/utils';
import {Dispatch, SetStateAction, useMemo} from 'react';
import {TableFooter, TableFooterProps, TableHeader, TableRow, WorkDesk} from './row';
import {ColumnDef, DefaultColDef, useColumnDefs, useDefaultColDef} from './column';
import {ViewButtonsSection} from './views';
import {useVisibleColumns} from './features/column-visibility';
import {SortedColumnInterface} from './features/sortable';
import {BulkActionSection} from './features/bulk-actions';
import {LoadingStatus} from './features/loading-state';
import {CheckedAction, useRowCheckbox} from './features/row-checkbox';

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

    checkbox?: boolean;
    actions?: CheckedAction<T>[];
}

export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, isLoading = false, className = ''} = props;
    const {defaultColDef: _defaultColDef, columnDefs: _columnDefs, setColumnDefs: _setColumnDefs} = props;
    const {paging = {}, onSearch, checkbox = false, actions} = props;
    const {sortedColumns, setSortedColumns} = props;

    const defaultColDef = useDefaultColDef(_defaultColDef);
    const [columnDefs, setColumnDefs] = _setColumnDefs ? [_columnDefs, _setColumnDefs] : useColumnDefs(_columnDefs);
    const {getVisibles} = useVisibleColumns(columnDefs, setColumnDefs);
    const visibleColumns = useMemo(() => getVisibles(columnDefs), [columnDefs]);

    const {changeCheckboxAll, changeCheckbox, getAllCheckedEntries} = useRowCheckbox<T>();

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

            <WorkDesk
                columnDefs={columnDefs}
                setColumnDefs={setColumnDefs}
                sortedColumns={sortedColumns}
                setSortedColumns={setSortedColumns}
                checkedEntries={getAllCheckedEntries(entries)}
                actions={actions}
            />

            {/* Table */}
            <ul className="overflow-x-auto w-full">
                <TableHeader
                    columnDefs={visibleColumns}
                    setColumnDefs={setColumnDefs}
                    defaultColDef={defaultColDef}
                    onCheck={checkbox ? changeCheckboxAll : undefined}
                />
                {entries.map((entry, index) => (
                    <TableRow
                        key={index}
                        yIndex={index}
                        entry={entry}
                        defaultColDef={defaultColDef}
                        columnDefs={visibleColumns}
                        setColumnDefs={setColumnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                        onCheck={checkbox ? changeCheckbox : undefined}
                        actions={actions}
                    />
                ))}
            </ul>

            <TableFooter {...paging} />
        </div>
    );
}
