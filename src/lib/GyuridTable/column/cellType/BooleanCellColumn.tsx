import {Column} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {CellColumnProps} from './CellColumn.interface';

export interface BooleanCellColumnType {
    name: 'boolean';
}

export function BooleanCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as BooleanCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                <Checkbox defaultChecked={!!value} disabled />
            </Column>
        </div>
    );
}
