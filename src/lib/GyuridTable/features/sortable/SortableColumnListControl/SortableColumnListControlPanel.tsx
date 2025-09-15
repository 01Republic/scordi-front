import {Dispatch, ReactNode, SetStateAction} from 'react';
import {Plus, X} from 'lucide-react';
import {Instance, Placement} from 'tippy.js';
import {WithChildren} from '^types/global.type';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {MenuContainer, MenuItem, MenuList} from '^lib/GyuridTable/features/MenuDropdown';
import {SortableColumnItem} from './SortableColumnItem';

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
    sortedColumns: SortedColumnInterface[];
    setSortedColumns: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    onClose: () => void;
}

/**
 * 정렬 가능한 열 목록을 보여주는 컨트롤 패널 컴포넌트입니다.
 *
 * 패널은 헤더(타이틀 '정렬' 및 닫기 버튼)와 정렬된 열들의 리스트를 렌더링합니다.
 * - 전달된 `sortedColumns` 각각에 대해 `SortableColumnItem`을 렌더링합니다.
 * - `sortedColumns`가 비어 있으면 첫 번째 `columnDefs`를 사용해 기본 정렬 항목({ field, sortKey: field, sortVal: 'DESC' })을 추가하는 "정렬 추가" 항목을 표시합니다.
 * - 닫기 버튼은 `onClose`를 호출합니다.
 *
 * 제네릭 T를 받아 다양한 열 타입의 ColumnDef와 함께 동작하도록 설계되어 있습니다.
 *
 * @returns 렌더된 JSX 요소
 */
export function SortableColumnListControlPanel<T>(props: Props<T>) {
    const {attrs, content, instance, onClose} = props;
    const {columnDefs, setColumnDefs, sortedColumns, setSortedColumns} = props;

    return (
        <MenuContainer attrs={attrs} content={content} instance={instance} className="!min-w-[290px] pt-1">
            <div className="flex items-center pt-[14px] px-[16px] pb-[6px] h-[42px]">
                <div className="grow text-[14px] font-semibold whitespace-nowrap overflow-hidden overflow-ellipsis">
                    정렬
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

            <MenuList className="p-2">
                {sortedColumns.map((sortedColumn: SortedColumnInterface) => (
                    <SortableColumnItem
                        key={sortedColumn.field}
                        sortedColumn={sortedColumn}
                        setSortedColumns={setSortedColumns}
                        columnDefs={columnDefs}
                    />
                ))}

                {sortedColumns.length === 0 && (
                    <MenuItem
                        onClick={() => {
                            const [columnDef] = columnDefs;
                            if (!columnDef) return;
                            const field = String(columnDef.field || '');
                            setSortedColumns([{field, sortKey: field, sortVal: 'DESC'}]);
                        }}
                    >
                        <div>
                            <Plus />
                        </div>
                        <div>정렬 추가</div>
                    </MenuItem>
                )}
            </MenuList>
        </MenuContainer>
    );
}
