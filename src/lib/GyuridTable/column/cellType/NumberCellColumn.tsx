import {cn} from '^public/lib/utils';
import {currencyFormatStr, unitFormat} from '^utils/number';
import {Column} from '^lib/GyuridTable';
import {CellColumnProps} from './CellColumn.interface';

export interface NumberCellColumnType {
    name: 'number';
    format?: 'thousand' | 'currency' | 'unit' | 'number';
    currencyFormat?: {unit?: string; format?: string};
    unitFormat?: {unit?: string; format?: string};
}

/**
 * 숫자 값을 표시하는 테이블 셀 컴포넌트를 렌더링합니다.
 *
 * format에 따라 값의 표기를 조정합니다:
 * - 'currency': currencyFormatStr을 사용하여 통화 형식으로 렌더링합니다. (cellType.currencyFormat의 `unit` 및 `format` 사용)
 * - 'unit': unitFormat을 사용하여 단위 형식으로 렌더링합니다. (cellType.unitFormat의 `unit` 및 `format` 사용)
 * - 'thousand': Number(value).toLocaleString()로 천 단위 구분자를 적용합니다.
 * - 'number' (기본): 원래 값을 그대로 렌더링합니다.
 *
 * 선택적 포맷 설정이 없을 경우 안전한 빈 객체를 사용하며,
 * 통화 포맷은 값을 문자열로, 단위 포맷은 값으로 Number 변환을 수행합니다.
 * 셀 내용은 오른쪽 정렬('text-right')로 표시됩니다.
 *
 * @returns 렌더링된 테이블 셀 노드
 */
export function NumberCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as NumberCellColumnType | undefined;
    const format = cellType?.format || 'number';

    const _currencyFormat = cellType?.currencyFormat || {};
    const _unitFormat = cellType?.unitFormat || {};

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={cn(`text-right`, className)}>
                {format === 'currency'
                    ? currencyFormatStr(`${value}`, _currencyFormat.unit, _currencyFormat.format)
                    : format === 'unit'
                    ? unitFormat(Number(value), _unitFormat.unit, _unitFormat.format)
                    : format === 'thousand'
                    ? Number(value).toLocaleString()
                    : value}
            </Column>
        </div>
    );
}
