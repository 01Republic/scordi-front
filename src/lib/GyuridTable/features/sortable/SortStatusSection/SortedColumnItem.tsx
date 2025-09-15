import {Dispatch, SetStateAction} from 'react';
import {ArrowDown, ArrowUp, X} from 'lucide-react';
import {ColumnDef} from '^lib/GyuridTable';
import {SortedColumnInterface} from '^lib/GyuridTable/features/sortable';

interface Props<T> {
    sortedColumn: SortedColumnInterface;
    columnDefs: ColumnDef<T>[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
}

/**
 * 정렬된 단일 컬럼을 '칩' 형태로 렌더링하고(필드 레이블 + ASC/DESC 아이콘) 사용자가 클릭하면 정렬 방향을 토글하거나(클릭), 제공된 경우 정렬을 제거(우측 X 버튼)합니다.
 *
 * 상세:
 * - 표시: 해당 컬럼의 `headerName`(없으면 `field`)과 현재 `sortVal`에 맞는 화살표 아이콘을 보여줍니다.
 * - 상호작용:
 *   - 전체 칩 클릭: `setSortedColumns`가 제공되면 해당 컬럼만 남긴 채 `sortVal`을 ASC↔DESC로 토글합니다.
 *   - 우측 X 클릭: 이벤트 전파를 중단하고 `setSortedColumns([])`를 호출하여 정렬을 제거합니다.
 *
 * @template T - 컬럼 정의의 제네릭 타입
 */
export function SortedColumnItem<T>(props: Props<T>) {
    const {sortedColumn, columnDefs, setSortedColumns} = props;

    const {field, sortKey, sortVal} = sortedColumn;
    const columnDef = columnDefs.find((c) => c.field === field);

    return (
        <div
            className="select-none cursor-pointer inline-flex h-[24px] leading-[24px] items-center justify-center whitespace-nowrap gap-1 py-0 px-2 text-14 text-indigo-600 bg-indigo-100/60 hover:bg-indigo-200/60 transition-all rounded-[32px]"
            onClick={() => {
                setSortedColumns &&
                    setSortedColumns([
                        {
                            field,
                            sortKey,
                            sortVal: sortVal === 'ASC' ? 'DESC' : 'ASC',
                        },
                    ]);
            }}
        >
            <div>
                {sortVal === 'ASC' && <ArrowUp fontSize={16} />}
                {sortVal === 'DESC' && <ArrowDown fontSize={16} />}
            </div>

            <div>{columnDef?.headerName || field}</div>

            {setSortedColumns && (
                <div
                    className="px-0.5"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setSortedColumns && setSortedColumns([]);
                    }}
                >
                    <X fontSize={12} />
                </div>
            )}
        </div>
    );
}
