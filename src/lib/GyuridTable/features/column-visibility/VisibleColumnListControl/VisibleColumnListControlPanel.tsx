import {Dispatch, ReactNode, SetStateAction, useMemo} from 'react';
import {WithChildren} from '^types/global.type';
import {Instance, Placement} from 'tippy.js';
import {X} from 'lucide-react';
import {ColumnDef} from '^lib/GyuridTable';
import {MenuContainer, MenuItem, MenuList} from '^lib/GyuridTable/features/MenuDropdown';
import {useVisibleColumns} from '^lib/GyuridTable/features/column-visibility';
import {VisibleColumnItem} from './VisibleColumnItem';

interface Props<T> extends WithChildren {
    attrs: {
        'data-placement': Placement;
        'data-reference-hidden'?: string;
        'data-escaped'?: string;
    };
    content?: ReactNode;
    instance?: Instance;

    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    onClose: () => void;
}

export function VisibleColumnListControlPanel<T>(props: Props<T>) {
    const {attrs, content, instance, children, onClose} = props;
    const {columnDefs, setColumnDefs} = props;
    const {getVisibles, getInVisibles, showColumn, hideColumn, showAllColumns, hideAllColumns} = useVisibleColumns(
        columnDefs,
        setColumnDefs,
    );

    const visibleColumns = useMemo(() => getVisibles(columnDefs), [columnDefs]);
    const inVisibleColumns = useMemo(() => getInVisibles(columnDefs), [columnDefs]);

    return (
        <MenuContainer attrs={attrs} content={content} instance={instance} className="!min-w-[290px] pt-1">
            <div className="flex items-center pt-[14px] px-[16px] pb-[6px] h-[42px]">
                <div className="grow text-[14px] font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    속성
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

            {visibleColumns.length > 0 && (
                <MenuList className="p-2">
                    <MenuItem className="text-12 hover:bg-white font-medium cursor-default">
                        <div className="grow text-gray-500">표에 표시하기</div>
                        <div
                            tabIndex={0}
                            className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                            onClick={() => hideAllColumns()}
                        >
                            모두 숨기기
                        </div>
                    </MenuItem>

                    {visibleColumns.map((columnDef, i) => (
                        <VisibleColumnItem
                            key={i}
                            columnDef={columnDef}
                            onClick={() => hideColumn(String(columnDef.field))}
                        />
                    ))}
                </MenuList>
            )}

            {inVisibleColumns.length > 0 && (
                <MenuList className="p-2">
                    <MenuItem className="text-12 hover:bg-white font-medium cursor-default">
                        <div className="grow text-gray-500">표에서 숨기기</div>
                        <div
                            tabIndex={0}
                            className="cursor-pointer text-indigo-500 hover:text-indigo-700"
                            onClick={() => showAllColumns()}
                        >
                            모두 표시하기
                        </div>
                    </MenuItem>

                    {inVisibleColumns.map((columnDef, i) => (
                        <VisibleColumnItem
                            key={i}
                            columnDef={columnDef}
                            onClick={() => showColumn(String(columnDef.field))}
                        />
                    ))}
                </MenuList>
            )}
        </MenuContainer>
    );
}
