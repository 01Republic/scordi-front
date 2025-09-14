import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable';
import {Button} from '^lib/GyuridTable/ui';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function WorkDesk<T>(props: Props<T>) {
    const {columnDefs, sortedColumns = [], setSortedColumns} = props;

    const isSorting = !!sortedColumns?.length;

    if (!isSorting) return <></>;

    return (
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
    );
}
