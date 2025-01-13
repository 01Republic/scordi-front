import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import React, {memo, useEffect} from 'react';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRecoilValue} from 'recoil';
import {SubscriptionBillingHistoriesTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBillingHistoriesTableHeader';
import {SubscriptionBillingHistoriesTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBillingHistoriesTableRow';
import {
    PaymentScopeHandler,
    SubscriptionPaymentStatus,
} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/PaymentScopeHandler';
import {AddPaymentHistoryDropdown} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/AddPaymentHistoryDropdown';
import {useAppBillingHistoriesInSubscriptionDetail} from '^models/BillingHistory/hook';
import {BillingHistoryStatus} from '^models/BillingHistory/type';

export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const {result, reload, isLoading, movePage, changePageSize, isNotLoaded, search} =
        useAppBillingHistoriesInSubscriptionDetail();

    if (!subscription) return null;

    const onReady = () => {
        search({
            where: {
                subscriptionId: subscription.id,
            },
            order: {paidAt: 'DESC'},
        });
    };

    useEffect(() => {
        onReady();
    }, []);

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'flex justify-between'}>
                <PaymentScopeHandler />

                <AddPaymentHistoryDropdown reload={reload} />
            </div>

            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={result.items.length === 0}
                emptyMessage="조회된 결제수단이 없어요."
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
