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

/**
 * 선택된 항목 개수를 표시하고 클릭 시 상세 제어 패널을 여는 제네릭 컴포넌트.
 *
 * 내부 상태로 팝오버(CheckedItemsControlPanel)의 노출을 제어하며, 트리거(알약 모양)의 클릭으로 패널을 열고
 * 패널의 onClose 또는 외부 클릭으로 닫습니다. 전달된 props는 패널에 그대로 전달되어 선택된 항목에 대한 작업, 컬럼 정의 및 정렬 상태를 조작할 수 있습니다.
 *
 * @template T - 리스트 항목의 타입
 * @returns JSX 요소: 선택 요약 트리거와 팝오버 패널을 포함한 UI
 */
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
