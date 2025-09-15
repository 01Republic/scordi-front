import {Dispatch, SetStateAction} from 'react';
import {Column, ColumnDef, DefaultColDef, HeadColumn} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {useVisibleColumns} from '^lib/GyuridTable/features/column-visibility';

interface TableHeaderProps<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    onCheck?: (checked: boolean) => any;
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
    const {columnDefs, setColumnDefs, defaultColDef, onCheck} = props;
    const {hideColumn} = useVisibleColumns(columnDefs, setColumnDefs);

    return (
        <li className="flex min-h-[36px] items-center group/header bg-white sticky top-0 z-[1]">
            <Column
                defaultColDef={defaultColDef}
                className={`${
                    onCheck ? '!min-w-fit !max-w-fit' : '!min-w-0 !max-w-0 p-0'
                } flex items-center border-b-2`}
            >
                {onCheck && <Checkbox className="gyurid-header-checkbox" onChange={(e) => onCheck(e.target.checked)} />}
            </Column>

            {columnDefs.map((columnDef, index) => (
                <HeadColumn
                    key={index}
                    xIndex={index}
                    columnDef={columnDef}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    defaultColDef={defaultColDef}
                    onHide={() => hideColumn(String(columnDef.field))}
                />
            ))}
        </li>
    );
}
