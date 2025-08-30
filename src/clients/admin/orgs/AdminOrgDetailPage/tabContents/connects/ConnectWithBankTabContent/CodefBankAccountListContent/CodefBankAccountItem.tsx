import React, {memo} from 'react';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {Check, FolderOpen, X} from 'lucide-react';
import Tippy from '@tippyjs/react';
import {formatDate, hh_mm, lpp, yyyy_mm_dd} from '^utils/dateTime';
import {LinkTo} from '^components/util/LinkTo';
import {LoadableBox} from '^components/util/loading';
import {TagUI} from '^v3/share/table/columns/share/TagUI';
import {useCodefCardSync} from '^models/CodefCard/hooks/useCodefCardSync';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CardTableTR} from '^admin/share';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {selectedCodefAccountAtom, selectedCodefBankAccountAtom} from '../atoms';
import {CodefBankAccountActionColumn} from './ActionColumn';
import {t_codefCustomerType} from '^models/CodefAccount/type/enums';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {unitFormat} from '^utils/number';
import {isSyncRunningAtom} from '^models/CodefCard/hooks/useCodefCardSyncQueue';

interface CodefCardItemProps {
    codefBankAccount: CodefBankAccountDto;
    reload: () => Promise<any>;
    moveTab: (tabIndex: number) => any;
}

export const CodefBankAccountItem = memo((props: CodefCardItemProps) => {
    const {codefBankAccount, reload, moveTab} = props;
    const setSelectedCodefAccount = useSetRecoilState(selectedCodefAccountAtom);
    const setSelectedCodefAsset = useSetRecoilState(selectedCodefBankAccountAtom);
    const [isSyncRunning, setIsSyncRunning] = useRecoilState(isSyncRunningAtom);

    const account = codefBankAccount.account!;
    const codefBillingHistories = codefBankAccount.codefBillingHistories || [];
    const isConnected = !!codefBankAccount.bankAccountId;
    const isSleep = false;
    const sleepStyleClass: string = 'opacity-20';

    const goHistories = () => {
        moveTab(2);
        setSelectedCodefAsset(codefBankAccount);
    };

    const {lastSyncedAt, syncedStartDate, syncedEndDate} = codefBankAccount;

    return (
        <LoadableBox loadingType={2} isLoading={isSyncRunning} noPadding spinnerSize={20} spinnerPos="center">
            <CardTableTR gridClass="grid-cols-13" className={`!text-12 cursor-pointer group !gap-1`}>
                {/* ID */}
                <div>
                    <span className="badge badge-xs">#{codefBankAccount.id}</span>
                </div>

                {/* 은행 */}
                <div className="cursor-pointer" onClick={() => setSelectedCodefAccount(codefBankAccount.account)}>
                    {codefBankAccount.company?.displayName || '- '}({t_codefCustomerType(account.clientType)})
                </div>

                {/*/!* 개인/법인 *!/*/}
                {/*<div className="">*/}
                {/*    {account.clientType === CodefCustomerType.Business && '법인'}*/}
                {/*    {account.clientType === CodefCustomerType.Personal && '개인'}*/}
                {/*    {account.clientType === CodefCustomerType.All && '통합'}*/}
                {/*</div>*/}

                {/* 끝자리 */}
                <div className="flex items-center gap-1 justify-between">
                    <div className="tooltip tooltip-top tooltip-success" data-tip={codefBankAccount.resAccountDisplay}>
                        <CodefBankAccountTagUI codefBankAccount={codefBankAccount} onClick={() => goHistories()} />
                    </div>
                </div>

                {/* 등록일시 */}
                <div className={isSleep ? sleepStyleClass : ''}>
                    <div
                        className={isSleep ? '' : `tooltip tooltip-top tooltip-success`}
                        data-tip={hh_mm(codefBankAccount.createdAt)}
                    >
                        {yyyy_mm_dd(codefBankAccount.createdAt)}
                    </div>
                </div>

                {/* 이름 */}
                <div
                    className="col-span-2 flex items-center justify-between"
                    onClick={() => console.log(codefBankAccount)}
                >
                    <div className="">
                        <div className="flex items-center gap-1 text-10 leading-none">
                            {codefBankAccount.isOverDraft && <div className="text-red-500 mb-0.5">#마이너스통장</div>}
                        </div>

                        <div className="whitespace-nowrap overflow-hidden leading-none mb-0.5">
                            <span className={isSleep ? sleepStyleClass : ''}>
                                {!account.connectedIdentityId ? <b>[by 엑셀] </b> : ''}
                                {codefBankAccount.resAccountName}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 text-10 leading-none">
                            <div className="text-gray-500">{codefBankAccount.resAccountDisplay}</div>
                        </div>
                    </div>

                    <div className="!hidden group-hover:flex">
                        <LinkTo href="#" displayLoading={false}>
                            <TagUI className="bg-white btn-animation no-selectable gap-1 hover:bg-gray-200 shadow-lg border !border-gray-300">
                                <FolderOpen size={10} />
                                <span className="text-10">열기</span>
                            </TagUI>
                        </LinkTo>
                    </div>
                </div>

                {/* 발행일 */}
                <div className={isSleep ? sleepStyleClass : ''}>{codefBankAccount.resAccountStartDate}</div>

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
                        <Tippy content={`계좌 아이디: ${codefBankAccount.bankAccountId}`}>
                            <div>
                                <Check className="text-scordi" />
                            </div>
                        </Tippy>
                    )}
                </div>

                {/* 마지막 연동 */}
                <div className="text-11 col-span-2">{lastSyncedAt && formatDate(lastSyncedAt)}</div>

                {/* 결제기간 */}
                <div className="">
                    <div className="flex items-center flex-wrap text-11 leading-none">
                        <span>
                            {syncedStartDate ? (
                                lpp(syncedStartDate, 'P')
                            ) : (
                                <span className="italic text-gray-400">없음</span>
                            )}
                            <span className="mx-[1px]">~</span>
                        </span>
                        <span>
                            {syncedEndDate ? (
                                lpp(syncedEndDate, 'P')
                            ) : (
                                <span className="italic text-gray-400">없음</span>
                            )}
                        </span>
                    </div>
                </div>

                {/* 불러온 결제내역 수 */}
                <div className="text-right" onClick={() => goHistories()}>
                    {unitFormat(codefBillingHistories.length, '건')}
                </div>

                <div className="flex items-center justify-end gap-1">
                    <CodefBankAccountActionColumn
                        codefBankAccount={codefBankAccount}
                        reload={reload}
                        moveTab={moveTab}
                    />
                </div>
            </CardTableTR>
        </LoadableBox>
    );
});
CodefBankAccountItem.displayName = 'CodefCardItem';
