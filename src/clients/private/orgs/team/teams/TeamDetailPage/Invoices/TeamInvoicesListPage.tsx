import React, {memo, useEffect, useState} from 'react';
import {TeamDetailLayout} from '^clients/private/orgs/team/teams/TeamDetailPage/TeamDetailLayout';
import {ListPageSearchInput} from '^clients/private/_layouts/_shared/ListPageSearchInput';
import {useTeamInvoiceAccountListInTeamDetail} from '^models/TeamInvoiceAccount/hook';
import {useInvoiceAccounts} from '^models/InvoiceAccount/hook';
import {AddInvoiceModal} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/AddInvoiceModal';
import {orgIdParamState} from '^atoms/common';
import {useRecoilValue} from 'recoil';
import search from '^pages/apps/search';
import {ListTable, ListTableContainer} from '^clients/private/_components/table/ListTable';
import {InvoicesTableHeader} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/InvoicesTableHeader';
import {InvoicesTableRow} from '^clients/private/orgs/team/teams/TeamDetailPage/Invoices/InvoicesTableRow';
import {FaPlus} from 'react-icons/fa6';

export const TeamInvoicesListPage = memo(function TeamInvoicesListPage() {
    const orgId = useRecoilValue(orgIdParamState);
    const {search, result, isLoading, query, searchAndUpdateCounter, movePage, changePageSize, reload, orderBy} =
        useTeamInvoiceAccountListInTeamDetail();
    const [isOpened, setIsOpened] = useState(false);

    const onSearch = (keyword?: string) => {
        // !!keyword &&
        //     search({
        //         where: {
        //             invoiceAccount: {
        //                 email: keyword,
        //             },
        //         },
        //         relations: ['invoiceAccount', 'invoiceAccount.holdingMember'],
        //     });
    };

    useEffect(() => {
        !!orgId && search({relations: ['invoiceAccount', 'invoiceAccount.holdingMember']});
    }, [orgId]);

    return (
        <TeamDetailLayout>
            <div className={'flex items-center justify-between pb-4'}>
                <div>
                    전체 <span className={'text-scordi-500'}>{result.pagination.totalItemCount}</span>
                </div>
                <div className={'flex space-x-4'}>
                    <ListPageSearchInput onSearch={onSearch} placeholder={'검색어를 입력해주세요'} />
                    <button className="btn btn-square btn-scordi mb-1" onClick={() => setIsOpened(true)}>
                        <FaPlus fontSize={20} />
                    </button>
                </div>
            </div>
            {result.items.length > 0 ? (
                <ListTableContainer
                    pagination={result.pagination}
                    movePage={movePage}
                    changePageSize={changePageSize}
                    unit="개"
                    hideTopPaginator={true}
                >
                    <ListTable
                        items={result.items}
                        isLoading={isLoading}
                        Header={() => <InvoicesTableHeader orderBy={orderBy} />}
                        Row={({item}) => <InvoicesTableRow item={item} reload={reload} />}
                    />
                </ListTableContainer>
            ) : (
                <div className={'text-center py-8'}>
                    <p>항목이 없습니다. 청구서 수신 계정을 추가해 주세요.</p>
                </div>
            )}

            {/* 연결 추가 모달 */}
            <AddInvoiceModal
                preItems={result.items}
                isOpened={isOpened}
                onClose={() => {
                    setIsOpened(false);
                    reload();
                }}
            />
        </TeamDetailLayout>
    );
});
