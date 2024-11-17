import {CreditCardScopeHandler} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardScopeHandler';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {AddCreditCardDropdown} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/AddCreditCardDropdown';
import {CreditCardTableHeader} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableHeader';
import {CreditCardTableRow} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableRow';
import React, {memo} from 'react';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';

export const SubscriptionPaymentTab = memo(function SubscriptionPaymentTab() {
    const {result, isEmptyResult, isNotLoaded, isLoading, movePage, changePageSize, orderBy, reload} =
        useCreditCardListForListPage();

    return (
        <div className={'py-4 space-y-4'}>
            <CreditCardScopeHandler />
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 결제수단이 없어요."
                EmptyButtons={AddCreditCardDropdown}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <CreditCardTableHeader orderBy={orderBy} />}
                    Row={({item}) => <CreditCardTableRow creditCard={item} reload={reload} />}
                />
            </ListTableContainer>
        </div>
    );
});
