import {
    Column,
    CellColumnProps,
    TextCellColumn,
    NumberCellColumn,
    DateCellColumn,
    BooleanCellColumn,
} from '^lib/GyuridTable';

/**
 * 주어진 셀 값의 런타임 타입에 따라 적절한 GyuridTable 셀 컴포넌트를 렌더링합니다.
 *
 * 값의 타입에 따라 아래와 같이 동작합니다:
 * - boolean: BooleanCellColumn을 렌더링(키는 true=1, false=0).
 * - number: NumberCellColumn을 렌더링(키는 숫자 값).
 * - undefined | function | null | 일반 객체(배열/파일/기타): Column 컴포넌트로 래핑하여 문자열 표현이나 적절한 대체 내용을 렌더링.
 *   - undefined, function: 빈 문자열로 대체될 수 있음.
 *   - null: 빈 문자열을 렌더링.
 *   - Array: 요소들을 ", "로 조인하여 표시.
 *   - Date: DateCellColumn을 렌더링.
 *   - File: 파일의 name을 표시.
 * - 그 외(위 분기들에 해당하지 않는 경우): TextCellColumn을 렌더링.
 *
 * @param props - CellColumnProps<T> 형태의 props; 특히 `props.value`의 런타임 타입에 따라 렌더링 동작이 결정됩니다.
 * @returns 렌더링된 테이블 셀용 React 요소
 */
export function AutoCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;

    if (typeof value === 'boolean') return <BooleanCellColumn key={value ? 1 : 0} {...props} />;
    if (typeof value === 'number') return <NumberCellColumn key={value} {...props} />;
    if (typeof value === 'undefined')
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    if (typeof value === 'function')
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    if (value === null)
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {''}
                </Column>
            </div>
        );
    if (typeof value === 'object') {
        if (Array.isArray(value))
            return (
                <div>
                    <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                        {value.join(', ')}
                    </Column>
                </div>
            );
        if (value instanceof Date) return <DateCellColumn {...props} />;
        if (value instanceof File)
            return (
                <div>
                    <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                        {value.name}
                    </Column>
                </div>
            );
        return (
            <div>
                <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                    {value || ''}
                </Column>
            </div>
        );
    }

    return <TextCellColumn {...props} />;
}
