import React, {memo, useEffect, useRef} from 'react';
import {useProductSearchResult} from '^models/Product/hook';
import {LoadableBox} from '^components/util/loading';
import {SelectableProductItem} from './SelectableProductItem';
import {debounce} from 'lodash';
import {PaginationMetaData} from '^types/utils/paginated.dto';

export const SelectableProductSection = memo(function SelectableProductSection() {
    const {isLoading, result, movePage} = useProductSearchResult();
    const ref = useRef<HTMLDivElement>(null);

    const getNextPage = debounce((pagination: PaginationMetaData) => {
        const {currentPage, totalPage} = pagination;
        if (currentPage < totalPage) movePage(currentPage + 1, true);
    }, 100);

    useEffect(() => {
        if (!ref.current) return;
        if (typeof window === 'undefined') return;

        const listener = () => {
            const element = ref.current;
            if (!element) return;

            const currentScrollSize = element.scrollTop + element.offsetHeight;
            const offset = element.scrollHeight > 1000 ? 500 : 10;
            const maxScrollSize = element.scrollHeight - 1;
            const trapLine = maxScrollSize - offset;

            if (currentScrollSize >= trapLine) getNextPage(result.pagination);
        };

        ref.current.addEventListener('scroll', listener);
        return () => {
            if (ref.current) ref.current.removeEventListener('scroll', listener);
        };
    }, [ref, result]);

    return (
        <div className="card bordered rounded-btn bg-white shadow mb-4">
            <div ref={ref} className="p-2 sm:card-body h-[320px] !overflow-scroll">
                <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 max-w-screen-md gap-x-1 sm:gap-x-0 gap-y-2 mx-auto">
                        {result.items.map((product, i) => (
                            <SelectableProductItem key={i} product={product} />
                        ))}
                    </div>
                </LoadableBox>
            </div>
        </div>
    );
});
