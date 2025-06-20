import React, {memo} from 'react';
import Tippy from '@tippyjs/react';
import {RotateCw} from 'lucide-react';
import {SearchInput} from '^components/util/form-control/inputs/SearchInput';
import {PaginationMetaData} from '^types/utils/paginated.dto';
import {WithChildren} from '^types/global.type';

interface ListPageControlProps extends WithChildren {
    name: string;
    pagination: PaginationMetaData;
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    isLoading?: boolean;
    reload?: () => any;
}

export const ListPageControl = memo((props: ListPageControlProps) => {
    const {name, pagination, searchValue, setSearchValue, isLoading = false, reload, children} = props;

    return (
        <div className="sticky top-0 -mx-2 sm:-mx-4 px-2 sm:px-4 mb-4 bg-layout-background z-10">
            <div className="py-4 flex items-center justify-between">
                <div className="">
                    <div className="flex items-center gap-4 mb-2">
                        <p className={`text-xl font-semibold text-gray-400 transition-all`}>
                            {searchValue ? (
                                <span>
                                    <code className="code code-xl">{searchValue}</code> 의 검색결과:
                                </span>
                            ) : (
                                <span className="">
                                    {name} 조회 <small>(버전 총 {pagination.totalItemCount.toLocaleString()}개)</small>
                                </span>
                            )}
                        </p>

                        <Tippy content="새로고침" className="!text-10">
                            <div>
                                <button
                                    type="button"
                                    className={`btn btn-xs btn-circle btn-scordi ${isLoading ? 'animate-spin' : ''}`}
                                    onClick={() => reload && reload()}
                                >
                                    <RotateCw className="font-bold" strokeWidth={3} />
                                </button>
                            </div>
                        </Tippy>
                    </div>

                    {children}
                </div>

                <div className="flex gap-2 items-center">
                    <div className="ml-auto">
                        <SearchInput
                            scale="sm"
                            placeholder="search name"
                            onChange={(e) => setSearchValue(e.target.value.trim().toLowerCase())}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
ListPageControl.displayName = 'ListPageControl';
