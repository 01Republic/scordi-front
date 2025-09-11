import {ColumnDef, DefaultColDef} from './column';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {TableHeader, TableRow} from '^lib/GyuridTable/row';

interface GyuridTableConfig<T> {
    entries: T[];
    pagination?: PaginationMetaData;
    columnDefs: ColumnDef<T>[];
    defaultColDef?: DefaultColDef<T>;
    isLoading?: boolean;
}

export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, isLoading = false, defaultColDef, columnDefs} = props;

    return (
        <div className="text-14">
            {/* Table */}
            <ul className="overflow-x-auto w-full">
                <TableHeader columnDefs={columnDefs} defaultColDef={defaultColDef} />
                {entries.map((entry, index) => (
                    <TableRow key={index} entry={entry} columnDefs={columnDefs} defaultColDef={defaultColDef} />
                ))}
            </ul>
        </div>
    );
}
