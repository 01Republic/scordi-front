import {Column} from '^lib/GyuridTable';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {getColor, palette} from '^components/util/palette';
import {CellColumnProps} from './CellColumn.interface';

export interface MonoSelectCellColumnType {
    name: 'mono-select';
}

/**
 * 단일 선택(mono-select) 셀을 렌더링하는 테이블 셀 컴포넌트입니다.
 *
 * 전달된 셀 값의 문자열 길이를 기준으로 색상 클래스를 계산하여 TagUI로 값을 스타일링해 출력합니다.
 *
 * @returns 테이블용 컬럼 컨테이너(Column) 내부에 스타일링된 TagUI 요소를 포함한 JSX 엘리먼트
 */
export function MonoSelectCellColumn<T>(props: CellColumnProps<T>) {
    const {value, className = '', columnDef, defaultColDef} = props;
    const cellType = columnDef.cellType as MonoSelectCellColumnType | undefined;
    const colorClass = getColor(`${value}`.length, palette.notionColors);

    return (
        <div>
            <Column columnDef={columnDef} defaultColDef={defaultColDef} className={className}>
                <TagUI className={colorClass} noMargin>
                    {value}
                </TagUI>
            </Column>
        </div>
    );
}
