import {Column, CellColumnProps} from '^lib/GyuridTable';

export interface TextCellColumnType {
    name: 'text';
}

export function TextCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as TextCellColumnType | undefined;

    return (
        <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
            {value ?? ''}
        </Column>
    );
}
