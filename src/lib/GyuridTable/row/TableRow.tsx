import {Column, ColumnDef, DataColumn, DefaultColDef, SortedColumnInterface} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {TableRowControl} from './TableRowControl';
import {CheckedAction} from '^lib/GyuridTable/features/row-checkbox';
import {Dispatch, SetStateAction} from 'react';

interface TableRowProps<T> {
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
 * 테이블의 단일 행을 렌더링하는 제네릭 컴포넌트입니다.
 *
 * 주어진 `columnDefs`에 따라 각 셀을 DataColumn으로 렌더링하고, 선택 가능한 행인 경우 왼쪽에 체크박스를 표시합니다.
 * 체크박스는 `onCheck`이 제공될 때만 렌더링되며, 변경 시 onCheck(yIndex, checked)를 호출합니다.
 * 첫 번째 데이터 열의 왼쪽 경계(border-l)는 체크박스 존재 여부 및 열 인덱스에 따라 조건적으로 적용됩니다.
 *
 * @template T - 행 데이터의 타입
 * @param props - TableRowProps<T> 타입의 속성들. 주요 동작은 다음과 같습니다:
 *   - entry, columnDefs, defaultColDef: 각 셀 렌더링에 전달됩니다.
 *   - onCheck: 제공되면 행 앞에 체크박스를 표시하고 변경 시 호출됩니다.
 * @returns 렌더된 행의 JSX 요소
 */
export function TableRow<T>(props: TableRowProps<T>) {
    const {yIndex, entry, columnDefs, defaultColDef, onCheck} = props;

    return (
        <TableRowControl {...props}>
            <li className="flex min-h-[36px] items-center group/row transition-all duration-[20ms]">
                <Column
                    defaultColDef={defaultColDef}
                    className={`${onCheck ? '!min-w-fit !max-w-fit' : '!min-w-0 !max-w-0 p-0'} flex items-center`}
                >
                    {onCheck && (
                        <Checkbox className="gyurid-row-checkbox" onChange={(e) => onCheck(yIndex, e.target.checked)} />
                    )}
                </Column>

                {columnDefs.map((columnDef, index) => (
                    <DataColumn
                        key={index}
                        entry={entry}
                        columnDef={columnDef}
                        defaultColDef={defaultColDef}
                        className={!onCheck && index === 0 ? '' : `border-l`}
                    />
                ))}
            </li>
        </TableRowControl>
    );
}
