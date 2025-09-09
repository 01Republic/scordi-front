import React, {memo} from 'react';
import {useRecoilState} from 'recoil';
import {Eye, EyeOff, Settings2, X} from 'lucide-react';
import {visibleColumnsState} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/atom';
import {
    allColumnIds,
    ColumnId,
    requiredColumns,
    columnLabels,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionListPage/tableColums';
import {Dropdown} from '^v3/share/Dropdown';

export const ColumnVisibilityTrigger = memo(() => {
    const [visible, setVisible] = useRecoilState(visibleColumnsState);
    const visibleSet = new Set(visible);

    const visibleColumnIds = allColumnIds.filter((id) => visibleSet.has(id));
    const hiddeColumnIds = allColumnIds.filter((id) => !visibleSet.has(id));

    const toggle = (id: ColumnId) => {
        if (requiredColumns.includes(id)) return;
        setVisible((prev) => (prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]));
    };

    const showAll = () => setVisible([...allColumnIds]);

    return (
        <Dropdown isAutoClose={false} placement="bottom-start" Trigger={() => <Settings2 className="cursor-pointer" />}>
            {({hide}) => (
                <div className="shadow-lg bg-base-100 border border-gray-200 rounded-sm min-w-[16rem]">
                    <div className="flex items-center justify-between p-3 mb-2">
                        <span className="text-sm font-bold">표시/숨기기</span>
                        <X className="cursor-pointer size-4 font-semibold" onClick={hide} />
                    </div>

                    {/* 표시중인 영역 */}
                    <div className="px-3 py-1 flex items-center">
                        <span className="text-xs font-medium">표시 중</span>
                    </div>
                    <ul className="py-2">
                        {visibleColumnIds
                            .filter((id) => !!columnLabels[id]?.trim()) // 빈 라벨 제거(checkBox,actions)
                            .map((id) => {
                                const disable = requiredColumns.includes(id);
                                return (
                                    <li
                                        key={id}
                                        className={`${
                                            disable ? 'text-gray-300 pointer-events-none' : 'hover:bg-slate-50'
                                        } flex items-center justify-between px-3 py-1 cursor-pointer text-sm`}
                                        onClick={() => toggle(id)}
                                    >
                                        <span className="flex items-center gap-1 text-xs">{columnLabels[id]}</span>
                                        {!disable && <Eye className="size-4" />}
                                    </li>
                                );
                            })}
                    </ul>

                    {/* 숨김중인 영역 */}
                    {hiddeColumnIds.length > 0 && (
                        <>
                            <hr />
                            <div className="px-3 py-2 flex items-center justify-between">
                                <span className="text-xs font-medium">숨김 중</span>
                                <button type="button" className="link text-xs" onClick={showAll}>
                                    모두 표시
                                </button>
                            </div>
                            <ul className="max-h-60 overflow-auto py-1">
                                {hiddeColumnIds.map((id) => (
                                    <li
                                        key={id}
                                        className="flex items-center justify-between px-3 py-1 cursor-pointer hover:bg-slate-50"
                                        onClick={() => toggle(id)}
                                    >
                                        <span className="flex items-center gap-1 text-xs">{columnLabels[id]}</span>
                                        <EyeOff className="size-3" />
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
