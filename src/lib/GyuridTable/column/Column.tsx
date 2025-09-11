import {cn} from '^public/lib/utils';
import {WithChildren} from '^types/global.type';
import {CSSProperties, MutableRefObject} from 'react';
import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';

interface ColumnProps<T> extends WithChildren {
    ref?: MutableRefObject<any>;
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
    className?: string;
    onClick?: () => void;
}

export function Column<T>(props: ColumnProps<T>) {
    const {ref, columnDef, defaultColDef, className = '', children, onClick} = props;

    const flexSize = columnDef.flex || defaultColDef?.flex || 1;
    const minWidth = columnDef.width || defaultColDef?.width || 0;
    const cellStyle: CSSProperties = {
        flex: `${flexSize} ${flexSize} 0%`,
        ...defaultColDef?.cellStyle,
        ...columnDef.cellStyle,
        ...(minWidth ? {minWidth} : {}),
    };

    return (
        <div
            ref={ref}
            className={cn(
                columnDef.className || '',
                defaultColDef?.className || '',
                `border-b border-gray-200 [border-image:linear-gradient(to right, #e0e0e0, #e0e0e0, transparent) 1] select-none transition-all duration-[20ms] relative cursor-pointer h-[36px] py-[7.5px] px-[8px] whitespace-nowrap overflow-hidden text-ellipsis`,
                className,
            )}
            style={cellStyle}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
