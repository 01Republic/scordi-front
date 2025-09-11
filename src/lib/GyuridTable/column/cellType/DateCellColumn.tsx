import {lpp} from '^utils/dateTime';
import {Column} from '^lib/GyuridTable';
import {CellColumnProps} from './CellColumn.interface';

export interface DateCellColumnType {
    name: 'date';
    format?: string;
}

export function DateCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as DateCellColumnType | undefined;
    const formatStr = cellType?.format || 'P';

    return (
        <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
            {lpp(value, formatStr)}
        </Column>
    );
}
