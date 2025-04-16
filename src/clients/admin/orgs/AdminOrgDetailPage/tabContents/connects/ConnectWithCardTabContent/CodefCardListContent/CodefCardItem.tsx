import React, {memo, useRef} from 'react';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {CodefCardTagUI} from '^admin/factories/codef-parser-factories/form/share/CodefCardTagUI';
import {CardTableTR} from '^admin/share';
import {hh_mm, yyyy_mm_dd} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {adminOrgDetail} from '^admin/orgs/AdminOrgDetailPage';
import {LoadableBox} from '^components/util/loading';
import Tippy from '@tippyjs/react';
import {creditCardApi} from '^models/CreditCard/api';
import {toast} from 'react-hot-toast';
import {MoreDropdown} from '^clients/private/_components/MoreDropdown';
import {confirm2, confirmed} from '^components/util/dialog';
import {codefCardApi} from '^models/CodefCard/api';
import {errorToast} from '^api/api';
import {selectedCodefAccountAtom, selectedCodefCardAtom} from '../atoms';
import {CodefCardRowActionColumn} from '^admin/orgs/AdminOrgDetailPage/tabContents/connects/ConnectWithCardTabContent/CodefCardListContent/ActionColumn';
import {Check, FolderOpen, MoreHorizontal, RotateCw, X, XCircle} from 'lucide-react';

interface CodefCardItemProps {
    codefCard: CodefCardDto;
    reload: () => Promise<any>;
    moveTab: (tabIndex: number) => any;
}

export const CodefCardItem = memo((props: CodefCardItemProps) => {
    const {codefCard, reload, moveTab} = props;
    const setSelectedCodefAccount = useSetRecoilState(selectedCodefAccountAtom);
    const setSelectedCodefCard = useSetRecoilState(selectedCodefCardAtom);
    const {isSyncRunning} = useCodefCardSync();

    const account = codefCard.account!;
    const codefBillingHistories = codefCard.codefBillingHistories || [];
    const isConnected = !!codefCard.creditCardId;
    const isSleep = !!codefCard.isSleep;
    const sleepStyleClass: string = 'opacity-20';

    const goCardHistories = () => {
        moveTab(2);
        setSelectedCodefCard(codefCard);
    };

    return (
        <LoadableBox loadingType={2} isLoading={isSyncRunning} noPadding spinnerSize={20} spinnerPos="center">
            <CardTableTR gridClass="grid-cols-12" className={`!text-12 cursor-pointer group !gap-1`}>
                {/* ID */}
                <div>
                    <span className="badge badge-xs">#{codefCard.id}</span>
                </div>

                {/* 카드사 */}
                <div className="cursor-pointer" onClick={() => setSelectedCodefAccount(codefCard.account)}>
                    {account.company || '-'}
                </div>

                {/*/!* 개인/법인 *!/*/}
                {/*<div className="">*/}
                {/*    {account.clientType === CodefCustomerType.Business && '법인'}*/}
                {/*    {account.clientType === CodefCustomerType.Personal && '개인'}*/}
                {/*    {account.clientType === CodefCustomerType.All && '통합'}*/}
                {/*</div>*/}

                {/* 끝자리 */}
                <div className="flex items-center gap-1 justify-between">
                    <div className="tooltip tooltip-top tooltip-success" data-tip={codefCard.resCardNo}>
                        <CodefCardTagUI codefCard={codefCard} onClick={() => goCardHistories()} />
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
                        <span className={isSleep ? sleepStyleClass : ''}>
                            {!account.connectedIdentityId ? <b>[by 엑셀] </b> : ''}
                            {codefCard.resCardName}
                        </span>
                    </div>

                    <div className="hidden group-hover:flex">
                        <LinkTo href="#" displayLoading={false}>
                            <TagUI className="bg-white btn-animation no-selectable gap-1 hover:bg-gray-200 shadow-lg border !border-gray-300">
                                <FolderOpen size={10} />
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
                                <X fontSize={16} className="text-red-500" />
                            </div>
                        </Tippy>
                    )}
                    {isConnected && (
                        <Tippy content={`카드 아이디: ${codefCard.creditCardId}`}>
                            <div>
                                <Check className="text-scordi" />
                            </div>
                        </Tippy>
                    )}
                </div>

                {/* 연동 시작일 */}
                <div className="">{codefCard.syncedStartDate && yyyy_mm_dd(codefCard.syncedStartDate)}</div>

                {/* 마지막 연동 */}
                <div className="">{codefCard.syncedEndDate && yyyy_mm_dd(codefCard.syncedEndDate)}</div>

                {/* 불러온 결제내역 수 */}
                <div className="text-right" onClick={() => goCardHistories()}>
                    {codefBillingHistories.length.toLocaleString()}건
                </div>

                <div className="flex items-center justify-end gap-1">
                    <CodefCardRowActionColumn codefCard={codefCard} reload={reload} moveTab={moveTab} />
                </div>
            </CardTableTR>
        </LoadableBox>
    );
});
CodefCardItem.displayName = 'CodefCardItem';
