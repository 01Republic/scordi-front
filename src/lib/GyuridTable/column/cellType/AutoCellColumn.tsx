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
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    if (typeof value === 'function')
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    if (value === null)
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {''}
                </Column>
            </div>
        );
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return (
                <div>
                    <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                        {value.join(', ')}
                    </Column>
                </div>
            );
        if (value instanceof Date) return <DateCellColumn {...props} />;
        if (value instanceof File)
            return (
                <div>
                    <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                        {value.name}
                    </Column>
                </div>
            );
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    }

    return <TextCellColumn {...props} />;
}
