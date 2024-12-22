import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useCreditCardListForListPage} from '^models/CreditCard/hook';
import {AddCreditCardModal} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/AddCreditCardModal';
import {CreditCardTableHeader} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableHeader';
import {CreditCardTableRow} from '^clients/private/orgs/assets/credit-cards/OrgCreditCardListPage/CreditCardTableRow';
import TitleScopeHandler from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountListPage/TitleScopeHandler';
import {AddBankAccountDropdown} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountListPage/AddBankAccountDropdown';
import {BankAccountScopeHandler} from '^clients/private/orgs/assets/bank-accounts/OrgBankAccountListPage/BankAccountScopeHandler';

export const OrgBankAccountListPage = memo(function OrgBankAccountListPage() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {
        search,
        reset,
        result,
        isEmptyResult,
        isNotLoaded,
        isLoading,
        query,
        movePage,
        changePageSize,
        orderBy,
        reload,
    } = useCreditCardListForListPage();

    const onReady = () => {
        search({where: {organizationId}, order: {id: 'DESC'}});
    };

    const onSearch = debounce((keyword?: string) => {
        return search({
            ...query,
            keyword: keyword || undefined,
            page: 1,
            itemsPerPage: 30,
        });
    }, 500);

    const refresh = () => {
        search({...query, keyword: undefined, page: 1, itemsPerPage: 30}, false, true);
    };

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => reset()}
            breadcrumb={['자산', '결제수단', {text: '계좌', active: true}]}
            Title={() => <TitleScopeHandler />}
            Buttons={() => <AddBankAccountDropdown reload={refresh} />}
            ScopeHandler={BankAccountScopeHandler}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            {/* TODO: 계좌 테이블 새로 만들어야 함 */}
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 결제수단이 없어요."
                EmptyButtons={() => <AddCreditCardModal reload={refresh} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <CreditCardTableHeader orderBy={orderBy} />}
                    Row={({item}) => <CreditCardTableRow creditCard={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
