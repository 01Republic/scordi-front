import {ColumnDef, DataColumn, DefaultColDef} from '^lib/GyuridTable';

interface TableRowProps<T> {
    entry: T;
    columnDefs: ColumnDef<T>[];
    defaultColDef?: DefaultColDef<T>;
}

export function TableRow<T>(props: TableRowProps<T>) {
    const {entry, columnDefs, defaultColDef} = props;

    return (
        <li className="flex min-h-[36px] items-center">
            {columnDefs.map((columnDef, index) => (
                <DataColumn key={index} entry={entry} columnDef={columnDef} defaultColDef={defaultColDef} />
            ))}
        </li>
    );
}
