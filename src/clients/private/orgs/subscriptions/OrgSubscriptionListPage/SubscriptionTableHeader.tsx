import {memo} from 'react';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface SubscriptionTableHeaderProps extends ListTableHeaderProps {
    //
}

export const SubscriptionTableHeader = memo((props: SubscriptionTableHeaderProps) => {
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th></th>
            {/* Checkbox */}
            {/*<th className="bg-transparent"></th>*/}
            <SortableTH sortKey="[product][nameKo]" onClick={orderBy}>
                서비스 명
            </SortableTH>

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

            <SortableTH className="text-right">갱신일</SortableTH>
            <SortableTH>사용인원</SortableTH>

            <SortableTH sortKey="[creditCard][name]" sortVal="DESC" onClick={orderBy}>
                결제수단
            </SortableTH>

            <SortableTH>비고</SortableTH>

            {/*<SortableTH sortKey="[masterId]" sortVal="DESC" onClick={orderBy}>*/}
            {/*    담당자*/}
            {/*</SortableTH>*/}

            {/* Actions */}
            <th className="bg-transparent" />
        </tr>
    );
});
SubscriptionTableHeader.displayName = 'SubscriptionTableHeader';
