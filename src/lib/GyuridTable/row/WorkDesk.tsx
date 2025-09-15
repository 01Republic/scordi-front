import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable';
import {Button} from '^lib/GyuridTable/ui';
import {CheckedAction, CheckedItemsControl} from '^lib/GyuridTable/features/row-checkbox';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    checkedEntries?: T[];
    actions?: CheckedAction<T>[];
}

export function WorkDesk<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs, sortedColumns = [], setSortedColumns, checkedEntries = [], actions = []} = props;

    const isChecking = !!checkedEntries.length;
    const isSorting = !!sortedColumns.length;

    if (!isSorting && !isChecking) return <></>;

    return (
        <>
            <hr className="mt-4" />

            <div className="flex items-center w-full py-1">
                <div className="flex items-center w-full">
                    {isChecking && (
                        <CheckedItemsControl
                            checkedEntries={checkedEntries}
                            columnDefs={columnDefs}
                            setColumnDefs={setColumnDefs}
                            sortedColumns={sortedColumns}
                            setSortedColumns={setSortedColumns}
                            actions={actions}
                        />
                    )}

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
    );
}
