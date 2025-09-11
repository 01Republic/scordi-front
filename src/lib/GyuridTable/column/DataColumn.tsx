import {useMemo} from 'react';
import {ColumnDef, DefaultColDef, EmailCellColumn, MonoSelectCellColumn, UrlCellColumn} from '^lib/GyuridTable';
import {AutoCellColumn, BooleanCellColumn, DateCellColumn, NumberCellColumn, TextCellColumn} from './cellType';

interface DataColumnProps<T> {
    entry: T;
    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
}

export function DataColumn<T>(props: DataColumnProps<T>) {
    const {entry, columnDef, defaultColDef} = props;

    const value = useMemo(() => {
        if (columnDef.valueGetter) return columnDef.valueGetter({data: entry});
        if (!columnDef.field) return '';

        const field = String(columnDef.field);

        return (entry as any)?.[field] ?? '';
    }, [entry, columnDef]);

    const className = `border-r last:border-r-0`;

    const cellColumnProps = {value, className, columnDef, defaultColDef};

    switch (columnDef.cellType?.name) {
        case 'email': // 이메일
            return <EmailCellColumn {...cellColumnProps} />;
        case 'url': // URL
            return <UrlCellColumn {...cellColumnProps} />;
        case 'text': // 텍스트
            return <TextCellColumn {...cellColumnProps} />;
        case 'number': // 숫자
            return <NumberCellColumn {...cellColumnProps} />;
        case 'boolean': // 체크박스
            return <BooleanCellColumn {...cellColumnProps} />;
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
