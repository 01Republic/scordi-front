import {WithChildren} from '^types/global.type';
import {Instance, Placement} from 'tippy.js';
import {X} from 'lucide-react';
import {Dispatch, ReactElement, ReactNode, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {MenuContainer, MenuItem, MenuList} from '^lib/GyuridTable/features/MenuDropdown';

export interface CheckedAction<T> {
    Icon: () => JSX.Element;
    name: JSX.Element | ReactElement | ReactNode;
    onClick: (checkedEntries: T[], close: () => any) => any;
}

interface Props<T> extends WithChildren {
    // Tippy objs.
    attrs: {
        'data-placement': Placement;
        'data-reference-hidden'?: string;
        'data-escaped'?: string;
    };
    content?: ReactNode;
    instance?: Instance;
    onClose: () => any;

    // Task objs.
    checkedEntries: T[];
    actions?: CheckedAction<T>[];

    // basic objs.
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

export function CheckedItemsControlPanel<T>(props: Props<T>) {
    const {attrs, content, instance, onClose} = props;
    const {checkedEntries, actions = []} = props;
    const {columnDefs, setColumnDefs, sortedColumns = [], setSortedColumns} = props;

    return (
        <MenuContainer attrs={attrs} content={content} instance={instance} className="!min-w-[200px]">
            {actions.length ? (
                <MenuList className="p-2">
                    {actions.map((action, i) => {
                        const {Icon, name, onClick} = action;
                        return (
                            <MenuItem key={i} onClick={() => onClick(checkedEntries, onClose)}>
                                <div>
                                    <Icon />
                                </div>
                                <div>{name}</div>
                            </MenuItem>
                        );
                    })}
                </MenuList>
            ) : (
                <div className="flex items-center pt-[9px] pb-[11px] px-[16px] h-[42px]">
                    <div className="grow text-[14px] text-gray-400 font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                        정의된 작업이 없습니다.
                    </div>
                    <div>
                        <button
                            type="button"
                            className="cursor-pointer rounded-full w-[18px] h-[18px] bg-gray-150 hover:bg-gray-300 flex items-center justify-center"
                            onClick={onClose}
                        >
                            <X fontSize={12} />
                        </button>
                    </div>
                </div>
            )}
        </MenuContainer>
    );
}
