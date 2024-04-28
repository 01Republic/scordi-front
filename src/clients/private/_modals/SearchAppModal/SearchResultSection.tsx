import React, {memo} from 'react';
import {useProductSearchResult} from '^models/Product/hook';
import {LoadableBox} from '^components/util/loading';
import {SearchResultItem} from './SearchResultItem';
import {atom, useRecoilValue} from 'recoil';

export const searchResultModeAtom = atom<'search' | 'popular'>({
    key: 'searchResultModeAtom',
    default: 'popular',
});

export const SearchResultSection = memo(() => {
    const searchResultMode = useRecoilValue(searchResultModeAtom);
    const {isLoading, result} = useProductSearchResult();

    const {items, pagination} = result;

    return (
        <div className="p-4 min-h-[70px]">
            <div className="flex items-center justify-between mb-2">
                {searchResultMode === 'popular' && (
                    <h4 className="text-12 text-gray-500 font-medium">가장 많이 등록한 앱 Top10</h4>
                )}
                {searchResultMode === 'search' && (
                    <h4 className="text-12 text-gray-500 font-medium">
                        {pagination.totalItemCount.toLocaleString()}개의 검색결과
                    </h4>
                )}

                <div className="hidden">
                    <span className="text-11 text-gray-500 hover:text-gray-800 transition-all cursor-pointer">
                        초기화
                    </span>
                </div>
            </div>

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                {pagination.totalItemCount === 0 && <div className="p-1.5 text-13">검색 결과가 없습니다 :(</div>}

                {items.map((product, i) => (
                    <SearchResultItem key={i} product={product} />
                ))}
            </LoadableBox>
        </div>
    );
});
SearchResultSection.displayName = 'SearchResultSection';
