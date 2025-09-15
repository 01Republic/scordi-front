import {Dispatch, SetStateAction, useState} from 'react';
import {ArrowUpDown} from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {SortableColumnListControlPanel} from './SortableColumnListControlPanel';
import {IconButton} from '^lib/GyuridTable/ui';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function SortableColumnListControl<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs, sortedColumns = [], setSortedColumns} = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <Tippy
            visible={isVisible}
            placement="bottom-start"
            interactive
            interactiveDebounce={100}
            offset={[0, 10]}
            onClickOutside={() => setIsVisible(false)}
            render={(attrs, content, instance) => (
                <SortableColumnListControlPanel
                    attrs={attrs}
                    content={content}
                    instance={instance}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    sortedColumns={sortedColumns}
                    setSortedColumns={setSortedColumns}
                    onClose={() => setIsVisible(false)}
                />
            )}
        >
            <span>
                <IconButton Icon={() => <ArrowUpDown fontSize={14} />} name="정렬" onClick={() => setIsVisible(true)} />
            </span>
        </Tippy>
    );
}
