import {memo, useEffect} from 'react';
import {BsCreditCard, BsCreditCard2Front, CiCreditCardOff} from '^components/react-icons';
import {InvoiceSummaryCard} from '^v3/V3OrgHomePage/InvoiceSummarySection/InvoiceSummaryCard';
import {useDashboardSummaryV3} from '^hooks/useDashboardSummary';
import {Currency} from '^types/crawler';
import {useCurrentUser} from '^models/User/hook';
import {changePriceCurrency} from '^api/tasting.api/gmail/agent/parse-email-price';
import {useBillingHistoriesV3} from '^models/BillingHistory/hook';

export const InvoiceSummarySection = memo(() => {
    const {query} = useBillingHistoriesV3();
    const {data: summary, mutate: getSummary} = useDashboardSummaryV3();
    const {currentUserMembership} = useCurrentUser(null, {
        orgIdParam: 'orgId',
    });

    useEffect(() => {
        getSummary(query).then(() => console.log('updated dashboard summary'));
    }, [query]);

    if (!summary || !currentUserMembership) return <></>;

    // @ts-ignore
    const exchange = (price: number) => changePriceCurrency(price, Currency.USD, currentUserMembership.displayCurrency);
    const toCurrency = (num: number) => num.toLocaleString();

    return (
        <section className="grid grid-cols-3 gap-4 mb-8">
            <InvoiceSummaryCard
                icon={<BsCreditCard2Front size={20} className="text-yellow-500" />}
                title="결제 대기"
                info1={`${summary.pending.count.toLocaleString()}건`}
                info2={`${exchange(summary.pending.amount).toLocaleString()}원`}
            />
            <InvoiceSummaryCard
                icon={<BsCreditCard size={20} className="text-lime-600" />}
                title="결제 완료"
                info1={`${summary.success.count.toLocaleString()}건`}
                info2={`${exchange(summary.success.amount).toLocaleString()}원`}
            />
            <InvoiceSummaryCard
                icon={<CiCreditCardOff size={24} className="text-red-600" />}
                title="결제 실패"
                info1={`${summary.failure.count.toLocaleString()}건`}
                info2={`${exchange(summary.failure.amount).toLocaleString()}원`}
            />
        </section>
    );
});
