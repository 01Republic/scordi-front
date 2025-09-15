import {cn} from '^public/lib/utils';
import {WithChildren} from '^types/global.type';
import {CSSProperties, MutableRefObject, useRef} from 'react';
import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {getMinPossibleWidth} from '^lib/GyuridTable/features/column-resizable';

interface ColumnProps<T> extends WithChildren {
    ref?: MutableRefObject<any>;
    columnDef?: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
    className?: string;
    onClick?: () => void;
}

/**
 * 단일 테이블 열 셀을 렌더링하는 제네릭 React 컴포넌트.
 *
 * columnDef와 defaultColDef로부터 flex·width·cellStyle·className을 병합하여 셀의 레이아웃과 스타일을 결정합니다.
 * - flex: `${flex} ${flex} 0%` 형식으로 설정되어 유연한 너비 조정이 가능합니다.
 * - width가 존재하면 minWidth로 적용됩니다.
 * 렌더된 요소는 내부 또는 전달된 ref를 사용하며, data-min-width 속성은 getMinPossibleWidth(ref.current)를 기준으로 설정됩니다.
 *
 * @param props.columnDef - 해당 열에 대한 정의(옵션). `flex`, `width`, `cellStyle`, `className` 등이 있으면 우선 적용됩니다.
 * @param props.defaultColDef - 기본 열 정의(옵션). columnDef에 값이 없을 때 대체로 사용됩니다.
 * @param props.ref - 셀 DOM에 바인딩할 외부 ref(옵션). 전달하지 않으면 내부 ref를 생성합니다.
 * @param props.onClick - 셀 클릭 시 호출되는 선택적 핸들러.
 * @param props.className - 추가로 병합될 CSS 클래스명(옵션).
 * @returns 렌더된 테이블 열 셀의 React 요소
 */
export function Column<T>(props: ColumnProps<T>) {
    const {ref: _ref, columnDef, defaultColDef, className = '', children, onClick} = props;
    const ref = _ref || useRef();

    const flexSize = columnDef?.flex || defaultColDef?.flex || 1;
    const minWidth = columnDef?.width || defaultColDef?.width || 0;
    const cellStyle: CSSProperties = {
        flex: `${flexSize} ${flexSize} 0%`,
        ...defaultColDef?.cellStyle,
        ...columnDef?.cellStyle,
        ...(minWidth ? {minWidth} : {}),
    };

    return (
        <div
            ref={ref}
            className={cn(
                columnDef?.className || '',
                defaultColDef?.className || '',
                `border-b border-gray-200 [border-image:linear-gradient(to right, #e0e0e0, #e0e0e0, transparent) 1] select-none transition-all duration-[20ms] relative cursor-pointer h-[36px] py-[7.5px] px-[8px] whitespace-nowrap overflow-hidden text-ellipsis`,
                className,
            )}
            style={cellStyle}
            onClick={onClick}
            data-min-width={ref.current ? getMinPossibleWidth(ref.current) : 0}
        >
            {children}
        </div>
    );
}
