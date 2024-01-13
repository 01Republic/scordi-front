import {memo} from 'react';
import {SubscriptionTr} from './SubscriptionTr';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import Qs from 'qs';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {Loading} from '^v3/share/Loading';

interface PagedTableProps<T> {
    isLoading: boolean;
    items: T[];
    reload?: () => any;
    search?: (params: FindAllQueryDto<T>, mergeMode?: boolean, force?: boolean) => Promise<any>;
    query?: FindAllQueryDto<T>;
}

export const SubscriptionTable = memo(function SubscriptionTable(props: PagedTableProps<SubscriptionDto>) {
    const {isLoading, reload, items: subscriptions, search, query} = props;

    const onSort = (sortKey: string, value: 'ASC' | 'DESC') => {
        if (!query || !search) return;

        const newOrder = Qs.parse(`${sortKey}=${value}`);
        const searchQuery: FindAllQueryDto<SubscriptionDto> = {...query, page: 1};
        // searchQuery.order = {...(searchQuery.order || {}), ...newOrder};
        searchQuery.order = newOrder;
        search(searchQuery);
    };

    const sort = search && onSort;

    return (
        <div className="card bg-white shadow">
            <div className="overflow-x-auto overflow-y-hidden w-full">
                <table className="table w-full">
                    <thead className="top-[50px]">
                        <tr className="text-gray-500">
                            {/* Checkbox */}
                            {/*<th className="bg-transparent"></th>*/}
                            <SortableTH sortKey="[product][nameKo]" onClick={sort}>
                                서비스 명
                            </SortableTH>

                            <SortableTH sortKey="[isFreeTier]" onClick={sort}>
                                <span className="pl-[8px]">유/무료</span>
                            </SortableTH>

                            {/* [구독상태] subscription.status: SubscriptionStatus */}
                            {/*<SortableTH sortKey="[status]" onClick={sort}>*/}
                            {/*    <span className="pl-[8px]">상태</span>*/}
                            {/*</SortableTH>*/}

                            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
                            <SortableTH sortKey="[billingCycleType]" onClick={sort}>
                                <span className="pl-[8px]">결제주기</span>
                            </SortableTH>

                            {/* [과금방식] subscription.pricingModel: PricingModelOptions */}
                            <SortableTH sortKey="[pricingModel]" onClick={sort}>
                                <span className="pl-[8px]">과금방식</span>
                            </SortableTH>

                            <SortableTH sortKey="[creditCard][name]" onClick={sort}>
                                <span>결제수단</span>
                            </SortableTH>

                            <SortableTH sortKey="[usedMemberCount]" onClick={sort}>
                                사용인원
                            </SortableTH>

                            <SortableTH sortKey="[currentBillingAmount][amount]" onClick={sort} className="justify-end">
                                최신 결제금액
                            </SortableTH>

                            {/*<SortableTH className="text-right">다음 결제일</SortableTH>*/}

                            <SortableTH>
                                <span className="pl-[8px]">담당자</span>
                            </SortableTH>

                            {/* Actions */}
                            {/*<th className="bg-transparent"></th>*/}
                        </tr>
                    </thead>

                    <tbody>
                        {isLoading && (
                            <tr>
                                <td colSpan={8}>
                                    <div className="w-full flex items-center justify-center">
                                        <Loading size="8" />
                                    </div>
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            subscriptions.map((subscription, i) => (
                                <SubscriptionTr key={i} subscription={subscription} reload={reload} />
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
