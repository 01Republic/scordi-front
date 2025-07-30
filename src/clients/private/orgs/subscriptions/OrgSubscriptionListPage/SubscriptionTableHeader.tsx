import {memo} from 'react';
import {useTranslation} from 'next-i18next';
import {ListTableHeaderProps} from '^clients/private/_components/table/ListTable/types';
import {SortableTH} from '^v3/share/table/columns/share/SortableTH';

interface SubscriptionTableHeaderProps extends ListTableHeaderProps {
    //
}

export const SubscriptionTableHeader = memo((props: SubscriptionTableHeaderProps) => {
    const {t} = useTranslation('subscription');
    const {orderBy} = props;

    return (
        <tr className="bg-slate-100">
            <th></th>
            {/* Checkbox */}
            {/*<th className="bg-transparent"></th>*/}
            <SortableTH sortKey="[product][nameKo]" onClick={orderBy}>
                {t('table.header.serviceName') as string}
            </SortableTH>

            {/* [상태] : 유료, 무료, 해지, 미정 */}
            <SortableTH>{t('table.header.status') as string}</SortableTH>

            {/* [구독상태] subscription.status: SubscriptionStatus */}
            {/*<SortableTH sortKey="[status]" onClick={orderBy}>*/}
            {/*    <span className="pl-[8px]">상태</span>*/}
            {/*</SortableTH>*/}

            {/* [결제주기] subscription.billingCycleType: BillingCycleOptions */}
            <SortableTH>{t('table.header.billingCycle') as string}</SortableTH>

            {/* [과금방식] subscription.pricingModel: PricingModelOptions */}
            {/*<SortableTH sortKey="[pricingModel]" onClick={orderBy}>*/}
            {/*    과금방식*/}
            {/*</SortableTH>*/}

            <SortableTH
                // sortKey="[currentBillingAmount][dollarPrice]"
                sortVal="DESC"
                className="flex items-center justify-end"
            >
                {t('table.header.paymentAmount') as string}
            </SortableTH>

            <SortableTH className="text-right">{t('table.header.renewalDate') as string}</SortableTH>
            <SortableTH>{t('table.header.userCount') as string}</SortableTH>

            <SortableTH sortKey="[creditCard][name]" sortVal="DESC" onClick={orderBy}>
                {t('table.header.paymentMethod') as string}
            </SortableTH>

            <SortableTH>{t('table.header.note') as string}</SortableTH>

            {/*<SortableTH sortKey="[masterId]" sortVal="DESC" onClick={orderBy}>*/}
            {/*    담당자*/}
            {/*</SortableTH>*/}

            {/* Actions */}
            <th className="bg-transparent" />
        </tr>
    );
});
SubscriptionTableHeader.displayName = 'SubscriptionTableHeader';
