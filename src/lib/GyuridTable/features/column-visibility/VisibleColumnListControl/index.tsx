import {Dispatch, SetStateAction, useState} from 'react';
import {Settings2} from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import {ColumnDef} from '^lib/GyuridTable';
import {IconButton} from '^lib/GyuridTable/features/bulk-actions';
import {VisibleColumnListControlPanel} from './VisibleColumnListControlPanel';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
}

export function VisibleColumnListControl<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs} = props;
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
                <VisibleColumnListControlPanel
                    attrs={attrs}
                    content={content}
                    instance={instance}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    onClose={() => setIsVisible(false)}
                />
            )}
        >
            <span>
                <IconButton Icon={() => <Settings2 fontSize={14} />} name="설정" onClick={() => setIsVisible(true)} />
            </span>
        </Tippy>
    );
}
