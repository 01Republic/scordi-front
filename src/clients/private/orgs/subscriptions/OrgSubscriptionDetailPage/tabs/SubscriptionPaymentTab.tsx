import {CreditCardScopeHandler} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardScopeHandler';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {AddCreditCardDropdown} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/AddCreditCardDropdown';
import {CreditCardTableHeader} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableHeader';
import {CreditCardTableRow} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableRow';
import React, {memo, useEffect, useState} from 'react';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {subscriptionSubjectAtom} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/atom';
import {useRecoilValue} from 'recoil';
import {SubscriptionBillingHistoriesTableHeader} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBillingHistoriesTableHeader';
import {SubscriptionBillingHistoriesTableRow} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/components/SubscriptionBillingHistoriesTableRow';
import {useBillingHistoriesInModal} from '^v3/share/modals/BillingHistoryDetailModal/hook';
import {appBillingHistoryApi} from '^models/BillingHistory/api';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {Paginated, PaginationMetaData} from '^types/utils/paginated.dto';
import {toast} from 'react-hot-toast';

export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const subscription = useRecoilValue(subscriptionSubjectAtom);
    const [billingHistory, setBillingHistory] = useState<Paginated<BillingHistoryDto>>();
    const [isLoading, setIsLoading] = useState(true);

    if (!subscription) return null;

    const getBillingHistories = () => {
        appBillingHistoryApi
            .index(subscription.id, {relations: []})
            .then((res) => {
                setBillingHistory(res.data);
            })
            .catch(() => toast.error('문제가 발생했어요.'))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getBillingHistories();
    }, [subscription]);

    if (!billingHistory) return null;

    return (
        <div className={'py-4 space-y-4'}>
            <CreditCardScopeHandler />
            <ListTableContainer
                pagination={billingHistory.pagination}
                // movePage={movePage}
                // changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                // isNotLoaded={isNotLoaded}
                isEmptyResult={billingHistory.items.length === 0}
                emptyMessage="조회된 결제수단이 없어요."
                // EmptyButtons={AddCreditCardDropdown}
            >
                <ListTable
                    items={billingHistory.items}
                    isLoading={isLoading}
                    Header={() => <SubscriptionBillingHistoriesTableHeader />}
                    Row={({item}) => (
                        <SubscriptionBillingHistoriesTableRow billingHistory={item} reload={getBillingHistories} />
                    )}
                />
            </ListTableContainer>
        </div>
    );
});
