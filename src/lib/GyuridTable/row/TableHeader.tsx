import {Dispatch, SetStateAction} from 'react';
import {Column, ColumnDef, DefaultColDef, HeadColumn} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {useVisibleColumns} from '^lib/GyuridTable/features/column-visibility';

interface TableHeaderProps<T> {
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    onCheck?: (checked: boolean) => any;
}

/**
 * 테이블의 헤더 행을 렌더링한다.
 *
 * 주어진 columnDefs 배열을 바탕으로 각 열의 헤더(HeadColumn)를 생성하고,
 * useVisibleColumns 훅을 사용해 열 숨김 동작(onHide)을 연결한다.
 * 선택적 onCheck 콜백이 제공되면 왼쪽에 체크박스를 표시하며, 체크 상태 변경 시 해당 콜백에 boolean 값을 전달한다.
 *
 * @template T - 행 데이터의 타입
 * @param props - TableHeader 구성 props. 주요 동작:
 *   - columnDefs/setColumnDefs: 헤더와 열 가시성 관리를 위한 정의 및 업데이트 함수
 *   - defaultColDef: 열 기본 설정(옵션)
 *   - onCheck: 존재하면 왼쪽 체크박스와 폭 조정이 활성화되고, 체크 변경 시 호출됨(checked: boolean)
 * @returns 렌더된 헤더 행의 JSX 요소
 */
export function TableHeader<T>(props: TableHeaderProps<T>) {
    const {columnDefs, setColumnDefs, defaultColDef, onCheck} = props;
    const {hideColumn} = useVisibleColumns(columnDefs, setColumnDefs);

    return (
        <li className="flex min-h-[36px] items-center group/header bg-white sticky top-0 z-[1]">
            <Column
                defaultColDef={defaultColDef}
                className={`${
                    onCheck ? '!min-w-fit !max-w-fit' : '!min-w-0 !max-w-0 p-0'
                } flex items-center border-b-2`}
            >
                {onCheck && <Checkbox className="gyurid-header-checkbox" onChange={(e) => onCheck(e.target.checked)} />}
            </Column>

            {columnDefs.map((columnDef, index) => (
                <HeadColumn
                    key={index}
                    xIndex={index}
                    columnDef={columnDef}
                    columnDefs={columnDefs}
                    setColumnDefs={setColumnDefs}
                    defaultColDef={defaultColDef}
                    onHide={() => hideColumn(String(columnDef.field))}
                />
            ))}
        </li>
    );
}
