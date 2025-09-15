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

/**
 * 체크된 항목들에 대해 컨텍스트 액션 패널을 렌더링하는 제네릭 컴포넌트입니다.
 *
 * actions 배열이 비어있지 않으면 각 액션을 아이콘과 이름으로 나열하고,
 * 액션 클릭 시 action.onClick(checkedEntries, onClose)를 호출합니다.
 * actions가 없으면 "정의된 작업이 없습니다." 메시지와 닫기 버튼을 표시합니다.
 *
 * @template T - 체크된 항목의 항목 타입
 * @param props - 컴포넌트 속성 객체. 주요 필드:
 *   - attrs, content, instance: 팝업 라이브러리(tippy 등)에 전달되는 속성들
 *   - onClose: 패널을 닫는 콜백
 *   - checkedEntries: 현재 체크된 항목들의 배열 (액션에 전달됨)
 *   - actions: CheckedAction<T>[] 형태의 액션 목록 (기본값: [])
 *   - columnDefs, setColumnDefs, sortedColumns, setSortedColumns: 테이블 상태 통합을 위해 수신하지만 이 컴포넌트에서는 사용되지 않습니다
 * @returns 렌더링된 JSX 요소
 */
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
