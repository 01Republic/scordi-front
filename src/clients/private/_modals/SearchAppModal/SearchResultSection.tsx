import React, {memo} from 'react';
import {useProductSearchResult} from '^models/Product/hook';
import {LoadableBox} from '^components/util/loading';
import {SearchResultItem} from './SearchResultItem';

export const SearchResultSection = memo(() => {
    const {isLoading, result} = useProductSearchResult();

    const {items, pagination} = result;

    return (
        <div className="p-4 min-h-[70px]">
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
