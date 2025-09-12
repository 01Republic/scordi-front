import {
    Column,
    CellColumnProps,
    TextCellColumn,
    NumberCellColumn,
    DateCellColumn,
    BooleanCellColumn,
} from '^lib/GyuridTable';

export function AutoCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;

    if (typeof value === 'boolean') return <BooleanCellColumn key={value ? 1 : 0} {...props} />;
    if (typeof value === 'number') return <NumberCellColumn key={value} {...props} />;
    if (typeof value === 'undefined')
        return (
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value || ''}
            </Column>
        );
    if (typeof value === 'function')
        return (
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value || ''}
            </Column>
        );
    if (value === null)
        return (
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {''}
            </Column>
        );
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return (
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value.join(', ')}
                </Column>
            );
        if (value instanceof Date) return <DateCellColumn {...props} />;
        if (value instanceof File)
            return (
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value.name}
                </Column>
            );
        return (
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value || ''}
            </Column>
        );
    }

    return <TextCellColumn {...props} />;
}
