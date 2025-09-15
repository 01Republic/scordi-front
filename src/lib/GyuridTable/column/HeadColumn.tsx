import {Dispatch, SetStateAction, useState} from 'react';
import Tippy from '@tippyjs/react/headless';
import {Column, ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {HeaderColumnControl} from '^lib/GyuridTable/features/HeaderColumnControl';
import {ColumnResizable} from '^lib/GyuridTable/features/column-resizable';

interface HeadColumnProps<T> {
    xIndex: number;
    columnDef: ColumnDef<T>;
    columnDefs: ColumnDef<T>[];
    setColumnDefs: Dispatch<SetStateAction<ColumnDef<T>[]>>;
    defaultColDef?: DefaultColDef<T>;
    onHide?: () => any;
}

/**
 * 테이블 헤더 셀을 렌더링합니다. 헤더 클릭 시 컬럼 설정 팝오버(HeaderColumnControl)를 표시하며, 컬럼 크기 조절 기능을 포함합니다.
 *
 * 상세:
 * - 표시되는 헤더 텍스트는 `columnDef.headerName`이 없으면 `String(columnDef.field)`를 사용합니다.
 * - 클릭하면 headless Tippy 팝오버가 열리고, 외부 클릭 또는 컨트롤의 닫기 동작으로 닫힙니다.
 * - `ColumnResizable`를 통해 컬럼 너비 조절이 가능하고, 내부 `HeaderColumnControl`에 `columnDef`와 `defaultColDef`를 전달합니다.
 * - `onHide` prop이 전달되면 팝오버를 닫기 전에 해당 콜백을 호출합니다.
 *
 * @template T - 컬럼 정의에 사용되는 레코드 타입
 * @returns 렌더된 헤더 셀 JSX 요소
 */
export function HeadColumn<T>(props: HeadColumnProps<T>) {
    const {xIndex, columnDef, columnDefs, setColumnDefs, defaultColDef, onHide} = props;
    const [isVisible, setIsVisible] = useState(false);

    const headerName = columnDef.headerName || String(columnDef.field);

    return (
        <Tippy
            visible={isVisible}
            placement="bottom-start"
            interactive
            interactiveDebounce={100}
            offset={[0, -2]}
            onClickOutside={() => setIsVisible(false)}
            render={(attrs, content, instance) => (
                <HeaderColumnControl
                    attrs={attrs}
                    content={content}
                    instance={instance}
                    columnDef={columnDef}
                    defaultColDef={defaultColDef}
                    headerName={headerName}
                    onClose={() => setIsVisible(false)}
                    onHide={
                        onHide
                            ? () => {
                                  onHide();
                                  setIsVisible(false);
                              }
                            : undefined
                    }
                />
            )}
        >
            <div>
                <ColumnResizable
                    xIndex={xIndex}
                    columnDef={columnDef}
                    setColumnDefs={setColumnDefs}
                    defaultColDef={defaultColDef}
                >
                    <Column
                        columnDef={columnDef}
                        defaultColDef={defaultColDef}
                        className="text-gray-500 font-[500] hover:bg-gray-100/70 active:bg-gray-300/70 border-b-2 flex items-center"
                        onClick={() => setIsVisible(true)}
                    >
                        <div>{headerName}</div>
                    </Column>
                </ColumnResizable>
            </div>
        </Tippy>
    );
}
