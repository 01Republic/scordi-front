import React, {memo} from 'react';
import {Check} from 'lucide-react';
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {CardTableTR} from '^admin/share';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {currencyFormat, roundNumber} from '^utils/number';

interface CodefBillingHistoryItemProps {
    codefBillingHistory: CodefBillingHistoryDto;
    onAssetSelect: (codefAsset?: CodefBankAccountDto) => any;
}

export const CodefBillingHistoryItem = memo((props: CodefBillingHistoryItemProps) => {
    const {codefBillingHistory, onAssetSelect} = props;

    const codefBankBillingHistory = codefBillingHistory.asBankAccount;
    const usedDate = codefBankBillingHistory.usedDate;
    const content = codefBankBillingHistory.content;
    const finalPrice = codefBankBillingHistory.amount;
    const currency = codefBillingHistory.resAccountCurrency || '';
    const status = codefBillingHistory.memo;

    return (
        <CardTableTR gridClass="grid-cols-12" className={`!text-12 cursor-pointer group`}>
            {/* ID */}
            <div>
                <span className="badge badge-xs">#{codefBillingHistory.id}</span>
            </div>

            {/* 결제일시 */}
            <div className="col-span-2 flex items-center gap-1">
                <span
                    className="tooltip tooltip-primary"
                    data-tip={`등록일: ${format(codefBillingHistory.createdAt, 'yyyy-MM-dd HH:mm', {locale: ko})}`}
                >
                    {format(usedDate, 'yyyy-MM-dd', {locale: ko})}
                </span>

                <span
                    className="tooltip tooltip-primary"
                    data-tip={`승인일시: ${codefBillingHistory.resUsedDate} ${codefBillingHistory.resUsedTime}`}
                >
                    {format(usedDate, 'HH:mm:ss', {locale: ko})}
                </span>
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
            <div>{codefBillingHistory.billingHistoryId && <Check className="text-success" size={14} />}</div>

            <div></div>
        </CardTableTR>
    );
});
CodefBillingHistoryItem.displayName = 'CodefBillingHistoryItem';
