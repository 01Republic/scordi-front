import React, {memo, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {useAdminCodefBillingHistories} from '^models/CodefBillingHistory/hook';
import {LoadableBox} from '^components/util/loading';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {CodefBillingHistoryItem} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefBillingHistoryListContent/CodefBillingHistoryItem';
import {PagePerSelect} from '^components/Paginator';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {IoIosClose} from 'react-icons/io';

export const CodefBillingHistoryListContent = memo(function CodefBillingHistoryListContent() {
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefCard, selectCodefCard] = useState<CodefCardDto>();
    const {isLoading, search, query, reload, movePage, result, changePageSize} = useAdminCodefBillingHistories();

    useEffect(() => {
        if (!org) return;
        search({
            relations: ['codefCard'],
            organizationId: org.id,
            order: {usedAt: 'DESC'},
        });
    }, [org]);

    const {items, pagination} = result;

    const onCardSelect = (codefCard?: CodefCardDto) => {
        if (!org) return;
        selectCodefCard(codefCard);
        search({
            ...query,
            where: {codefCardId: codefCard?.id},
            page: 1,
        });
    };

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
                        <div className="flex items-center group cursor-pointer" onClick={() => onCardSelect()}>
                            <div>
                                <CodefCardTagUI codefCard={selectedCodefCard} />
                            </div>
                            <IoIosClose size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
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
                            onCardSelect={onCardSelect}
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
