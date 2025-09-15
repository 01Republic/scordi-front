import {Column, CellColumnProps} from '^lib/GyuridTable';

export interface TextCellColumnType {
    name: 'text';
}

/**
 * GyuridTable용 텍스트 셀 렌더러를 제공하는 제네릭 React 컴포넌트.
 *
 * 지정된 셀 값(`props.value`)을 텍스트로 렌더링하며, 값이 nullish이면 빈 문자열을 표시합니다.
 * 전달된 `columnDef`와 `defaultColDef`는 내부 `Column` 컴포넌트에 그대로 전달되고, `className`은 컬럼 컨테이너에 적용됩니다.
 *
 * @param props - CellColumnProps<T> 타입의 속성 객체. 주요 필드:
 *   - value: 셀에 렌더링할 값 (nullish이면 빈 문자열로 대체)
 *   - className: 컬럼에 적용할 추가 CSS 클래스 (기본값: '')
 *   - columnDef, defaultColDef: 내부 Column에 전달되는 컬럼 정의
 * @returns JSX 요소로 렌더된 셀 컨텐츠
 */
export function TextCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as TextCellColumnType | undefined;

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {value ?? ''}
            </Column>
        </div>
    );
}
