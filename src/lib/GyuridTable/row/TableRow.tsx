import {Column, ColumnDef, DataColumn, DefaultColDef, SortedColumnInterface} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {TableRowControl} from './TableRowControl';
import {CheckedAction} from '^lib/GyuridTable/features/row-checkbox';
import {Dispatch, SetStateAction} from 'react';

interface TableRowProps<T> {
    entry: T;
    yIndex: number;
    defaultColDef?: DefaultColDef<T>;
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    onCheck?: (yIndex: number, checked: boolean) => any;
    actions?: CheckedAction<T>[];
}

export function TableRow<T>(props: TableRowProps<T>) {
    const {yIndex, entry, columnDefs, defaultColDef, onCheck} = props;

    return (
        <TableRowControl {...props}>
            <li className="flex min-h-[36px] items-center group/row transition-all duration-[20ms]">
                <Column
                    defaultColDef={defaultColDef}
                    className={`${onCheck ? '!min-w-fit !max-w-fit' : '!min-w-0 !max-w-0 p-0'} flex items-center`}
                >
                    {onCheck && (
                        <Checkbox className="gyurid-row-checkbox" onChange={(e) => onCheck(yIndex, e.target.checked)} />
                    )}
                </Column>

                {columnDefs.map((columnDef, index) => (
                    <DataColumn
                        key={index}
                        entry={entry}
                        columnDef={columnDef}
                        defaultColDef={defaultColDef}
                        className={!onCheck && index === 0 ? '' : `border-l`}
                    />
                ))}
            </li>
        </TableRowControl>
    );
}
