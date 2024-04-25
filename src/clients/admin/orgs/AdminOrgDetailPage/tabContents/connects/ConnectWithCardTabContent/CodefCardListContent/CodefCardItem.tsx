import React, {memo, useRef} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {FaCheck} from 'react-icons/fa6';
import {CardTableTR} from '^admin/share';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaRegFolderOpen} from 'react-icons/fa';
import {useCodefCardSync, useCodefCardSyncQueue} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {LoadableBox} from '^components/util/loading';

interface CodefCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
}

export const CodefCardItem = memo((props: CodefCardItemProps) => {
    const org = useRecoilValue(adminOrgDetail);
    const {codefCard, reload} = props;
    const {syncCard, isSyncRunning} = useCodefCardSync();

    const account = codefCard.account!;
    const codefBillingHistories = codefCard.codefBillingHistories || [];
    const isConnected = !!codefCard.creditCardId;

    const syncButtonClickHandler = () => {
        if (!org) return;
        const run = () => {
            syncCard(org.id, codefCard).finally(() => reload());
        };

        const runningRows = document.querySelectorAll('.CodefCardItem-running');
        if (runningRows.length <= 2) {
            run();
        } else {
        }
    };

    return (
        <LoadableBox loadingType={2} isLoading={isSyncRunning} noPadding spinnerSize={20} spinnerPos="center">
            <CardTableTR gridClass="grid-cols-12" className={`text-12 cursor-pointer group`}>
                {/* ID */}
                <div>
                    <span className="badge badge-xs">#{codefCard.id}</span>
                </div>

                {/* 카드사 */}
                <div className="">{account.company || '-'}</div>

                {/*/!* 개인/법인 *!/*/}
                {/*<div className="">*/}
                {/*    {account.clientType === CodefCustomerType.Business && '법인'}*/}
                {/*    {account.clientType === CodefCustomerType.Personal && '개인'}*/}
                {/*    {account.clientType === CodefCustomerType.All && '통합'}*/}
                {/*</div>*/}

                {/* 끝자리 */}
                <div>
                    <div className="tooltip tooltip-top tooltip-success" data-tip={codefCard.resCardNo}>
                        <CodefCardTagUI codefCard={codefCard} />
                    </div>
                </div>

                {/* 등록일시 */}
                <div>
                    <div className="tooltip tooltip-top tooltip-success" data-tip={hh_mm(codefCard.createdAt)}>
                        {yyyy_mm_dd(codefCard.createdAt)}
                    </div>
                </div>

                {/* 불러온 카드명 */}
                <div className="col-span-2 flex items-center">
                    <div className="whitespace-nowrap overflow-hidden">{codefCard.resCardName}</div>

                    <div className="hidden group-hover:flex">
                        <LinkTo href="#" displayLoading={false}>
                            <TagUI className="bg-white btn-animation no-selectable gap-1 hover:bg-gray-200 shadow-lg border !border-gray-300">
                                <FaRegFolderOpen size={10} />
                                <span className="text-10">열기</span>
                            </TagUI>
                        </LinkTo>
                    </div>
                </div>

                {/* 발행일 */}
                <div>{codefCard.resIssueDate}</div>

                {/* 연동여부 */}
                <div>{isConnected ? <FaCheck className="text-scordi" /> : <></>}</div>

                {/* 연동 시작일 */}
                <div className="">{codefCard.syncedStartDate && yyyy_mm_dd(codefCard.syncedStartDate)}</div>

                {/* 마지막 연동 */}
                <div className="">{codefCard.syncedEndDate && yyyy_mm_dd(codefCard.syncedEndDate)}</div>

                {/* 불러온 결제내역 수 */}
                <div className="text-right">{codefBillingHistories.length.toLocaleString()}건</div>

                <div className="flex items-center justify-end gap-1">
                    <button
                        disabled={isSyncRunning}
                        className={`btn btn-xs btn-scordi capitalize ${isSyncRunning ? 'loading' : ''}`}
                        onClick={syncButtonClickHandler}
                    >
                        최신화
                    </button>
                </div>
            </CardTableTR>
        </LoadableBox>
    );
});
CodefCardItem.displayName = 'CodefCardItem';
