import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';

export interface CellColumnProps<T> {
    value: any;
    className?: string;
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
}
