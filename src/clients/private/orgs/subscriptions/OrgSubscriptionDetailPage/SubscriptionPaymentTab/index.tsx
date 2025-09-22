import React, {memo, useEffect} from 'react';
import {useOrgIdParam} from '^atoms/common';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCurrentSubscription} from '../atom';
import {useBillingHistoriesOfSubscription} from '../hooks';
import {BillingHistoryDto} from '^models/BillingHistory/type';
import {useCheckboxHandler} from '^hooks/useCheckboxHandler';
import {SubscriptionBillingHistoriesTableHeader} from './SubscriptionBillingHistoriesTableHeader';
import {SubscriptionBillingHistoriesTableRow} from './SubscriptionBillingHistoriesTableRow';
import {PaymentScopeHandler} from './PaymentScopeHandler';
import {AddPaymentHistoryDropdown} from './AddPaymentHistoryDropdown';
import {BillingHistoryManualUpload} from '../SubscriptionPaymentTab/BillingHistoryManualUpload';
import {BottomAction} from '^_components/BottomAction/BottomAction';
import {BottomActionBarField} from '^clients/private/orgs/subscriptions/OrgSubscriptionDetailPage/SubscriptionPaymentTab/BottomActionSection/BottomActionBarField';

/**
 * 구독 상세p > 결제탭
 */
export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const orgId = useOrgIdParam();
    const {currentSubscription: subscription} = useCurrentSubscription();
    const {result, reload, isLoading, movePage, changePageSize, isNotLoaded, search} =
        useBillingHistoriesOfSubscription(subscription, {
            relations: [
                'invoiceApp',
                'invoiceApp.invoiceAccount',
                'invoiceApp.invoiceAccount.googleTokenData',
                'creditCard',
                'bankAccount',
            ],
            where: {
                organizationId: orgId,
                subscriptionId: subscription?.id,
            },
            order: {issuedAt: 'DESC'},
        });

    if (!orgId || !subscription) return <></>;

    const ch = useCheckboxHandler<BillingHistoryDto>([], (item) => item.id);

    useEffect(() => {
        ch.init(result.items);
    }, [result.items]);

    return (
        <div className={'py-4 space-y-4'}>
            <div className={'flex justify-between'}>
                <PaymentScopeHandler onSearch={search} />
                <div className="flex items-center gap-2">
                    <BillingHistoryManualUpload subscription={subscription} onSaved={() => reload()} />
                    <AddPaymentHistoryDropdown subscription={subscription} reload={reload} />
                </div>
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
                    Row={({item}) => (
                        <SubscriptionBillingHistoriesTableRow
                            billingHistory={item}
                            reload={reload}
                            isChecked={ch.isChecked(item)}
                            onCheck={(checked) => ch.checkOne(item, checked)}
                        />
                    )}
                />
            </ListTableContainer>

            {ch.checkedItems.length !== 0 && (
                <BottomAction>
                    <BottomActionBarField checkboxHandler={ch} />
                </BottomAction>
            )}
        </div>
    );
});
