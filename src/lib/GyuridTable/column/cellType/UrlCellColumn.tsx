import {Column, CellColumnProps} from '^lib/GyuridTable';

export interface UrlCellColumnType {
    name: 'url';
}

/**
 * 셀 값(value)을 Column 컴포넌트로 렌더링하는 제네릭 React 셀 컴포넌트.
 *
 * Column에는 전달된 columnDef와 defaultColDef, className이 적용되며,
 * 렌더링되는 내용은 `value` 또는 `null`/`undefined`일 때 빈 문자열입니다.
 * 내부적으로 columnDef.cellType는 UrlCellColumnType('url')으로 취급하지만,
 * 이 컴포넌트는 해당 정보를 이용해 별도의 URL 포맷팅이나 링크 생성은 하지 않습니다.
 *
 * @template T - 셀이 속한 행(row) 타입
 * @param props - CellColumnProps<T> 형태의 컴포넌트 입력값
 * @returns 렌더된 JSX 요소
 */
export function UrlCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as UrlCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value ?? ''}
            </Column>
        </div>
    );
}
