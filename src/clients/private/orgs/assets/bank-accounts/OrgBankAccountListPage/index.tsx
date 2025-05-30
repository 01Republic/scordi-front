import React, {memo} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {debounce} from 'lodash';
import {orgIdParamState} from '^atoms/common';
import {OrgAssetsCreateMethodSelectPageRoute} from '^pages/orgs/[id]/assets/new';
import {useBankAccountListForListPage} from '^models/BankAccount/hook';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {ListPagePlusIconButton} from '^clients/private/_layouts/_shared/ListPagePlusIconButton';
import TitleScopeHandler from './TitleScopeHandler';
import {BankAccountTableRow} from './BankAccountTableRow';
import {BankAccountTableHeader} from './BankAccountTableHeader';
import {BankAccountScopeHandler} from './BankAccountScopeHandler';
import {AddBankAccountModal} from './AddBankAccountModal/AddBankAccountModal';

export const OrgBankAccountListPage = memo(function OrgBankAccountListPage() {
    const router = useRouter();
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
            Buttons={() => (
                <ListPagePlusIconButton
                    text="자산 추가"
                    onClick={() => router.push(OrgAssetsCreateMethodSelectPageRoute.path(organizationId))}
                />
            )}
            ScopeHandler={<BankAccountScopeHandler />}
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
