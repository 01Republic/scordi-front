import {ColumnDef} from '^lib/GyuridTable';
import {Eye, EyeOff} from 'lucide-react';
import {MenuItem} from '^lib/GyuridTable/features/MenuDropdown';

interface Props<T> {
    columnDef: ColumnDef<T>;
    onClick: () => any;
}

/**
 * 메뉴 항목으로 렌더링되는 컬럼 표시 항목을 생성합니다.
 *
 * 표시할 텍스트는 `columnDef.headerName`이 우선 사용되며, 없는 경우 `String(columnDef.field)`를 표시합니다.
 * 오른쪽에는 컬럼의 현재 가시성 상태(`columnDef.hide`)에 따라 Eye 또는 EyeOff 아이콘을 보여주는 토글 버튼이 있으며,
 * 버튼 클릭 시 전달된 `onClick` 콜백을 호출합니다.
 *
 * @param columnDef - 렌더링할 컬럼 정의(레이블 및 `hide` 상태 사용)
 * @param onClick - 아이콘 버튼 클릭 시 호출되는 핸들러(가시성 토글 등 부모가 처리)
 * @returns 메뉴용 JSX 요소
 */
export function VisibleColumnItem<T>(props: Props<T>) {
    const {columnDef, onClick} = props;

    return (
        <MenuItem className="hover:bg-white cursor-default">
            <div className="whitespace-nowrap overflow-hidden overflow-ellipsis font-medium">
                {columnDef.headerName || String(columnDef.field)}
            </div>

            <div className="ml-auto">
                <button
                    type="button"
                    className="hover:bg-gray-150 inline-flex items-center justify-center w-[24px] h-[24px] rounded-[6px] transition-all duration-[20ms]"
                    onClick={onClick}
                >
                    {columnDef.hide ? <EyeOff fontSize={14} /> : <Eye fontSize={14} />}
                </button>
            </div>
        </MenuItem>
    );
}
