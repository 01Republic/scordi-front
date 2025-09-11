import {Column} from '^lib/GyuridTable';
import {CellColumnProps} from './CellColumn.interface';

export interface BooleanCellColumnType {
    name: 'boolean';
}

export function BooleanCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as BooleanCellColumnType | undefined;

    return (
        <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
            <input
                type="checkbox"
                className={`checkbox checkbox-xs checkbox-primary rounded-[4px] disabled:cursor-pointer disabled:opacity-100 disabled:border-gray-200 disabled:bg-gray-100 checked:disabled:!border-indigo-500 checked:disabled:!bg-indigo-500`}
                defaultChecked={!!value}
                disabled
            />
        </Column>
    );
}
