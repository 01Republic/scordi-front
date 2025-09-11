import {cn} from '^public/lib/utils';
import {currencyFormatStr, unitFormat} from '^utils/number';
import {Column} from '^lib/GyuridTable';
import {CellColumnProps} from './CellColumn.interface';

export interface NumberCellColumnType {
    name: 'number';
    format?: 'thousand' | 'currency' | 'unit' | 'number';
    currencyFormat?: {unit?: string; format?: string};
    unitFormat?: {unit?: string; format?: string};
}

export function NumberCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as NumberCellColumnType | undefined;
    const format = cellType?.format || 'number';

    const _currencyFormat = cellType?.currencyFormat || {};
    const _unitFormat = cellType?.unitFormat || {};

    return (
        <Column columnDef={columnDef} defaultColDef={defaultColDef} className={cn(`text-right`, className)}>
            {format === 'currency'
                ? currencyFormatStr(`${value}`, _currencyFormat.unit, _currencyFormat.format)
                : format === 'unit'
                ? unitFormat(Number(value), _unitFormat.unit, _unitFormat.format)
                : format === 'thousand'
                ? Number(value).toLocaleString()
                : value}
        </Column>
    );
}
