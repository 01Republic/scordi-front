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
