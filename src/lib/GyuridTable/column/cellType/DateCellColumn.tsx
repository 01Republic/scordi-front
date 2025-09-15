import {lpp} from '^utils/dateTime';
import {Column} from '^lib/GyuridTable';
import {CellColumnProps} from './CellColumn.interface';

export interface DateCellColumnType {
    name: 'date';
    format?: string;
}

/**
 * 날짜 값을 포맷하여 GyuridTable의 셀로 렌더링하는 React 컴포넌트입니다.
 *
 * columnDef.cellType가 DateCellColumnType이면 그 안의 `format`을 사용하여 값을 포맷하고,
 * 없으면 기본 포맷 문자열 `'P'`를 사용합니다.
 *
 * @param props - CellColumnProps로 전달된 전체 셀 속성 (value, className, columnDef, defaultColDef 등)
 * @returns 렌더링된 테이블 셀(JSX.Element)
 */
export function DateCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as DateCellColumnType | undefined;
    const formatStr = cellType?.format || 'P';

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                {lpp(value, formatStr)}
            </Column>
        </div>
    );
}
