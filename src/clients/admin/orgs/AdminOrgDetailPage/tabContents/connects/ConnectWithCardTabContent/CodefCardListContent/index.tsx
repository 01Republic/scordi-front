import React, {memo, useEffect} from 'react';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {LoadableBox} from '^components/util/loading';
import {useAdminCodefCards} from '^models/CodefCard/hook';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {PagePerSelect} from '^components/Paginator';
import {TabPaneProps} from '^components/util/tabs';
import {selectedCodefAccountAtom, selectedCodefCardAtom} from '../atoms';
import {CodefCardItem} from './CodefCardItem';
import {IoIosClose} from 'react-icons/io';

export const CodefCardListContent = memo(function CodefCardListContent(props: TabPaneProps) {
    const {moveTab} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefAccount, setSelectedCodefAccount] = useRecoilState(selectedCodefAccountAtom);
    const setSelectedCodefCard = useSetRecoilState(selectedCodefCardAtom);
    const {isLoading, search, reload, movePage, result, changePageSize} = useAdminCodefCards();

    useEffect(() => {
        if (!org) return;

        if (!selectedCodefAccount) {
            search({
                relations: ['account', 'codefBillingHistories'],
                organizationId: org.id,
                order: {id: 'DESC'},
            });
        } else {
            search({
                relations: ['account', 'codefBillingHistories'],
                organizationId: org.id,
                where: {accountId: selectedCodefAccount.id},
                page: 1,
                order: {id: 'DESC'},
            });
        }
        setSelectedCodefCard(undefined);
    }, [org, selectedCodefAccount]);

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

            {selectedCodefAccount && (
                // Filter Section
                <section className="flex items-center text-12 gap-4 mb-4">
                    {/* Filter: CodefCard */}
                    <div className="flex items-center">
                        <div className="mr-2">선택된 카드:</div>
                        <div
                            className="flex items-center group cursor-pointer"
                            onClick={() => setSelectedCodefAccount(undefined)}
                        >
                            <div className="">{selectedCodefAccount.profile}</div>
                            <IoIosClose size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
                        </div>
                    </div>
                </section>
            )}

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={''}
                    entries={items}
                    entryComponent={(codefCard, i) => (
                        <CodefCardItem key={i} codefCard={codefCard} reload={reload} moveTab={moveTab} />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                >
                    <CardTableTH gridClass="grid-cols-12" className="text-12 items-center">
                        <div>ID</div>
                        <div>카드사</div>
                        {/*<div>개인/법인</div>*/}
                        <div className="">끝자리</div>
                        <div className="">등록일시</div>
                        <div className="col-span-2">불러온 카드명</div>
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
