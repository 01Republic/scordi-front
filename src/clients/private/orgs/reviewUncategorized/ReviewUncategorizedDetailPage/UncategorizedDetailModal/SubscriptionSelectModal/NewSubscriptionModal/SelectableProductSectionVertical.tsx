import { memo, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { Inbox } from 'lucide-react';
import { LoadableBox } from '^components/util/loading';
import { useProductSearchResult } from '^models/Product/hook';
import { PaginationMetaData } from '^types/utils/paginated.dto';
import { SelectableSubscriptionItem } from '../SelectableSubscriptionItem';

export const SelectableProductSectionVertical = memo(() => {
    const { isLoading, result, movePage } = useProductSearchResult();
    const ref = useRef<HTMLDivElement>(null);

    const getNextPage = debounce((pagination: PaginationMetaData) => {
        const { currentPage, totalPage } = pagination;
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
        <div className="mb-4">
            <div ref={ref} className="h-[320px] !overflow-scroll">
                <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                    {result.items.length === 0 ? (
                        <section className="w-full h-full flex justify-center">
                            <div className="w-[380px] flex flex-col items-center justify-center gap-4 py-20">
                                <Inbox className="size-[34px] text-gray-400" />
                                <span className="text-base text-gray-400 font-semibold">조회된 앱이 없어요</span>
                            </div>
                        </section>
                    ) : (
                        <div className="max-w-screen-md gap-y-2 mx-auto">
                            {result.items.map((product, i) => (
                                <SelectableSubscriptionItem
                                    key={i}
                                    product={product}
                                    isSelected={false}
                                    onClick={() => {
                                        /* TODO: 선택 시 액션 추가 */
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </LoadableBox>
            </div>
        </div>
    );
});
