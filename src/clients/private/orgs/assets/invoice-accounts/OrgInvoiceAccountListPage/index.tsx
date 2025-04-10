import React, {memo} from 'react';
import {debounce} from 'lodash';
import {useOrgIdParam} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {InvoiceAccountScopeHandler} from './InvoiceAccountScopeHandler';
import {InvoiceAccountTableHeader} from './InvoiceAccountTableHeader';
import {InvoiceAccountTableRow} from './InvoiceAccountTableRow';
import {AddInvoiceAccountDropdown} from './AddInvoiceAccountDropdown';
import {AddInvoiceAccountModal} from './AddInvoiceAccountModal';

export const OrgInvoiceAccountListPage = memo(function OrgInvoiceAccountListPage() {
    const organizationId = useOrgIdParam();
    const {
        search,
        reset,
        reload,
        result,
        isLoading,
        isNotLoaded,
        isEmptyResult,
        query,
        movePage,
        resetPage,
        changePageSize,
        orderBy,
    } = useInvoiceAccounts();

    const onReady = () => {
        search({
            where: {organizationId},
            relations: ['subscriptions', 'googleTokenData', 'holdingMember', 'teams'],
            order: {id: 'DESC'},
        });
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
            breadcrumb={['자산', {text: '청구서 메일', active: true}]}
            titleText="청구서 메일"
            Buttons={() => <AddInvoiceAccountDropdown reload={refresh} />}
            ScopeHandler={<InvoiceAccountScopeHandler />}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
                // Empty State Props
                isNotLoaded={isNotLoaded}
                isLoading={isLoading}
                isEmptyResult={isEmptyResult}
                emptyMessage="조회된 청구서 메일이 없어요."
                EmptyButtons={() => <AddInvoiceAccountModal reload={refresh} />}
            >
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <InvoiceAccountTableHeader orderBy={orderBy} />}
                    Row={({item}) => <InvoiceAccountTableRow invoiceAccount={item} reload={reload} />}
                />
            </ListTableContainer>
        </ListPage>
    );
});
