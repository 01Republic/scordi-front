import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {X} from 'lucide-react';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useAdminCodefBillingHistories} from '^models/CodefBillingHistory/hook';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {PagePerSelect} from '^components/Paginator';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {selectedCodefBankAccountAtom} from '../atoms';
import {CodefBillingHistoryItem} from './CodefBillingHistoryItem';
import {useIdParam} from '^atoms/common';

export const CodefBillingHistoryListContent = memo(function CodefBillingHistoryListContent() {
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefAsset, setSelectedCodefAsset] = useRecoilState(selectedCodefBankAccountAtom);
    const orgId = useIdParam('id');
    const {isLoading, search, query, reload, movePage, result, changePageSize} = useAdminCodefBillingHistories(orgId);

    useEffect(() => {
        if (!org) return;

        const orgId = org.id;
        if (!selectedCodefAsset) {
            search({
                relations: ['codefBankAccount', 'codefBankAccount.account'],
                where: {
                    codefBankAccount: {account: {orgId}},
                },
                order: {usedAt: 'DESC'},
            });
        } else {
            search({
                relations: ['codefBankAccount', 'codefBankAccount.account'],
                where: {
                    codefBankAccount: {account: {orgId}},
                    codefBankAccountId: selectedCodefAsset.id,
                },
                page: 1,
                order: {usedAt: 'DESC'},
            });
        }
    }, [org, selectedCodefAsset]);

    const {items, pagination} = result;

    return (
        <div>
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

            {selectedCodefAsset && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: CodefCard */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 계좌:</div>
                        <div
                            className="flex items-center group cursor-pointer"
                            onClick={() => setSelectedCodefAsset(undefined)}
                        >
                            <div>
                                <CodefBankAccountTagUI
                                    codefBankAccount={selectedCodefAsset}
                                    render={(item) => item.title}
                                />
                            </div>
                            <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                        </div>
                    </div>
                </section>
            )}

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={''}
                    entries={items}
                    entryComponent={(codefBillingHistory, i) => (
                        <CodefBillingHistoryItem
                            key={i}
                            codefBillingHistory={codefBillingHistory}
                            onAssetSelect={setSelectedCodefAsset}
                        />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                >
                    <CardTableTH gridClass="grid-cols-12" className="text-12 items-center">
                        <div>ID</div>
                        <div className="col-span-2">결제일시</div>
                        <div>계좌</div>
                        <div className="col-span-3">제목</div>
                        <div className="col-span-2 text-right">금액</div>
                        <div>결제상태</div>
                        {/*<div>해외결제여부</div>*/}
                        <div>스코디 연동</div>
                        <div></div>
                    </CardTableTH>
                </CardTablePanel>
            </LoadableBox>
        </div>
    );
});
