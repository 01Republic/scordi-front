import React, {memo, useState} from 'react';
import {Check} from 'lucide-react';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {CardTableTR} from '^admin/share';
import {checkCodefBillingHistoryNeedToFixTimeZone, CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {currencyFormat, roundNumber} from '^utils/number';
import {lpp} from '^utils/dateTime';
import {useIdParam} from '^atoms/common';
import Tippy from '@tippyjs/react';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {errorToast} from '^api/api';

interface CodefBillingHistoryItemProps {
    codefBillingHistory: CodefBillingHistoryDto;
    onAssetSelect: (codefAsset?: CodefBankAccountDto) => any;
    reload: () => any;
}

export const CodefBillingHistoryItem = memo((props: CodefBillingHistoryItemProps) => {
    const {codefBillingHistory, onAssetSelect, reload} = props;
    const orgId = useIdParam('id');
    const [isLoading, setIsLoading] = useState(false);

    const codefBankBillingHistory = codefBillingHistory.asBankAccount;
    const content = codefBankBillingHistory.content;
    const finalPrice = codefBankBillingHistory.amount;
    const currency = codefBillingHistory.resAccountCurrency || '';
    const status = codefBillingHistory.memo;

    return (
        <CardTableTR
            gridClass="grid-cols-12"
            className={`!text-12 cursor-pointer group`}
            onClick={() => console.log(codefBankBillingHistory)}
        >
            {/* ID */}
            <div>
                <Tippy content={`등록일: ${lpp(codefBillingHistory.createdAt)}`}>
                    <div>
                        <span className="badge badge-xs">#{codefBillingHistory.id}</span>
                    </div>
                </Tippy>
            </div>

            {/* 결제일시 */}
            <div
                className="col-span-2"
                onContextMenu={(e) => {
                    e.preventDefault();
                    codefBillingHistoriesAdminApi
                        .fixTimeZone({where: {id: codefBillingHistory.id}})
                        .then(() => reload())
                        .catch(errorToast)
                        .finally(() => setIsLoading(false));
                }}
            >
                <Tippy content={`승인일시: ${codefBillingHistory.resUsedDate} ${codefBillingHistory.resUsedTime}`}>
                    <div>
                        <div
                            className={`flex items-center gap-1 ${
                                checkCodefBillingHistoryNeedToFixTimeZone(codefBillingHistory) ? 'text-red-500' : ''
                            }`}
                        >
                            <span>{lpp(codefBillingHistory.usedAt, 'P')}</span>

                            <span className="tooltip tooltip-primary text-10 font-light">
                                {lpp(codefBillingHistory.usedAt, 'p')}
                            </span>
                        </div>
                    </div>
                </Tippy>
            </div>

            {/* 계좌 */}
            <div className="flex items-center">
                <div>
                    <CodefBankAccountTagUI
                        codefBankAccount={codefBillingHistory.codefBankAccount}
                        render={(item) => item.title}
                        onClick={onAssetSelect}
                    />
                </div>
            </div>

            {/* 제목 */}
            <div className="col-span-3" onClick={() => console.log(codefBillingHistory)}>
                <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">
                    <span>{content}</span>
                </div>
            </div>

            {/* 금액 */}
            <div
                className={`col-span-2 flex items-center justify-end ${finalPrice < 0 ? 'text-red-500' : ''} ${
                    status ? 'opacity-50 line-through' : ''
                }`}
                onClick={() => console.log(codefBankBillingHistory)}
            >
                <span>{currencyFormat(roundNumber(finalPrice, 2), '')}</span>
                <small>({currency || '원'})</small>
                <div className="text-12 pl-0.5">
                    {codefBillingHistory.resAccountIn > 0 ? (
                        <span className="text-gray-400">입금</span>
                    ) : (
                        <mark>출금</mark>
                    )}
                </div>
            </div>

            {/* 결제상태 */}
            <div>
                <span className="text-red-500 font-semibold whitespace-nowrap">{status}</span>
            </div>

            {/* 해외결제여부 */}
            {/*<div>{codefBillingHistory}</div>*/}

            {/* 스코디 연동 */}
            <div>{codefBillingHistory.billingHistoryId && <Check className="text-green-600" fontSize={18} />}</div>

            <div></div>
        </CardTableTR>
    );
});
CodefBillingHistoryItem.displayName = 'CodefBillingHistoryItem';
