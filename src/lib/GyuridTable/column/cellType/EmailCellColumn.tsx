import {Column, CellColumnProps} from '^lib/GyuridTable';

export interface EmailCellColumnType {
    name: 'email';
}

/**
 * 이메일 형식의 테이블 셀을 렌더링합니다.
 *
 * 전달된 CellColumnProps의 value를 표시하며, value가 null 또는 undefined면 빈 문자열을 렌더링합니다.
 * Column 컴포넌트로 래핑하여 columnDef와 defaultColDef, className을 전달합니다.
 *
 * @template T - 행 데이터의 타입
 * @returns 렌더링된 JSX 엘리먼트
 */
export function EmailCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as EmailCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value ?? ''}
            </Column>
        </div>
    );
}
