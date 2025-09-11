import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {CSSProperties} from 'react';

interface HeadColumnProps<T> {
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
}

export function HeadColumn<T>(props: HeadColumnProps<T>) {
    const {columnDef, defaultColDef} = props;

    const headerName = columnDef.headerName || String(columnDef.field);
    const flexSize = columnDef.flex || defaultColDef?.flex || 1;
    const className = `border-b border-gray-200 [border-image:linear-gradient(to right, #e0e0e0, #e0e0e0, transparent) 1] text-gray-500 font-[500] hover:bg-gray-100/70 select-none transition-all duration-[20ms] relative cursor-pointer h-[36px] py-[7.5px] px-[8px] whitespace-nowrap overflow-hidden text-ellipsis`;
    const cellStyle: CSSProperties = {
        flex: `${flexSize} ${flexSize} 0%`,
        ...defaultColDef?.cellStyle,
        ...columnDef.cellStyle,
    };

    return (
        <div className={className} style={cellStyle}>
            <div>{headerName}</div>
        </div>
    );
}
