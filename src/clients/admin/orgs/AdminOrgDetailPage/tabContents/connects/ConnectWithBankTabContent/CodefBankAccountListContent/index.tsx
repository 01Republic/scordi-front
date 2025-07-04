import React, {memo, ReactNode, useEffect} from 'react';
import {CardTablePanel, CardTableTH} from '^admin/share';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {LoadableBox} from '^components/util/loading';
import {useAdminCodefBankAccounts} from '^models/CodefBankAccount/hook';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {PagePerSelect} from '^components/Paginator';
import {TabPaneProps} from '^components/util/tabs';
import {selectedCodefAccountAtom, selectedCodefBankAccountAtom} from '../atoms';
import {CodefBankAccountItem} from './CodefBankAccountItem';
import {MessageCircleQuestion, X} from 'lucide-react';
import Tippy from '@tippyjs/react';

export const CodefBankAccountListContent = memo(function CodefBankAccountListContent(props: TabPaneProps) {
    const {moveTab = console.log} = props;
    const org = useRecoilValue(adminOrgDetail);
    const [selectedCodefAccount, setSelectedCodefAccount] = useRecoilState(selectedCodefAccountAtom);
    const setSelectedCodefAsset = useSetRecoilState(selectedCodefBankAccountAtom);
    const {isLoading, search, reload, movePage, result, changePageSize} = useAdminCodefBankAccounts();

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
        setSelectedCodefAsset(undefined);
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
                        <div className="mr-2">선택된 계좌:</div>
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
                    entryComponent={(codefBankAccount, i) => (
                        <CodefBankAccountItem
                            key={i}
                            codefBankAccount={codefBankAccount}
                            reload={reload}
                            moveTab={moveTab}
                        />
                    )}
                    pagination={pagination}
                    pageMove={movePage}
                >
                    <CardTableTH gridClass="grid-cols-12" className="text-12 items-center">
                        <div>ID</div>
                        <div>은행</div>
                        {/*<div>개인/법인</div>*/}
                        <div className="">끝자리</div>
                        <div className="">등록일시</div>
                        <div className="col-span-2">이름</div>
                        <div>발행일</div>
                        <div>연동여부</div>
                        <div className="">
                            <Label
                                text="마지막 연동"
                                hint={
                                    <div>
                                        코드에프 연동이 <br /> 마지막으로 실행된 날짜입니다.
                                    </div>
                                }
                            />
                        </div>
                        <div className="">
                            <Label
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

interface LabelProps {
    text: ReactNode;
    hint?: ReactNode;
    className?: string;
}

const Label = (props: LabelProps) => {
    const {text, hint, className = ''} = props;

    return (
        <div className="flex items-center gap-1">
            <div>{text}</div>

            {hint && (
                <Tippy content={hint} className="!text-11">
                    <div>
                        <MessageCircleQuestion fontSize={12} className="text-gray-400" />
                    </div>
                </Tippy>
            )}
        </div>
    );
};
