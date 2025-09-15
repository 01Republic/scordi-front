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

/**
 * 테이블 행에 대한 "더보기" 컨트롤을 렌더링하는 제네릭 React 컴포넌트.
 *
 * 행(entry)을 기준으로 행 오른쪽(또는 지정된 위치)에 작은 생략 아이콘(ellipsis)을 툴팁으로 표시하고,
 * 아이콘 클릭 시 CheckedItemsControlPanel을 바텀-스타트로 열어 해당 행을 단일 선택 상태(checkedEntries = [entry])로 전달합니다.
 * 호버 시 생략 아이콘이 나타나고(외부 툴팁), 아이콘 클릭으로 상세 컨트롤 패널(내부 TippyHeadless)이 열립니다.
 * 패널은 외부 클릭 시 닫히며, 패널이 열려있는 동안에는 아이콘 툴팁이 강제로 유지됩니다.
 *
 * 제네릭 T를 받아 다양한 행 데이터 타입과 함께 사용할 수 있으며, 전달된 props의 actions는 패널로 그대로 포워드됩니다.
 */
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
