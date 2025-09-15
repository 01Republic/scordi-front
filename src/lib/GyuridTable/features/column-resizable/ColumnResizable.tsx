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
