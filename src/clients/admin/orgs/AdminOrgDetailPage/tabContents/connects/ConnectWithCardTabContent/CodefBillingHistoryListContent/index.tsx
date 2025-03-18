import React, {memo, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useAdminCodefBillingHistories} from '^models/CodefBillingHistory/hook';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {PagePerSelect} from '^components/Paginator';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {selectedCodefCardAtom} from '../atoms';
import {CodefBillingHistoryItem} from './CodefBillingHistoryItem';
import {X} from 'lucide-react';

export const CodefBillingHistoryListContent = memo(function CodefBillingHistoryListContent() {
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefCard, setSelectedCodefCard] = useRecoilState(selectedCodefCardAtom);
    const {isLoading, search, query, reload, movePage, result, changePageSize} = useAdminCodefBillingHistories();

    useEffect(() => {
        if (!org) return;

        if (!selectedCodefCard) {
            search({
                relations: ['codefCard'],
                organizationId: org.id,
                order: {usedAt: 'DESC'},
            });
        } else {
            search({
                relations: ['codefCard'],
                organizationId: org.id,
                where: {codefCardId: selectedCodefCard.id},
                page: 1,
                order: {usedAt: 'DESC'},
            });
        }
    }, [org, selectedCodefCard]);

    // useUnmount(() => setSelectedCodefCard(undefined));

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

            {selectedCodefCard && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: CodefCard */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 카드:</div>
                        <div
                            className="flex items-center group cursor-pointer"
                            onClick={() => setSelectedCodefCard(undefined)}
                        >
                            <div>
                                <CodefCardTagUI codefCard={selectedCodefCard} />
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
                            onCardSelect={setSelectedCodefCard}
                        />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                >
                    <CardTableTH gridClass="grid-cols-14" className="text-12 items-center">
                        <div>ID</div>
                        <div className="col-span-3">결제일시</div>
                        <div>카드</div>
                        <div className="col-span-3">제목</div>
                        <div className="col-span-2 text-right">금액</div>
                        <div>결제상태</div>
                        {/*<div>해외결제여부</div>*/}
                        <div>스코디 연동</div>
                        <div></div>
                        <div></div>
                    </CardTableTH>
                </CardTablePanel>
            </LoadableBox>
        </div>
    );
});
