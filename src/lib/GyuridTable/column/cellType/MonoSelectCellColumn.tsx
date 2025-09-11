import {Column} from '^lib/GyuridTable';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {CellColumnProps} from './CellColumn.interface';

export interface MonoSelectCellColumnType {
    name: 'mono-select';
}

export function MonoSelectCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as MonoSelectCellColumnType | undefined;
    const colorClass = getColor(`${value}`.length, palette.notionColors);

    return (
        <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
            <TagUI className={colorClass} noMargin>
                {value}
            </TagUI>
        </Column>
    );
}
