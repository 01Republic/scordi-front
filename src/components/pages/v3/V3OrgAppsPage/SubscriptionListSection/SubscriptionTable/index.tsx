import {memo} from 'react';
import Qs from 'qs';
import {SubscriptionDto} from '^models/Subscription/types';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {TBody} from '^v3/share/table/TBody';
import {Table} from '^v3/share/table/Table';
import {SubscriptionTableRowSkeleton} from '^v3/share/Skeletons/SubscriptionTableRowSkeleton';
import {SubscriptionTr} from '^v3/V3OrgAppsPage/SubscriptionListSection/SubscriptionTable/SubscriptionTr';

interface PagedTableProps<T> {
    isLoading: boolean;
    items: T[];
    reload?: () => any;
    search?: (params: FindAllQueryDto<T>, mergeMode?: boolean, force?: boolean) => Promise<any>;
    query?: FindAllQueryDto<T>;
    EmptyContent: () => JSX.Element;
}

export const SubscriptionTable = memo(function SubscriptionTable(props: PagedTableProps<SubscriptionDto>) {
    const {isLoading, reload, items: subscriptions, search, query, EmptyContent} = props;

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
                <Table isLoading={isLoading}>
                    <thead className="top-[50px]">
                        <tr className="text-gray-500">
                            {/* Checkbox */}
                            {/*<th className="bg-transparent"></th>*/}
                            <SortableTH sortKey="[product][nameKo]" onClick={sort}>
                                서비스 명
                            </SortableTH>

                            <SortableTH sortKey="[isFreeTier]" onClick={sort}>
                                유/무료
                            </SortableTH>

                            {/* [구독상태] subscription.status: SubscriptionStatus */}
                            {/*<SortableTH sortKey="[status]" onClick={sort}>*/}
                            {/*    <span className="pl-[8px]">상태</span>*/}
                            {/*</SortableTH>*/}

                            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
                            <SortableTH sortKey="[billingCycleType]" onClick={sort}>
                                결제주기
                            </SortableTH>

                            {/* [과금방식] subscription.pricingModel: PricingModelOptions */}
                            <SortableTH sortKey="[pricingModel]" onClick={sort}>
                                과금방식
                            </SortableTH>

                            <SortableTH sortKey="[creditCard][name]" sortVal="DESC" onClick={sort}>
                                결제수단
                            </SortableTH>

                            <SortableTH sortKey="[usedMemberCount]" sortVal="DESC" onClick={sort}>
                                사용인원
                            </SortableTH>

                            <SortableTH
                                sortKey="[currentBillingAmount][dollarPrice]"
                                sortVal="DESC"
                                onClick={sort}
                                className="justify-end"
                            >
                                최신 결제금액
                            </SortableTH>

                            {/*<SortableTH className="text-right">다음 결제일</SortableTH>*/}

                            <SortableTH sortKey="[masterId]" sortVal="DESC" onClick={sort}>
                                담당자
                            </SortableTH>

                            {/* Actions */}
                            {/*<th className="bg-transparent"></th>*/}
                        </tr>
                    </thead>

                    <TBody entries={subscriptions} cols={8} isLoading={isLoading}>
                        {/*로딩상태일때*/}
                        {isLoading && <SubscriptionTableRowSkeleton />}

                        {/*로딩상태가 아니고 subscriptions 데이터가 있을 때*/}
                        {subscriptions &&
                            !isLoading &&
                            subscriptions.map((subscription, i) => (
                                <SubscriptionTr key={i} subscription={subscription} reload={reload} />
                            ))}
                    </TBody>
                </Table>

                {/*subscriptions 데이터가 없을때*/}
                {!subscriptions && !isLoading && <EmptyContent />}
            </div>
        </div>
    );
});
