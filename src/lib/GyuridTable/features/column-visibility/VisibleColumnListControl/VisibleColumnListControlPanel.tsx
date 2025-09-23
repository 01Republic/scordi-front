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

/**
 * 테이블 열의 표시/숨김을 관리하는 드롭다운 제어 패널을 렌더링합니다.
 *
 * useVisibleColumns 훅을 사용해 현재 표시된 열과 숨겨진 열을 구분하고,
 * 각 열 항목을 클릭해 개별 열을 보이거나 숨기거나, 상단의 링크로 모든 열을 한 번에 표시/숨김할 수 있습니다.
 * 상단의 닫기 버튼은 전달된 onClose 콜백을 호출합니다.
 *
 * 제네릭 T는 columnDefs에 사용되는 행 타입을 나타냅니다.
 *
 * @param columnDefs - 렌더링 및 토글 대상이 되는 열 정의 배열
 * @param setColumnDefs - columnDefs 상태를 갱신하기 위한 상태 세터
 * @param onClose - 패널의 닫기 버튼이 클릭될 때 호출되는 콜백
 * @returns 렌더된 제어 패널의 JSX 요소
 */
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
