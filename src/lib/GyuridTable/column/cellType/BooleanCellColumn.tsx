import {Column} from '^lib/GyuridTable';
import {Checkbox} from '^lib/GyuridTable/ui';
import {CellColumnProps} from './CellColumn.interface';

export interface BooleanCellColumnType {
    name: 'boolean';
}

/**
 * 읽기 전용 체크박스로 boolean 셀을 렌더링하는 React 컴포넌트.
 *
 * Column 컨테이너 안에 disabled 상태의 Checkbox를 배치하여 전달된 `value`의 진릿값(!!value)을 초기 체크 상태로 표시합니다.
 * 테이블의 셀 렌더러로 사용되며 사용자 입력으로 상태를 변경할 수 없습니다.
 *
 * @returns 렌더된 JSX 요소 (Column 내에 disabled Checkbox)
 */
export function BooleanCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as BooleanCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                <Checkbox defaultChecked={!!value} disabled />
            </Column>
        </div>
    );
}
