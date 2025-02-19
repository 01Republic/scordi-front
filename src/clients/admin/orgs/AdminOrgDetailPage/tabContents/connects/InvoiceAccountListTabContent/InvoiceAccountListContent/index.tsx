import React, {memo} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {PagePerSelect} from '^components/Paginator';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {TabPaneProps} from '^components/util/tabs';
import {useInvoiceAccountsOfOrgByAdmin} from '../useInvoiceAccountsOfOrg.by-admin';
import {selectedInvoiceAccountAtom} from '../atoms';
import {InvoiceAccountItem} from './InvoiceAccountItem';

export const InvoiceAccountListContent = memo((props: TabPaneProps) => {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const setSelectedInvoiceAccount = useSetRecoilState(selectedInvoiceAccountAtom);
    const {data, isLoading, movePage, changePageSize} = useInvoiceAccountsOfOrgByAdmin(org?.id, {
        relations: ['invoiceApps'],
        where: {organizationId: org?.id},
        order: {id: 'DESC'},
        itemsPerPage: 0,
    });

    const {items, pagination} = data;

    if (!org) return <></>;
    if (isLoading) return <>loading...</>;

    return (
        <div className="w-full">
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    <PagePerSelect
                        className="select-sm"
                        defaultValue={pagination.itemsPerPage}
                        changePageSize={changePageSize}
                        allowAll
                    />
                </div>
            </div>

            <br />

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass="grid-cols-5"
                    entries={items}
                    pagination={pagination}
                    pageMove={movePage}
                    // 인보이스 계정의 활성상태는
                    // 기존에는 사용자가 설정하는 활성화 여부를 뜻했으나, (isActive)
                    // 조만간 계정의 토큰 만료상태를 의미하도록 바뀌어야 합니다. (ex: isTokenAlive)
                    entryComponent={(invoiceAccount, i, arr) => (
                        <InvoiceAccountItem
                            key={i}
                            invoiceAccount={invoiceAccount}
                            borderBottom={i + 1 < arr.length}
                            moveTab={() => {
                                moveTab(1);
                                setSelectedInvoiceAccount(invoiceAccount);
                            }}
                        />
                    )}
                >
                    <CardTableTH gridClass="grid-cols-12" className="text-12 items-center">
                        <div>ID</div>
                        <div className="col-span-2">Email</div>
                        {/*<div>개인/법인</div>*/}
                        <div className="col-span-1">등록일시</div>
                        <div className="col-span-1">남은 유효기간</div>
                        <div className="col-span-1">구독</div>
                        <div>발행일</div>
                        <div>연동여부</div>
                        <div className="">시작일</div>
                        <div className="">마지막 연동</div>
                        <div className="text-right">총 결제건수</div>
                        <div></div>
                    </CardTableTH>
                </CardTablePanel>
            </LoadableBox>
        </div>
    );
});
InvoiceAccountListContent.displayName = 'InvoiceAccountListContent';
