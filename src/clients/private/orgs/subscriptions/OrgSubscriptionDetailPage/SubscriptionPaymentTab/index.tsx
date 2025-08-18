import {useOrgIdParam} from '^atoms/common';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {BillingHistoryManualUpload} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/BillingHistoryManualUpload';
import {useTranslation} from 'next-i18next';
import {memo} from 'react';
import {useCurrentSubscription} from '../atom';
import {useBillingHistoriesOfSubscription} from '../hooks';
import {AddPaymentHistoryDropdown} from './AddPaymentHistoryDropdown';
import {PaymentScopeHandler} from './PaymentScopeHandler';
import {SubscriptionBillingHistoriesTableHeader} from './SubscriptionBillingHistoriesTableHeader';
import {SubscriptionBillingHistoriesTableRow} from './SubscriptionBillingHistoriesTableRow';

/**
 * 구독 상세p > 결제탭
 */
export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const orgId = useOrgIdParam();
    const {currentSubscription: subscription} = useCurrentSubscription();
    const {t} = useTranslation('subscription');
    const {result, reload, isLoading, movePage, changePageSize, isNotLoaded, search} =
        useBillingHistoriesOfSubscription(subscription, {
            relations: ['invoiceApp', 'invoiceApp.invoiceAccount', 'invoiceApp.invoiceAccount.googleTokenData'],
            where: {
                organizationId: orgId,
                subscriptionId: subscription?.id,
            },
            order: {paidAt: 'DESC'},
        });

    if (!orgId || !subscription) return <></>;

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'flex justify-between'}>
                <PaymentScopeHandler onSearch={search} />
                <div className="flex items-center gap-2">
                    <BillingHistoryManualUpload subscription={subscription} />
                    <AddPaymentHistoryDropdown subscription={subscription} reload={reload} />
                </div>
            </div>

            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit={t('detail.paymentTab.unit') as string}
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={result.items.length === 0}
                emptyMessage={t('detail.paymentTab.emptyMessage') as string}
                // EmptyButtons={AddCreditCardDropdown}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <SubscriptionBillingHistoriesTableHeader />}
                    Row={({item}) => <SubscriptionBillingHistoriesTableRow billingHistory={item} reload={reload} />}
                />
            </ListTableContainer>
        </div>
    );
});
