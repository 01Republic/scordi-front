import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {Dispatch, SetStateAction, useCallback, useEffect, useRef, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {getNewMinWidth} from './getMinPossibleWidth';

interface Props<T> extends WithChildren {
    xIndex: number;
    columnDef: ColumnDef<T>;
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
}

/**
 * 테이블 열을 감싸서 사용자가 가로 너비를 드래그로 조정하거나 더블클릭으로 자동 맞춤할 수 있게 하는 제네릭 React 렌더러.
 *
 * 드래그 중에는 내부 상태와 부모의 columnDefs 배열을 동시에 갱신해 열 너비를 즉시 반영하며,
 * 더블클릭 시에는 getNewMinWidth를 이용해 자동으로 적절한 최소/적정 너비로 리셋합니다.
 *
 * @param xIndex - 이 컴포넌트가 제어하는 열의 0-based 인덱스. 부모 columnDefs의 해당 인덱스에 너비를 기록합니다.
 * @param columnDef - 현재 열 정의(초기 너비 등)를 담고 있는 객체. 초기 너비가 없으면 defaultColDef?.width 또는 0을 사용합니다.
 * @param defaultColDef - 선택적 기본 열 정의(초기 너비의 폴백).
 *
 * @remarks
 * - setColumnDefs를 통해 부모의 열 정의 배열을 직접 갱신합니다(이 파라미터는 문서화에서 생략하지 않고 동작을 명확히 하기 위해 언급).
 * - DOM 참조(ref)가 없을 경우 관련 동작(드래그/더블클릭)이 안전하게 무시됩니다.
 */
export function ColumnResizable<T>(props: Props<T>) {
    const {xIndex, columnDef, setColumnDefs, defaultColDef, children} = props;

    const ref = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(columnDef.width || defaultColDef?.width || 0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!ref.current) return;
            if (!isDragging) return;
            e.preventDefault();
            e.stopPropagation();

            const newWidth = getNewMinWidth(xIndex + 1, ref.current, e.clientX);
            setWidth(newWidth);
            setColumnDefs((columns) => {
                const cols = [...columns];
                cols[xIndex].width = newWidth;
                return cols;
            });
        },
        [ref, isDragging, xIndex, setWidth, setColumnDefs],
    );

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove, setIsDragging]);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [isDragging]);

    return (
        <div ref={ref} className="relative" style={{minWidth: `${width}px`, maxWidth: `${width}px`}}>
            {children}

            <div
                className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize bg-transparent hover:bg-indigo-300/70 active:bg-indigo-500/70"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
                onMouseDown={() => setIsDragging(true)}
                onDoubleClick={(e) => {
                    if (!ref.current) return;
                    e.stopPropagation();
                    e.preventDefault();

                    const newWidth = getNewMinWidth(xIndex + 1, ref.current);
                    setWidth(newWidth);
                    setColumnDefs((columns) => {
                        const cols = [...columns];
                        cols[xIndex].width = newWidth;
                        return cols;
                    });
                }}
            />
        </div>
    );
}
