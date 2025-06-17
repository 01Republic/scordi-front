import React, {memo, useEffect} from 'react';
import {useAppBillingHistoriesInSubscriptionDetail} from '^models/BillingHistory/hook';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentSubscription} from '../atom';
import {SubscriptionBillingHistoriesTableHeader} from './SubscriptionBillingHistoriesTableHeader';
import {SubscriptionBillingHistoriesTableRow} from './SubscriptionBillingHistoriesTableRow';
import {PaymentScopeHandler} from './PaymentScopeHandler';
import {AddPaymentHistoryDropdown} from './AddPaymentHistoryDropdown';

/**
 * 구독 상세p > 결제탭
 */
export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const {currentSubscription: subscription} = useCurrentSubscription();
    const {result, reload, isLoading, movePage, changePageSize, isNotLoaded, search} =
        useAppBillingHistoriesInSubscriptionDetail();

    const onReady = () => {
        if (!subscription) return;

        search({
            relations: ['invoiceApp', 'invoiceApp.invoiceAccount', 'invoiceApp.invoiceAccount.googleTokenData'],
            // relations: ['invoiceAccountSubscriptions', 'invoiceAccountSubscriptions.invoiceAccounts'],
            where: {
                subscriptionId: subscription.id,
            },
            order: {paidAt: 'DESC'},
        });
    };

    useEffect(() => {
        if (subscription) onReady();
    }, [subscription]);

    if (!subscription) return <></>;

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'flex justify-between'}>
                <PaymentScopeHandler />

                <AddPaymentHistoryDropdown subscription={subscription} reload={reload} />
            </div>

            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={result.items.length === 0}
                emptyMessage="조회된 결제내역이 없어요."
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
