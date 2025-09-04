import {memo, useEffect} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {X} from 'lucide-react';
import {useIdParam} from '^atoms/common';
import {useAdminCodefBillingHistories} from '^models/CodefBillingHistory/hook';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {LoadableBox} from '^components/util/loading';
import {PagePerSelect} from '^components/Paginator';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {selectedCodefCardAtom} from '../atoms';
import {CodefBillingHistoryItem} from './CodefBillingHistoryItem';
import {FixTimeZoneButton} from './FixTimeZoneButton';

export const CodefBillingHistoryListContent = memo(function CodefBillingHistoryListContent() {
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefCard, setSelectedCodefCard] = useRecoilState(selectedCodefCardAtom);
    const orgId = useIdParam('id');
    const {isLoading, search, query, reload, movePage, result, changePageSize} = useAdminCodefBillingHistories(orgId);

    useEffect(() => {
        if (!org) return;

        const orgId = org.id;
        if (!selectedCodefCard) {
            search({
                relations: ['codefCard'],
                where: {
                    codefCard: {account: {orgId}},
                },
                page: 1,
                order: {usedAt: 'DESC'},
            });
        } else {
            search({
                relations: ['codefCard'],
                where: {
                    codefCard: {account: {orgId}},
                    codefCardId: selectedCodefCard.id,
                },
                page: 1,
                order: {usedAt: 'DESC'},
            });
        }
    }, [org, selectedCodefCard]);

    const {items, pagination} = result;

    return (
        <div>
            <div className="flex items-center justify-between text-14">
                <div>
                    총 {pagination.totalItemCount}개의 결과, {pagination.totalPage}p 중 {pagination.currentPage}p
                </div>

                <div className="flex items-center gap-4">
                    <FixTimeZoneButton query={query} result={result} reload={reload} />

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
                            reload={reload}
                        />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                >
                    <CardTableTH gridClass="grid-cols-14" className="text-12 items-center">
                        <div>ID</div>
                        <div className="col-span-2">결제일시</div>
                        <div className="">승인번호</div>
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
