import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import Tippy from '@tippyjs/react';
import {Settings2, X} from 'lucide-react';
import {eventCut} from '^utils/event';
import {visibleColumnsState} from '../atom';
import {allColumnIds, ColumnId, columnLabels, requiredColumns} from './tableColumns';
import {Dropdown} from '^v3/share/Dropdown';
import {TableColumnExposeControlSection} from './TableColumnExposeControlSection';

export const TableColumnsHandler = memo(() => {
    const [visible, setVisible] = useRecoilState(visibleColumnsState);
    const visibleSet = new Set(visible);

    const visibleColumnIds = allColumnIds.filter((id) => visibleSet.has(id));
    const hiddeColumnIds = allColumnIds.filter((id) => !visibleSet.has(id));

    const toggle = (id: ColumnId) => {
        if (requiredColumns.includes(id)) return;
        setVisible((prev) => (prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]));
    };

    const hideAll = () => setVisible([...requiredColumns]);
    const showAll = () => setVisible([...allColumnIds]);

    return (
        <Dropdown
            isAutoClose={false}
            placement="bottom-start"
            Trigger={() => (
                <Tippy
                    content={
                        <div className="text-12 text-center">
                            <span>속성</span>
                        </div>
                    }
                >
                    <button className=" hover:bg-primaryColor-bg w-5 h-5 flex items-center justify-center rounded-sm">
                        <Settings2 className="cursor-pointer" />
                    </button>
                </Tippy>
            )}
        >
            {({hide}) => (
                <div
                    className="shadow-lg bg-base-100 border border-gray-200 rounded-sm min-w-[16rem]"
                    onClick={eventCut}
                >
                    <div className="flex items-center justify-between p-3 mb-2">
                        <span className="text-sm font-bold">속성</span>
                        <X className="cursor-pointer size-4 font-semibold" onClick={hide} />
                    </div>

                    {/* 표시중인 영역 */}
                    <TableColumnExposeControlSection
                        headerLabel="표에 표시하기"
                        headerButtonText="모두 숨기기"
                        headerOnClick={hideAll}
                        columnIds={visibleColumnIds}
                        requiredIds={requiredColumns}
                        itemOnClick={toggle}
                        labelMap={columnLabels}
                        isIconType={true}
                    />

                    {/* 숨김중인 영역 */}
                    {hiddeColumnIds.length > 0 && (
                        <>
                            <hr />
                            <TableColumnExposeControlSection
                                headerLabel="표에서 숨기기"
                                headerButtonText="모두 표시하기"
                                headerOnClick={showAll}
                                columnIds={hiddeColumnIds}
                                itemOnClick={toggle}
                                labelMap={columnLabels}
                                isIconType={false}
                            />
                        </>
                    )}
                </div>
            )}
        </Dropdown>
    );
});
