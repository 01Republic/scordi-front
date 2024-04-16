import React, {memo, useEffect} from 'react';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {useRecoilValue} from 'recoil';
import {LoadableBox} from '^components/util/loading';
import {useAdminCodefCards} from '^models/CodefCard/hook';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {CodefCardItem} from './CodefCardItem';
import {useCodefCardSyncQueue} from '^models/CodefCard/hooks/useCodefCardSync';

export const CodefCardListContent = memo(function CodefCardListContent() {
    const org = useRecoilValue(adminOrgDetail);
    const {isLoading, search, reload, movePage, result, changePageSize} = useAdminCodefCards();

    useEffect(() => {
        if (!org) return;
        search({
            relations: ['account', 'codefBillingHistories'],
            organizationId: org.id,
        });
    }, [org]);

    const {items, pagination} = result;

    return (
        <div>
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    <select
                        className="select select-sm select-bordered"
                        defaultValue={pagination.itemsPerPage === 0 ? 0 : pagination.itemsPerPage}
                        onChange={(e) => changePageSize(Number(e.target.value))}
                    >
                        {[10, 30, 50, 100].map((value, i) => (
                            <option key={i} value={value}>
                                {value} 개씩 보기
                            </option>
                        ))}
                        <option value={0}>전체 보기</option>
                    </select>
                </div>
            </div>

            <br />

            <LoadableBox isLoading={isLoading} loadingType={2} noPadding>
                <CardTablePanel
                    gridClass={''}
                    entries={items}
                    entryComponent={(codefCard, i) => <CodefCardItem key={i} codefCard={codefCard} reload={reload} />}
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
