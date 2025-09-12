import {ColumnDef} from '^lib/GyuridTable';
import {Eye, EyeOff} from 'lucide-react';
import {MenuItem} from '^lib/GyuridTable/features/MenuDropdown';

interface Props<T> {
    columnDef: ColumnDef<T>;
    onClick: () => any;
}

export function VisibleColumnItem<T>(props: Props<T>) {
    const {columnDef, onClick} = props;

    return (
        <MenuItem className="hover:bg-white cursor-default">
            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium">
                {columnDef.headerName || String(columnDef.field)}
            </div>

            <div className="ml-auto">
                <button
                    type="button"
                    className="hover:bg-gray-150 inline-flex items-center justify-center w-[24px] h-[24px] rounded-[6px] transition-all duration-[20ms]"
                    onClick={onClick}
                >
                    {columnDef.hide ? <EyeOff fontSize={14} /> : <Eye fontSize={14} />}
                </button>
            </div>
        </MenuItem>
    );
}
