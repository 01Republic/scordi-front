import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {ViewButton} from './ViewButton';
import {Table} from 'lucide-react';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function ViewButtonsSection<T>(props: Props<T>) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                <ViewButton
                    Icon={() => <Table fontSize={16} />}
                    name="표"
                    tooltipTitle="표"
                    tooltipDesc="데이터베이스"
                />
            </div>

            <div className="flex items-center"></div>
        </div>
    );
}
