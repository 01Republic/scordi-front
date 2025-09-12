import {ReactNode, useState} from 'react';
import {WithChildren} from '^types/global.type';
import {Instance, Placement} from 'tippy.js';
import {ColumnDef, DefaultColDef} from '^lib/GyuridTable';
import {MenuContainer, MenuList, MenuItem} from '../MenuDropdown';
import {SortMenu} from '^lib/GyuridTable/features/HeaderColumnControl/SortMenu';
import {ArrowDownUp, EyeOff, ListFilter, Pin} from 'lucide-react';

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
