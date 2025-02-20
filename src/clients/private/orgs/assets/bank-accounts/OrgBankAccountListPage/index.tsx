import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {useBankAccountListForListPage} from '^models/BankAccount/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import TitleScopeHandler from './TitleScopeHandler';
import {BankAccountTableRow} from './BankAccountTableRow';
import {BankAccountTableHeader} from './BankAccountTableHeader';
import {AddBankAccountDropdown} from './AddBankAccountDropdown';
import {BankAccountScopeHandler} from './BankAccountScopeHandler';
import {AddBankAccountModal} from './AddBankAccountModal/AddBankAccountModal';

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
    } = useBankAccountListForListPage();

    const onReady = () => {
        search({where: {organizationId}, order: {id: 'DESC'}});
    };

    // TODO: 검색어 입력해도 필터링 안됨
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
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                isLoading={isLoading}
                isNotLoaded={isNotLoaded}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 결제수단이 없어요."
                EmptyButtons={() => <AddBankAccountModal reload={refresh} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <BankAccountTableHeader orderBy={orderBy} />}
                    Row={({item}) => <BankAccountTableRow bankAccount={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
