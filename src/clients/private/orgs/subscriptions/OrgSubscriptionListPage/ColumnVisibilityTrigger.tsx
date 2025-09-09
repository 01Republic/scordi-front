import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {Eye, EyeOff, Settings2, Sparkles, X} from 'lucide-react';
import {visibleColumnsState} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/atom';
import {
    allColumnIds,
    ColumnId,
    requiredColumns,
    columnLabels,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/tableColums';
import {Dropdown} from '^v3/share/Dropdown';
import Tippy from '@tippyjs/react';

export const ColumnVisibilityTrigger = memo(() => {
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
                    // visible={true}
                >
                    <button className=" hover:bg-primaryColor-bg w-5 h-5 flex items-center justify-center rounded-sm">
                        <Settings2 className="cursor-pointer" />
                    </button>
                </Tippy>
            )}
        >
            {({hide}) => (
                <div className="shadow-lg bg-base-100 border border-gray-200 rounded-sm min-w-[16rem]">
                    <div className="flex items-center justify-between p-3 mb-2">
                        <span className="text-sm font-bold">속성</span>
                        <X className="cursor-pointer size-4 font-semibold" onClick={hide} />
                    </div>

                    {/* 표시중인 영역 */}
                    <div className="px-3 py-1 flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-500">표에 표시하기</span>
                        <button
                            type="button"
                            className="text-xs text-scordi opacity-75 hover:underline hover:opacity-100 "
                            onClick={hideAll}
                        >
                            모두 숨기기
                        </button>
                    </div>
                    <ul className="py-2">
                        {visibleColumnIds
                            .filter((id) => !!columnLabels[id]?.trim()) // 빈 라벨 제거(checkBox,actions)
                            .map((id) => {
                                const disable = requiredColumns.includes(id);
                                return (
                                    <li key={id} className="flex items-center justify-between px-3 py-1 text-sm">
                                        <span className="flex items-center gap-1 text-xs">{columnLabels[id]}</span>

                                        <button
                                            className=" hover:bg-primaryColor-bg w-5 h-5 flex items-center justify-center rounded-sm"
                                            onClick={() => toggle(id)}
                                        >
                                            <Eye
                                                className={`size-3 ${
                                                    disable ? 'text-gray-300 pointer-events-none' : ''
                                                } `}
                                            />
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>

                    {/* 숨김중인 영역 */}
                    {hiddeColumnIds.length > 0 && (
                        <>
                            <hr />
                            <div className="px-3 py-2 flex items-center justify-between">
                                <span className="text-xs font-semibold text-gray-500">표에서 숨기기</span>
                                <button
                                    type="button"
                                    className="text-xs text-scordi opacity-75 hover:underline hover:opacity-100 "
                                    onClick={showAll}
                                >
                                    모두 표시하기
                                </button>
                            </div>
                            <ul className="max-h-60 overflow-auto py-1">
                                {hiddeColumnIds.map((id) => (
                                    <li key={id} className="flex items-center justify-between px-3 py-1">
                                        <span className="flex items-center gap-1 text-xs">{columnLabels[id]}</span>
                                        <button
                                            className=" hover:bg-primaryColor-bg w-5 h-5 flex items-center justify-center rounded-sm"
                                            onClick={() => toggle(id)}
                                        >
                                            <EyeOff className="size-3" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </Dropdown>
    );
});
