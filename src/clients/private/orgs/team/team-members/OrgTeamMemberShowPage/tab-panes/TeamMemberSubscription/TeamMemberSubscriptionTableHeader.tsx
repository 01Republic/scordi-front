import {memo} from 'react';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {useTranslation} from 'next-i18next';

interface TeamMemberSubscriptionTableHeaderProps extends ListTableHeaderProps {
    //
}

export const TeamMemberSubscriptionTableHeader = memo((props: TeamMemberSubscriptionTableHeaderProps) => {
    const {t} = useTranslation('members');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            {/* Checkbox */}
            {/*<th className="bg-transparent"></th>*/}
            <SortableTH sortKey="[product][nameKo]" onClick={orderBy}>
                {t('subscriptions.table.header.service') as string}
            </SortableTH>

            {/*<SortableTH sortKey="[isFreeTier]" onClick={orderBy}>*/}
            {/*    상태*/}
            {/*</SortableTH>*/}

            {/* [구독상태] subscription.usingStatus: SubscriptionUsingStatus */}
            <SortableTH>{t('subscriptions.table.header.status') as string}</SortableTH>

            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                {t('subscriptions.table.header.amount') as string}
            </SortableTH>

            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
            {/*<SortableTH sortKey="[billingCycleType]" onClick={orderBy}>*/}
            {/*    결제주기*/}
            {/*</SortableTH>*/}

            {/* [과금방식] subscription.pricingModel: PricingModelOptions */}
            {/*<SortableTH sortKey="[pricingModel]" onClick={orderBy}>*/}
            {/*    과금방식*/}
            {/*</SortableTH>*/}

            <SortableTH>{t('subscriptions.table.header.paymentMethod') as string}</SortableTH>

            <SortableTH>{t('subscriptions.table.header.invoiceEmail') as string}</SortableTH>

            <SortableTH>{t('subscriptions.table.header.note') as string}</SortableTH>

            {/*<SortableTH sortKey="[usedMemberCount]" sortVal="DESC" onClick={orderBy}>*/}
            {/*    사용인원*/}
            {/*</SortableTH>*/}

            {/*<SortableTH className="text-right">다음 결제일</SortableTH>*/}

            {/*<SortableTH sortKey="[masterId]" sortVal="DESC" onClick={orderBy}>*/}
            {/*    담당자*/}
            {/*</SortableTH>*/}

            {/* Actions */}
            <th className="" />
        </tr>
    );
});
TeamMemberSubscriptionTableHeader.displayName = 'TeamMemberSubscriptionTableHeader';
