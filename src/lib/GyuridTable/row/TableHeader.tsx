import {ColumnDef, DefaultColDef, HeadColumn} from '^lib/GyuridTable';

interface TableHeaderProps<T> {
    columnDefs: ColumnDef<T>[];
    defaultColDef?: DefaultColDef<T>;
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
    const {columnDefs, defaultColDef} = props;

    return (
        <li className="flex min-h-[36px] items-center sticky top-0">
            {columnDefs.map((columnDef, index) => (
                <HeadColumn key={index} columnDef={columnDef} defaultColDef={defaultColDef} />
            ))}
        </li>
    );
}
