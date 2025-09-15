import {ChevronDown} from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import {Dispatch, SetStateAction, useState} from 'react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {CheckedAction, CheckedItemsControlPanel} from './CheckedItemsControlPanel';

interface Props<T> {
    checkedEntries: T[];
    actions?: CheckedAction<T>[];
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function CheckedItemsControl<T>(props: Props<T>) {
    const {checkedEntries} = props;
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className="flex items-center gap-2 mr-2">
            <Tippy
                visible={isVisible}
                placement="bottom-start"
                interactive
                interactiveDebounce={100}
                offset={[0, 10]}
                onClickOutside={() => setIsVisible(false)}
                render={(attrs, content, instance) => (
                    <CheckedItemsControlPanel
                        attrs={attrs}
                        content={content}
                        instance={instance}
                        onClose={() => setIsVisible(false)}
                        {...props}
                    />
                )}
            >
                <div>
                    <div
                        className="select-none cursor-pointer flex items-center gap-1 bg-white h-[24px] px-2 py-0 rounded-[32px] text-14 leading-none shadow border border-gray-300/70"
                        onClick={() => setIsVisible(true)}
                    >
                        <div>
                            <span className="font-semibold text-indigo-500">{checkedEntries.length} 개</span>
                            <span>의 선택된 항목</span>
                        </div>

                        <div>
                            <ChevronDown />
                        </div>
                    </div>
                </div>
            </Tippy>

            <div className="ml-auto bg-gray-300/70 h-[16px] w-[2px]" />
        </div>
    );
}
