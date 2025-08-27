import React, {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {X} from 'lucide-react';
import {useIdParam} from '^atoms/common';
import {useAdminCodefCards2} from '^models/CodefCard/hook';
import {LoadableBox} from '^components/util/loading';
import {PagePerSelect} from '^components/Paginator';
import {TabPaneProps} from '^components/util/tabs';
import {CardTablePanel, CardTableSortableColumn, CardTableTH, CardTableThLabel} from '^admin/share';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {selectedCodefAccountAtom, selectedCodefCardAtom} from '../atoms';
import {CodefCardItem} from './CodefCardItem';
import {groupDuplicateCards} from '^models/CodefCard/type/util';
import {toast} from 'react-hot-toast';

export const CodefCardListContent = memo(function CodefCardListContent(props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefAccount, setSelectedCodefAccount] = useRecoilState(selectedCodefAccountAtom);
    const setSelectedCodefCard = useSetRecoilState(selectedCodefCardAtom);
    const orgId = useIdParam('id');
    const {isLoading, search, reload, movePage, result, query, changePageSize, orderBy} = useAdminCodefCards2(orgId);

    useEffect(() => {
        if (!org) return;

        if (!selectedCodefAccount) {
            search({
                relations: ['account', 'codefBillingHistories'],
                page: 1,
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
                    <div>
                        <button
                            className={`btn btn-xs btn-white no-animation btn-animation ${
                                isLoading || pagination.itemsPerPage !== 0 ? 'opacity-50' : ''
                            }`}
                            onClick={(e) => {
                                if (isLoading) return toast('로딩 중입니다. 잠시후에 실행해주세요.');
                                if (pagination.itemsPerPage !== 0) {
                                    // return changePageSize(0);
                                    return toast('페이지당 갯수를 [전체 보기] 로 설정해주세요.');
                                }
                                // search({where: {resCardNo: {op: 'in', val: duplicatedGroups.flat()}}});

                                const button = e.currentTarget;
                                const hiddenLists = document.querySelectorAll('ul > div > div > li.hidden');

                                if (hiddenLists.length > 0) {
                                    // 중복체크 해제
                                    hiddenLists.forEach((li) => li.classList.remove('hidden'));
                                    button.classList.add('btn-white');
                                    button.classList.remove('btn-scordi');
                                    button.innerText = '중복 체크';
                                } else {
                                    // 중복체크 실행
                                    const cardNumbers = items.map((item) => item.resCardNo);
                                    const duplicatedGroups = groupDuplicateCards(cardNumbers);
                                    const allList = document.querySelectorAll('ul > div > div > li');
                                    allList.forEach((li) => li.classList.add('hidden'));

                                    const displayedCounter: Record<string, number> = {};
                                    duplicatedGroups.flat().forEach((resCardNo) => {
                                        const selector = `ul > div > div > li > div > div:nth-child(3) > div[data-res-card-no="${resCardNo}"]`;
                                        const displayDivList = document.querySelectorAll(selector);
                                        displayDivList.forEach((div) => {
                                            div.closest('li')?.classList.remove('hidden');
                                        });
                                        displayedCounter[resCardNo] =
                                            (displayedCounter[resCardNo] || 0) + displayDivList.length;
                                    });

                                    button.classList.add('btn-scordi');
                                    button.classList.remove('btn-white');
                                    const displayedCount = Object.values(displayedCounter).reduce((a, b) => a + b, 0);
                                    button.innerText = `중복 체크 (${displayedCount}개 확인됨)`;
                                }
                            }}
                        >
                            중복 체크
                        </button>
                    </div>

                    <PagePerSelect
                        isLoading={isLoading}
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
                            <X size={20} className="text-gray-400 group-hover:text-gray-800 transition-all" />
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
                    <CardTableTH gridClass="grid-cols-13" className="text-12 items-center">
                        <div>ID</div>
                        <div>카드사</div>
                        {/*<div>개인/법인</div>*/}
                        <div className="">끝자리</div>
                        <div className="">등록일시</div>
                        <div className="col-span-2">불러온 카드명</div>
                        <div>발행일</div>
                        <div>연동여부</div>
                        <CardTableSortableColumn
                            className="col-span-2 justify-start"
                            defaultValue={query.order?.lastSyncedAt}
                            onClick={(sortVal) => orderBy('lastSyncedAt', sortVal)}
                        >
                            <CardTableThLabel
                                text="마지막 연동"
                                hint={
                                    <div>
                                        코드에프 연동이 <br /> 마지막으로 실행된 날짜입니다.
                                    </div>
                                }
                            />
                        </CardTableSortableColumn>
                        <div className="">
                            <CardTableThLabel
                                text="결제기간"
                                hint={
                                    <div>
                                        불러온 하위 결제내역 리스트에서 <br />
                                        조회된 실제 결제일시 정보의 <br />
                                        시작과 끝 날짜범위를 반환합니다.
                                    </div>
                                }
                            />
                        </div>
                        <div className="text-right">총 결제건수</div>
                        <div></div>
                    </CardTableTH>
                </CardTablePanel>
            </LoadableBox>
        </div>
    );
});
