import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, DefaultColDef, HeadColumn} from '^lib/GyuridTable';
import {useVisibleColumns} from '^lib/GyuridTable/features/column-visibility';

interface TableHeaderProps<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
    const {columnDefs, setColumnDefs, defaultColDef} = props;
    const {hideColumn} = useVisibleColumns(columnDefs, setColumnDefs);

    return (
        <li className="flex min-h-[36px] items-center bg-white sticky top-0 z-[1]">
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
