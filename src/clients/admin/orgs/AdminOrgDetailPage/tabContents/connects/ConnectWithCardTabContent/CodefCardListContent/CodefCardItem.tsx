import React, {memo, useRef} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {FaCheck, FaRegCircleXmark} from 'react-icons/fa6';
import {CardTableTR} from '^admin/share';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {FaRegFolderOpen} from 'react-icons/fa';
import {useCodefCardSync, useCodefCardSyncQueue} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {LoadableBox} from '^components/util/loading';
import {MdOutlineClear} from 'react-icons/md';
import Tippy from '@tippyjs/react';
import {IoMdMore} from 'react-icons/io';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {IoRefresh} from '@react-icons/all-files/io5/IoRefresh';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefCardApi} from '^models/CodefCard/api';
import {errorToast} from '^api/api';

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
    const isSleep = !!codefCard.isSleep;
    const sleepStyleClass: string = 'opacity-20';

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

    // 이 '코드에프 카드' 항목 삭제
    const removeCodefCard = () => {
        if (!org) return;
        const removeConfirm = () => {
            return confirm2(
                '진짜 삭제할까요?',
                <div>
                    <p>
                        나중에 카드사 계정 연동이 최신화 되었을 때, DB에 없는 카드가 감지되면 사용자에게 신규카드가
                        발견된 것 처럼 보일 수 있습니다.
                    </p>
                    <p>그래도 삭제할까요?</p>
                </div>,
            );
        };

        return confirmed(removeConfirm())
            .then(() => codefCardApi.destroy(org.id, codefCard.id))
            .then(() => toast.success(`코드에프 카드 (${codefCard.resCardName}) 삭제완료`))
            .then(() => codefCard.creditCardId && disconnectCreditCard('연결된 결제수단(카드)도 함께 제거 할까요?'))
            .then(() => reload())
            .catch(errorToast);
    };

    // 연결된 결제수단(카드) 제거
    const disconnectCreditCard = (title?: string) => {
        if (!org || !codefCard.creditCardId) return;
        const creditCardId = codefCard.creditCardId;

        return confirmed(confirm2(title || '진짜 삭제할까요?'))
            .then(() => creditCardApi.destroy(org.id, creditCardId))
            .then(() => toast.success('Successfully disconnected'))
            .then(() => reload())
            .catch(errorToast);
    };

    return (
        <LoadableBox loadingType={2} isLoading={isSyncRunning} noPadding spinnerSize={20} spinnerPos="center">
            <CardTableTR gridClass="grid-cols-12" className={`!text-12 cursor-pointer group !gap-1`}>
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
                <div className="flex items-center gap-1 justify-between">
                    <div className="tooltip tooltip-top tooltip-success" data-tip={codefCard.resCardNo}>
                        <CodefCardTagUI codefCard={codefCard} />
                    </div>
                </div>

                {/* 등록일시 */}
                <div className={isSleep ? sleepStyleClass : ''}>
                    <div
                        className={isSleep ? '' : `tooltip tooltip-top tooltip-success`}
                        data-tip={hh_mm(codefCard.createdAt)}
                    >
                        {yyyy_mm_dd(codefCard.createdAt)}
                    </div>
                </div>

                {/* 불러온 카드명 */}
                <div className="col-span-2 flex items-center justify-between">
                    <div className="whitespace-nowrap overflow-hidden">
                        <span className={isSleep ? sleepStyleClass : ''}>{codefCard.resCardName}</span>
                    </div>

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
                <div className={isSleep ? sleepStyleClass : ''}>{codefCard.resIssueDate}</div>

                {/* 연동여부 */}
                <div className="flex items-center gap-1.5">
                    {isSleep && (
                        <Tippy content="휴면처리된 카드">
                            <div>
                                <MdOutlineClear fontSize={16} className="text-red-500" />
                            </div>
                        </Tippy>
                    )}
                    {isConnected && (
                        <Tippy content={`카드 아이디: ${codefCard.creditCardId}`}>
                            <div>
                                <FaCheck className="text-scordi" />
                            </div>
                        </Tippy>
                    )}
                </div>

                {/* 연동 시작일 */}
                <div className="">{codefCard.syncedStartDate && yyyy_mm_dd(codefCard.syncedStartDate)}</div>

                {/* 마지막 연동 */}
                <div className="">{codefCard.syncedEndDate && yyyy_mm_dd(codefCard.syncedEndDate)}</div>

                {/* 불러온 결제내역 수 */}
                <div className="text-right">{codefBillingHistories.length.toLocaleString()}건</div>

                <div className="flex items-center justify-end gap-1">
                    <Tippy content="최신화">
                        <button
                            disabled={isSyncRunning}
                            className={`btn btn-xs btn-scordi btn-square capitalize ${isSyncRunning ? 'loading' : ''}`}
                            onClick={syncButtonClickHandler}
                        >
                            <IoRefresh />
                        </button>
                    </Tippy>

                    <MoreDropdown
                        placement="bottom-end"
                        Trigger={() => (
                            <button className={`btn btn-xs btn-square !border-gray-400 !bg-white !text-gray-600`}>
                                <IoMdMore fontSize={16} />
                            </button>
                        )}
                    >
                        {() => (
                            <div className="card card-bordered card-compact rounded-md shadow-lg bg-white text-12 min-w-[100px]">
                                <div
                                    onClick={() => removeCodefCard()}
                                    className="cursor-pointer px-2 py-1 hover:bg-slate-100 btn-animation"
                                >
                                    이 '코드에프 카드' 항목 삭제
                                </div>
                                {codefCard.creditCardId && (
                                    <div
                                        onClick={() => disconnectCreditCard()}
                                        className="cursor-pointer px-2 py-1 hover:bg-slate-100 btn-animation"
                                    >
                                        연결된 결제수단(카드) 제거
                                    </div>
                                )}
                            </div>
                        )}
                    </MoreDropdown>
                </div>
            </CardTableTR>
        </LoadableBox>
    );
});
CodefCardItem.displayName = 'CodefCardItem';
