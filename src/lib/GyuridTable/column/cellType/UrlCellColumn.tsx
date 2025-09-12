import {Column, CellColumnProps} from '^lib/GyuridTable';

export interface UrlCellColumnType {
    name: 'url';
}

export function UrlCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as UrlCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value ?? ''}
            </Column>
        </div>
    );
}
