import React from 'react';
import {Eye, EyeOff} from 'lucide-react';

interface TableColumnExposeControlSectionProps<T extends string | number> {
    headerLabel: string;
    headerButtonText: string;
    headerOnClick: () => void;

    columnIds: readonly T[];
    requiredIds?: readonly T[];
    itemOnClick: (id: T) => void;
    labelMap: Record<T, string>;
    isIconType: boolean; // 컬럼의 show/hidden에 따라 사용할 아이콘이 정해집니다.
}

const BaseTableColumnExposeControlSection = <T extends string | number>(
    props: TableColumnExposeControlSectionProps<T>,
) => {
    const {headerLabel, headerButtonText, headerOnClick} = props;
    const {columnIds, requiredIds, itemOnClick, labelMap, isIconType} = props;
    return (
        <div>
            <div className="px-3 py-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500">{headerLabel}</span>
                <button
                    type="button"
                    className="text-xs text-scordi opacity-75 hover:underline hover:opacity-100 "
                    onClick={headerOnClick}
                >
                    {headerButtonText}
                </button>
            </div>
            <ul className="max-h-60 overflow-auto py-1">
                {columnIds
                    .filter((id) => !!labelMap[id]?.trim())
                    .map((id) => {
                        const disable = requiredIds?.includes(id);
                        return (
                            <li key={id} className="cursor-default flex items-center  px-3 py-1">
                                <span className="flex items-center gap-1 text-xs">{labelMap[id]}</span>
                                {isIconType ? (
                                    <div className="flex items-center ml-auto">
                                        <button
                                            className={` w-[20px] h-[20px] flex items-center justify-center rounded-sm ${
                                                disable ? '' : 'cursor-pointer hover:bg-primaryColor-bg'
                                            }`}
                                            onClick={() => itemOnClick(id)}
                                        >
                                            <Eye
                                                fontSize={14}
                                                className={` ${disable ? 'text-gray-300 pointer-events-none' : ''} `}
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center ml-auto">
                                        <button
                                            className="cursor-pointer hover:bg-primaryColor-bg w-[20px] h-[20px] flex items-center justify-center rounded-sm"
                                            onClick={() => itemOnClick(id)}
                                        >
                                            <EyeOff fontSize={14} />
                                        </button>
                                    </div>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export const TableColumnExposeControlSection = React.memo(BaseTableColumnExposeControlSection) as <
    T extends string | number,
>(
    props: TableColumnExposeControlSectionProps<T>,
) => JSX.Element;
