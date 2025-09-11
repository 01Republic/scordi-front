import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {CSSProperties, useMemo} from 'react';

interface DataColumnProps<T> {
    entry: T;
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
}

export function DataColumn<T>(props: DataColumnProps<T>) {
    const {entry, columnDef, defaultColDef} = props;

    const value = useMemo(() => {
        if (columnDef.valueGetter) return columnDef.valueGetter({data: entry});
        if (!columnDef.field) return '';

        const field = String(columnDef.field);

        return (entry as any)?.[field] ?? '';
    }, [entry, columnDef]);

    const flexSize = columnDef.flex || defaultColDef?.flex || 1;
    const className = `border-b border-r border-gray-200 [border-image:linear-gradient(to right, #e0e0e0, #e0e0e0, transparent) 1] select-none transition-all duration-[20ms] relative cursor-pointer h-[36px] py-[7.5px] px-[8px] whitespace-nowrap overflow-hidden text-ellipsis`;
    const cellStyle: CSSProperties = {
        flex: `${flexSize} ${flexSize} 0%`,
        ...defaultColDef?.cellStyle,
        ...columnDef.cellStyle,
    };

    if (typeof value === 'boolean')
        return (
            <div className={className} style={cellStyle}>
                {value ? 'O' : 'X'}
            </div>
        );
    if (typeof value === 'number')
        return (
            <div className={className} style={cellStyle}>
                {value}
            </div>
        );
    if (typeof value === 'undefined')
        return (
            <div className={className} style={cellStyle}>
                {value || ''}
            </div>
        );
    if (typeof value === 'function')
        return (
            <div className={className} style={cellStyle}>
                {value || ''}
            </div>
        );
    if (value === null)
        return (
            <div className={className} style={cellStyle}>
                {''}
            </div>
        );
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return (
                <div className={className} style={cellStyle}>
                    {value.join(', ')}
                </div>
            );
        if (value instanceof Date)
            return (
                <div className={className} style={cellStyle}>
                    {value.toLocaleString()}
                </div>
            );
        if (value instanceof File)
            return (
                <div className={className} style={cellStyle}>
                    {value.name}
                </div>
            );
        return (
            <div className={className} style={cellStyle}>
                {value || ''}
            </div>
        );
    }

    return (
        <div className={className} style={cellStyle}>
            {value}
        </div>
    );
}
