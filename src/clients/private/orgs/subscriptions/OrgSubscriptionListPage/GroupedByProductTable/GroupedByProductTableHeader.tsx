import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {SortableTH2} from '^v3/share/table/columns/share/SortableTH2';

interface Props {
    sortVal: 'ASC' | 'DESC';
    orderBy: (sortKey: string) => void;
}

export const GroupedByProductTableHeader = memo((props: Props) => {
    const {orderBy, sortVal} = props;

    return (
        <tr className="bg-slate-100">
            <th />

            {/*<th className="bg-transparent"></th>*/}
            <SortableTH2 sortKey="[nameEn]" sortVal={sortVal} onClick={orderBy} colSpan={2} className="min-w-60">
                서비스 명
            </SortableTH2>

            {/* 팀 */}
            <SortableTH>팀</SortableTH>

            {/* [상태] : 유료, 무료, 해지, 미정 */}
            <SortableTH>상태</SortableTH>

            {/* [구독상태] subscription.status: SubscriptionStatus */}
            {/*<SortableTH sortKey="[status]" onClick={orderBy}>*/}
            {/*    <span className="pl-[8px]">상태</span>*/}
            {/*</SortableTH>*/}

            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
            <SortableTH>결제주기</SortableTH>

            {/* [과금방식] subscription.pricingModel: PricingModelOptions */}
            {/*<SortableTH sortKey="[pricingModel]" onClick={orderBy}>*/}
            {/*    과금방식*/}
            {/*</SortableTH>*/}

            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                결제금액
            </SortableTH>

            <SortableTH
                sortKey="[subscriptions][lastPaidAt]"
                sortVal={sortVal}
                onClick={orderBy}
                className="text-right"
            >
                최근결제일
            </SortableTH>

            <SortableTH>사용인원</SortableTH>

            <SortableTH2 sortKey="[subscriptions][creditCard][name]" sortVal={sortVal} onClick={orderBy}>
                결제수단
            </SortableTH2>

            <SortableTH sortKey="[masterId]" sortVal={sortVal} onClick={orderBy}>
                담당자
            </SortableTH>

            <SortableTH>비고</SortableTH>

            {/* Actions */}
            <th className="bg-transparent" />
        </tr>
    );
});
