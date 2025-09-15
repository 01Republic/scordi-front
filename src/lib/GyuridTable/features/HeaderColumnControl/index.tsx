import {WithChildren} from '^types/global.type';
import {ReactNode, useState} from 'react';
import {Instance, Placement} from 'tippy.js';
import {ArrowDownUp, EyeOff, ListFilter, Pin} from 'lucide-react';
import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {MenuContainer, MenuList, MenuItem} from '../MenuDropdown';
import {SortMenu} from './SortMenu';

interface Props<T> extends WithChildren {
    attrs: {
        'data-placement': Placement;
        'data-reference-hidden'?: string;
        'data-escaped'?: string;
    };
    content?: ReactNode;
    instance?: Instance;

    columnDef: ColumnDef<T>;
    defaultColDef?: DefaultColDef<T>;
    headerName: string;
    onClose: () => void;
    onHide?: () => any;
}

/**
 * 테이블 헤더용 열 제어 팝업을 렌더링하는 범용 React 컴포넌트입니다.
 *
 * 기본적으로 필터, 정렬(선택적), 고정, 숨기기(선택적) 메뉴 항목을 포함하는 메뉴 컨테이너를 렌더합니다.
 * - columnDef.onSort가 제공되면 정렬 메뉴가 표시되며, 선택된 정렬 방향으로 columnDef.onSort(String(columnDef.field), direction)를 호출합니다.
 * - onHide가 전달되면 "숨기기" 항목이 표시되고 클릭 시 onHide가 호출됩니다.
 * - 내부 상태 visibleIndex로 현재 호버된(또는 활성화된) 메뉴 항목을 관리하며, close 또는 헤더 마우스 진입 시 초기화됩니다.
 *
 * @template T - 컬럼 정의에 사용되는 행 데이터 타입
 * @returns 렌더된 JSX 엘리먼트 (메뉴 컨테이너)
 */
export function HeaderColumnControl<T>(props: Props<T>) {
    const {attrs, content, instance, children, onClose, onHide} = props;
    const {columnDef, defaultColDef, headerName} = props;
    const [visibleIndex, setVisibleIndex] = useState(-1);

    const close = () => {
        setVisibleIndex(-1);
        onClose();
    };

    return (
        <MenuContainer attrs={attrs} content={content} instance={instance} className="pt-1">
            {children || (
                <div>
                    <div className="select-none py-1 px-2" onMouseEnter={() => setVisibleIndex(-1)}>
                        <div className="h-[28px] py-[3px] px-[6px] bg-gray-200/40 border border-gray-200 rounded-[6px] relative flex items-center">
                            {headerName}
                        </div>
                    </div>

                    <MenuList>
                        <MenuItem isVisible={visibleIndex === 0} onMouseEnter={() => setVisibleIndex(0)}>
                            <div>
                                <ListFilter fontSize={16} />
                            </div>
                            <div>필터</div>
                        </MenuItem>

                        {columnDef.onSort && (
                            <SortMenu
                                isVisible={visibleIndex === 1}
                                onMouseEnter={() => setVisibleIndex(1)}
                                onSort={(direction) => {
                                    columnDef.onSort?.(String(columnDef.field), direction);
                                    close();
                                }}
                            />
                        )}

                        <MenuItem isVisible={visibleIndex === 2} onMouseEnter={() => setVisibleIndex(2)}>
                            <div>
                                <Pin fontSize={16} />
                            </div>
                            <div>고정</div>
                        </MenuItem>

                        {onHide && (
                            <MenuItem
                                isVisible={visibleIndex === 3}
                                onMouseEnter={() => setVisibleIndex(3)}
                                onClick={onHide}
                            >
                                <div>
                                    <EyeOff fontSize={16} />
                                </div>
                                <div>숨기기</div>
                            </MenuItem>
                        )}
                    </MenuList>
                </div>
            )}
        </MenuContainer>
    );
}
