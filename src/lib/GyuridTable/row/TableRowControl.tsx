import {ColumnDef, DefaultColDef, SortedColumnInterface} from '^lib/GyuridTable';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import {EllipsisVertical} from 'lucide-react';
import {Dispatch, SetStateAction, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {CheckedAction, CheckedItemsControlPanel} from '^lib/GyuridTable/features/row-checkbox';

interface Props<T> extends WithChildren {
    entry: T;
    yIndex: number;
    defaultColDef?: DefaultColDef<T>;
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    onCheck?: (yIndex: number, checked: boolean) => any;
    actions?: CheckedAction<T>[];
}

export function TableRowControl<T>(props: Props<T>) {
    const {entry, children, actions} = props;
    const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
    const [isMoreControlVisible, setIsMoreControlVisible] = useState(false);

    const showMoreBtn = () => setIsMoreBtnVisible(true);
    const hideMoreBtn = () => {
        if (isMoreControlVisible) return;
        setIsMoreBtnVisible(false);
    };

    const showMoreControl = () => setIsMoreControlVisible(true);
    const hideMoreControl = () => {
        setIsMoreControlVisible(false);
        setIsMoreBtnVisible(false);
    };

    return (
        <Tippy
            visible={isMoreBtnVisible}
            placement="left"
            arrow={false}
            offset={[0, -3]}
            interactive
            interactiveBorder={30}
            appendTo={document.body}
            className="!bg-transparent !text-black [&_.tippy-content]:p-0"
            content={
                <TippyHeadless
                    visible={isMoreControlVisible}
                    placement="bottom-start"
                    interactive
                    interactiveDebounce={100}
                    offset={[0, 0]}
                    onClickOutside={hideMoreControl}
                    render={(attrs, content, instance) => (
                        <CheckedItemsControlPanel
                            attrs={attrs}
                            content={content}
                            instance={instance}
                            onClose={hideMoreControl}
                            {...props}
                            checkedEntries={[entry]}
                            actions={actions}
                        />
                    )}
                >
                    <div
                        className="h-[20px] w-[12px] bg-white border border-gray-300 rounded-[3px] shadow flex items-center justify-center cursor-pointer"
                        onMouseEnter={showMoreBtn}
                        onMouseLeave={hideMoreBtn}
                        onClick={showMoreControl}
                    >
                        <EllipsisVertical />
                    </div>
                </TippyHeadless>
            }
        >
            <div onMouseEnter={showMoreBtn} onMouseLeave={hideMoreBtn}>
                {children}
            </div>
        </Tippy>
    );
}
