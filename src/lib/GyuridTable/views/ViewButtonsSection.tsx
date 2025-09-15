import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface} from '^lib/GyuridTable';
import {ViewButton} from './ViewButton';
import {Table} from 'lucide-react';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

/**
 * 뷰 관련 버튼들을 수평으로 배치하여 렌더링하는 컴포넌트입니다.
 *
 * 현재 "표" 버튼(ViewButton) 하나를 표시하며, 외부에서 전달된 props는 사용되지 않습니다.
 *
 * @param props - 컴포넌트에 전달되는 props 객체(제네릭 T).
 *   이 객체는 columnDefs, sortedColumns, setSortedColumns 필드를 포함할 수 있으나
 *   이 컴포넌트 구현에서는 사용되지 않습니다.
 * @returns 렌더된 버튼 섹션의 JSX 요소
 */
export function ViewButtonsSection<T>(props: Props<T>) {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center">
                <ViewButton
                    Icon={() => <Table fontSize={16} />}
                    name="표"
                    tooltipTitle="표"
                    tooltipDesc="데이터베이스"
                />
            </div>

            <div className="flex items-center"></div>
        </div>
    );
}
