import {useMemo} from 'react';
import {ColumnDef, DefaultColDef, EmailCellColumn, MonoSelectCellColumn, UrlCellColumn} from '^lib/GyuridTable';
import {AutoCellColumn, BooleanCellColumn, DateCellColumn, NumberCellColumn, TextCellColumn} from './cellType';

interface DataColumnProps<T> {
    entry: T;
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
    className?: string;
}

/**
 * 주어진 열 정의(columnDef)와 데이터 항목(entry)에 따라 적절한 셀 컴포넌트를 렌더링합니다.
 *
 * 상세:
 * - columnDef.valueGetter가 있으면 그 결과를 값으로 사용하고, 없으면 columnDef.field를 문자열로 변환해 entry에서 해당 필드를 읽어옵니다. 필드가 없거나 값이 undefined이면 빈 문자열을 반환합니다.
 * - 값은 useMemo로 메모이제이션되며 의존성은 entry와 columnDef입니다.
 * - columnDef.cellType?.name에 따라 각 셀 타입에 맞는 CellColumn 컴포넌트를 선택해 렌더링합니다:
 *   - 'email' -> EmailCellColumn
 *   - 'url' -> UrlCellColumn
 *   - 'text' -> TextCellColumn
 *   - 'number' -> NumberCellColumn (컴포넌트에 key로 value 전달)
 *   - 'boolean' -> BooleanCellColumn (컴포넌트에 key로 value 전달)
 *   - 'date' -> DateCellColumn
 *   - 'mono-select' -> MonoSelectCellColumn
 *   - 'multi-select', 'file', 'function', 'profile', 'reference' -> TextCellColumn
 *   - 그 외 -> AutoCellColumn
 *
 * @returns 렌더링된 셀용 JSX 엘리먼트
 */
export function DataColumn<T>(props: DataColumnProps<T>) {
    const {entry, columnDef, defaultColDef, className = ''} = props;

    const value = useMemo(() => {
        if (columnDef.valueGetter) return columnDef.valueGetter({data: entry});
        if (!columnDef.field) return '';

        const field = String(columnDef.field);

        return (entry as any)?.[field] ?? '';
    }, [entry, columnDef]);

    const cellColumnProps = {value, className, columnDef, defaultColDef};

    switch (columnDef.cellType?.name) {
        case 'email': // 이메일
            return <EmailCellColumn {...cellColumnProps} />;
        case 'url': // URL
            return <UrlCellColumn {...cellColumnProps} />;
        case 'text': // 텍스트
            return <TextCellColumn {...cellColumnProps} />;
        case 'number': // 숫자
            return <NumberCellColumn key={value} {...cellColumnProps} />;
        case 'boolean': // 체크박스
            return <BooleanCellColumn key={value} {...cellColumnProps} />;
        case 'date': // 날짜
            return <DateCellColumn {...cellColumnProps} />;
        case 'mono-select': // 선택
            return <MonoSelectCellColumn {...cellColumnProps} />;
        case 'multi-select': // 다중선택
        case 'file': // 파일과 미디어
        case 'function': // 수식
        case 'profile': // 사람
        case 'reference': // 관계형
            return <TextCellColumn {...cellColumnProps} />;
        default:
            return <AutoCellColumn {...cellColumnProps} />;
    }
}
