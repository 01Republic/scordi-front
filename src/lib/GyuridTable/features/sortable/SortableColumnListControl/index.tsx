import {Dispatch, SetStateAction, useState} from 'react';
import {ArrowUpDown} from 'lucide-react';
import Tippy from '@tippyjs/react/headless';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {SortableColumnListControlPanel} from './SortableColumnListControlPanel';
import {IconButton} from '^lib/GyuridTable/ui';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

/**
 * 열 정의를 편집하고 정렬된 열 순서를 관리하는 팝오버 버튼을 렌더합니다.
 *
 * 버튼 클릭으로 팝오버가 열리며 내부에 SortableColumnListControlPanel을 표시해
 * columnDefs와 sortedColumns 상태를 수정할 수 있게 합니다. 팝오버 외부 클릭 또는
 * 패널의 onClose 호출로 팝오버가 닫힙니다.
 *
 * @param props - 컴포넌트에 전달되는 속성들
 * @param props.columnDefs - 편집 가능한 열 정의 목록
 * @param props.setColumnDefs - columnDefs 상태를 갱신하는 setter
 * @param props.sortedColumns - 현재 정렬 구성(선택적, 기본 빈 배열)
 * @param props.setSortedColumns - sortedColumns 상태를 갱신하는 setter
 * @returns 렌더된 JSX 요소
 */
export function SortableColumnListControl<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs, sortedColumns = [], setSortedColumns} = props;
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
                <SortableColumnListControlPanel
                    attrs={attrs}
                    content={content}
                    instance={instance}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    sortedColumns={sortedColumns}
                    setSortedColumns={setSortedColumns}
                    onClose={() => setIsVisible(false)}
                />
            )}
        >
            <span>
                <IconButton Icon={() => <ArrowUpDown fontSize={14} />} name="정렬" onClick={() => setIsVisible(true)} />
            </span>
        </Tippy>
    );
}
