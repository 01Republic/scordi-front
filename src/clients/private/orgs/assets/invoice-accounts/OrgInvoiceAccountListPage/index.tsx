import React, {memo} from 'react';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {ListPage} from '^clients/private/_components/rest-pages/ListPage';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {debounce} from 'lodash';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {InvoiceAccountTableHeader} from './InvoiceAccountTableHeader';
import {InvoiceAccountTableRow} from './InvoiceAccountTableRow';

export const OrgInvoiceAccountListPage = memo(function OrgInvoiceAccountListPage() {
    const organizationId = useRecoilValue(orgIdParamState);
    const {search, reset, reload, result, isLoading, query, movePage, changePageSize, orderBy} = useInvoiceAccounts();

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

    return (
        <ListPage
            onReady={onReady}
            onUnmount={() => reset()}
            breadcrumb={['자산', {text: '청구서 수신 메일', active: true}]}
            titleText="청구서 수신 메일"
            Buttons={undefined}
            ScopeHandler={undefined}
            searchInputPlaceholder="검색어를 입력해주세요"
            onSearch={onSearch}
        >
            <ListTableContainer
                pagination={result.pagination}
                movePage={movePage}
                changePageSize={changePageSize}
                unit="개"
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
