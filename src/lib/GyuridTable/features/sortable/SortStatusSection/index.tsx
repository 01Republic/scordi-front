import {Dispatch, SetStateAction} from 'react';
import {ColumnDef} from '^lib/GyuridTable';
import {SortedColumnInterface} from '^lib/GyuridTable/features/sortable';
import {isDefinedValue} from '^utils/array';
import {SortedColumnItem} from './SortedColumnItem';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

/**
 * 현재 적용된 정렬 상태(정렬된 컬럼 목록)를 표시하는 제네릭 React 컴포넌트.
 *
 * sortedColumns가 비어 있으면 아무것도 렌더링하지 않으며, 값이 있으면 각 정렬 항목마다 SortedColumnItem을 렌더합니다.
 *
 * @template T - 테이블 데이터 항목의 타입
 * @param columnDefs - 테이블의 컬럼 정의 배열. 각 정렬 항목이 참조하는 컬럼 메타 정보를 제공하기 위해 전달됩니다.
 * @param sortedColumns - 현재 활성화된 정렬 컬럼들의 배열. 기본값은 빈 배열이며, 비어 있으면 컴포넌트는 렌더링을 건너뜁니다.
 * @param setSortedColumns - 선택적 상태 업데이터 함수. 각 SortedColumnItem에 전달되어 정렬 상태를 변경할 수 있습니다.
 */
export function SortStatusSection<T>(props: Props<T>) {
    const {columnDefs, sortedColumns = [], setSortedColumns} = props;

    if (sortedColumns.length === 0) return <></>;

    return (
        <div className="flex items-center text-14 py-2">
            {sortedColumns.map((sortedColumn) => (
                <SortedColumnItem
                    key={sortedColumn.field}
                    sortedColumn={sortedColumn}
                    columnDefs={columnDefs}
                    setSortedColumns={setSortedColumns}
                />
            ))}
        </div>
    );
}
