import {Dispatch, SetStateAction} from 'react';
import {ColumnDef, SortedColumnInterface, SortStatusSection} from '^lib/GyuridTable';
import {Button} from '^lib/GyuridTable/ui';
import {CheckedAction, CheckedItemsControl} from '^lib/GyuridTable/features/row-checkbox';

interface Props<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;
    checkedEntries?: T[];
    actions?: CheckedAction<T>[];
}

/**
 * 테이블 행 작업 영역(체크된 항목 제어 및 정렬 상태 표시)을 렌더링한다.
 *
 * 제공된 props에 따라 다음을 조건부로 렌더링한다:
 * - 체크된 항목이 존재하면 CheckedItemsControl (체크된 항목 조작 UI)
 * - 정렬 상태가 존재하면 SortStatusSection (정렬 상태 표시) 및 우측의 "초기화" 버튼
 *
 * 컴포넌트는 체크된 항목과 정렬 상태가 모두 비어 있으면 아무것도 렌더링하지 않는다.
 *
 * @template T - 행 데이터 타입
 * @returns JSX.Element 렌더된 작업 영역 또는 빈 프래그먼트
 */
export function WorkDesk<T>(props: Props<T>) {
    const {columnDefs, setColumnDefs, sortedColumns = [], setSortedColumns, checkedEntries = [], actions = []} = props;

    const isChecking = !!checkedEntries.length;
    const isSorting = !!sortedColumns.length;

    if (!isSorting && !isChecking) return <></>;

    return (
        <>
            <hr className="mt-4" />

            <div className="flex items-center w-full py-1">
                <div className="flex items-center w-full">
                    {isChecking && (
                        <CheckedItemsControl
                            checkedEntries={checkedEntries}
                            columnDefs={columnDefs}
                            setColumnDefs={setColumnDefs}
                            sortedColumns={sortedColumns}
                            setSortedColumns={setSortedColumns}
                            actions={actions}
                        />
                    )}

                    {isSorting && (
                        <SortStatusSection
                            columnDefs={columnDefs}
                            sortedColumns={sortedColumns}
                            setSortedColumns={setSortedColumns}
                        />
                    )}
                </div>

                <div className="flex items-center ml-auto">
                    {isSorting && (
                        <Button ghost onClick={() => setSortedColumns && setSortedColumns([])}>
                            초기화
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
