import {cn} from '^public/lib/utils';
import {Dispatch, SetStateAction, useMemo} from 'react';
import {TableFooter, TableFooterProps, TableHeader, TableRow, WorkDesk} from './row';
import {ColumnDef, DefaultColDef, useColumnDefs, useDefaultColDef} from './column';
import {ViewButtonsSection} from './views';
import {useVisibleColumns} from './features/column-visibility';
import {SortedColumnInterface} from './features/sortable';
import {BulkActionSection} from './features/bulk-actions';
import {LoadingStatus} from './features/loading-state';
import {CheckedAction, useRowCheckbox} from './features/row-checkbox';

interface GyuridTableConfig<T> {
    entries: T[];
    columnDefs: ColumnDef<T>[];
    setColumnDefs?: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    isLoading?: boolean;
    className?: string;
    sortedColumns?: SortedColumnInterface[];
    setSortedColumns?: Dispatch<SetStateAction<SortedColumnInterface[]>>;

    onSearch?: (value: string) => any;
    paging?: TableFooterProps<T>;

    checkbox?: boolean;
    actions?: CheckedAction<T>[];
}

/**
 * 제네릭 테이블 컴포넌트를 렌더링합니다.
 *
 * GyuridTable은 제네릭 타입 T의 엔트리 배열을 받아 컬럼 정의, 가시성, 정렬, 페이징,
 * 선택(체크박스), 대량 작업 액션을 지원하는 데이터 테이블 UI를 렌더링합니다.
 *
 * 주요 동작:
 * - columnDefs와 defaultColDef를 받아 컬럼 표시/정렬 동작을 구성합니다.
 * - entries 배열을 기반으로 각 행을 렌더링하며, checkbox prop이 true면 전체/개별 체크박스 기능을 활성화합니다.
 * - sortedColumns/state와 setSortedColumns를 상위로 전달하여 정렬 상태를 공유합니다.
 * - onSearch는 BulkActionSection으로 전달되어 검색 동작을 연결합니다.
 * - actions는 WorkDesk 및 각 TableRow에 전달되어 행 단위 또는 선택된 항목에 대한 액션을 제공합니다.
 *
 * @template T - 테이블에 렌더링할 엔트리의 항목 타입
 * @param props - GyuridTableConfig<T> 구성 객체. checkbox(true일 때 체크박스 동작 활성화), entries(렌더링할 데이터 배열), columnDefs/defaultColDef(컬럼 설정), sortedColumns/setSortedColumns(정렬 상태), paging(푸터 페이징), isLoading, onSearch, actions 등을 포함합니다.
 * @returns 렌더된 테이블 React 요소
 */
export function GyuridTable<T>(props: GyuridTableConfig<T>) {
    const {entries, isLoading = false, className = ''} = props;
    const {defaultColDef: _defaultColDef, columnDefs: _columnDefs, setColumnDefs: _setColumnDefs} = props;
    const {paging = {}, onSearch, checkbox = false, actions} = props;
    const {sortedColumns, setSortedColumns} = props;

    const defaultColDef = useDefaultColDef(_defaultColDef);
    const [columnDefs, setColumnDefs] = _setColumnDefs ? [_columnDefs, _setColumnDefs] : useColumnDefs(_columnDefs);
    const {getVisibles} = useVisibleColumns(columnDefs, setColumnDefs);
    const visibleColumns = useMemo(() => getVisibles(columnDefs), [columnDefs]);

    const {changeCheckboxAll, changeCheckbox, getAllCheckedEntries} = useRowCheckbox<T>();

    return (
        <div className={cn(`relative text-14 w-full`, className)}>
            <div className="flex items-center w-full mb-4">
                <div className="flex items-center w-full">
                    <ViewButtonsSection
                        columnDefs={columnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                    />
                </div>

                <div className="flex items-center ml-auto">
                    <LoadingStatus isLoading={isLoading} />

                    <BulkActionSection
                        columnDefs={columnDefs}
                        setColumnDefs={setColumnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                        onSearch={onSearch}
                    />
                </div>
            </div>

            <WorkDesk
                columnDefs={columnDefs}
                setColumnDefs={setColumnDefs}
                sortedColumns={sortedColumns}
                setSortedColumns={setSortedColumns}
                checkedEntries={getAllCheckedEntries(entries)}
                actions={actions}
            />

            {/* Table */}
            <ul className="overflow-x-auto w-full">
                <TableHeader
                    columnDefs={visibleColumns}
                    setColumnDefs={setColumnDefs}
                    defaultColDef={defaultColDef}
                    onCheck={checkbox ? changeCheckboxAll : undefined}
                />
                {entries.map((entry, index) => (
                    <TableRow
                        key={index}
                        yIndex={index}
                        entry={entry}
                        defaultColDef={defaultColDef}
                        columnDefs={visibleColumns}
                        setColumnDefs={setColumnDefs}
                        sortedColumns={sortedColumns}
                        setSortedColumns={setSortedColumns}
                        onCheck={checkbox ? changeCheckbox : undefined}
                        actions={actions}
                    />
                ))}
            </ul>

            <TableFooter {...paging} />
        </div>
    );
}
