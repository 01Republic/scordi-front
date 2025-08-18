import {useTranslation} from 'next-i18next';
import {memo} from 'react';

interface SubscriptionBillingHistoriesTableHeaderProps {}

export const SubscriptionBillingHistoriesTableHeader = memo((props: SubscriptionBillingHistoriesTableHeaderProps) => {
    const {t} = useTranslation('subscription');

    return (
        <tr className="bg-slate-100">
            <th>{t('tableHeaders.datetime')}</th>

            <th>{t('tableHeaders.status')}</th>

            <th>{t('tableHeaders.paymentAmount')}</th>

            <th>{t('tableHeaders.paymentMethod')}</th>

            <th>{t('tableHeaders.invoiceEmail')}</th>

            <th>{t('tableHeaders.note')}</th>

            {/* 청구서 보기 */}
            <th />
        </tr>
    );
});
SubscriptionBillingHistoriesTableHeader.displayName = 'SubscriptionBillingHistoriesTableHeader';
