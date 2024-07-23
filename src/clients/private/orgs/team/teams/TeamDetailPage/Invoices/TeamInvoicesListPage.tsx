import React, {memo, useEffect, useState} from 'react';
import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamInvoiceAccountListInTeamDetail} from '^models/TeamInvoiceAccount/hook';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {AddInvoiceModal} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/AddInvoiceModal';
import {orgIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import search from '^pages/apps/search';
import {ListTable} from '^clients/private/_components/table/ListTable';
import {InvoicesTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/InvoicesTableHeader';
import {InvoicesTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/InvoicesTableRow';

export const TeamInvoicesListPage = memo(function TeamInvoicesListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useTeamInvoiceAccountListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        console.log('keyword', keyword);
    };

    useEffect(() => {
        !!orgId && search({relations: ['invoiceAccount']});
    }, [orgId]);

    return (
        <>
            <AddInvoiceModal isOpened={isOpened} onClose={() => setIsOpened(false)} />
            <TeamDetailLayout>
                <div className={'flex items-center justify-between pb-4'}>
                    <div>전체 {result.pagination.totalItemCount}</div>
                    <div className={'flex space-x-4'}>
                        <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                        <button className="btn btn-scordi gap-2 mb-1" onClick={() => setIsOpened(true)}>
                            + 청구서 계정 등록
                        </button>
                    </div>
                </div>
                <ListTable
                    items={result.items}
                    isLoading={isLoading}
                    Header={() => <InvoicesTableHeader orderBy={orderBy} />}
                    Row={({item}) => <InvoicesTableRow item={item} reload={reload} />}
                />
            </TeamDetailLayout>
        </>
    );
});
