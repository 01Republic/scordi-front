import React, {memo, useState} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {hh_mm, yyyy_mm_dd, yyyy_mm_dd_hh_mm} from '^utils/dateTime';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {Check, EyeOff} from 'lucide-react';
import {currencyFormat, roundNumber} from '^utils/number';
import {BANK_ACCOUNT_STOP_WORDS} from '^models/CodefBillingHistory/types/bank-account-stop-words';

interface SearchedCodefBillingHistoryItemProps {
    data: CodefBillingHistoryDto;
    onSelect: (codefBankAccount?: CodefBankAccountDto) => any;
    preventHidden?: boolean;
}

/** 계좌 / 수시입출금 내역 항목 */
export const SearchedCodefBillingHistoryItem = memo((props: SearchedCodefBillingHistoryItemProps) => {
    const {data: codefBillingHistory, onSelect, preventHidden = false} = props;
    const [isHidden, setIsHidden] = useState(false);

    const yyyymmdd = yyyy_mm_dd(codefBillingHistory.usedAt);
    const hhmmss = hh_mm(codefBillingHistory.usedAt);
    const content = (() => {
        const {
            resAccountDesc1: d1,
            resAccountDesc2: d2,
            resAccountDesc3: d3,
            resAccountDesc4: d4,
        } = codefBillingHistory;
        return `${d3} ${d1 && d1 !== d3 ? `/ ${d1}` : ''}`.trim() || `${d2} ${d4 && d4 !== d2 ? `/ ${d4}` : ''}`.trim();
    })();

    const finalPrice = (() => {
        if (codefBillingHistory.resAccountOut > 0) return codefBillingHistory.resAccountOut;
        if (codefBillingHistory.resAccountIn > 0) return -1 * codefBillingHistory.resAccountIn;
        return 0;
    })();
    const currency = codefBillingHistory.resAccountCurrency || '';
    const status = codefBillingHistory.memo;

    const hide = (() => {
        const stopWords = BANK_ACCOUNT_STOP_WORDS;

        if (stopWords.some((word) => codefBillingHistory.resAccountDesc1.includes(word))) return true;
        if (stopWords.some((word) => codefBillingHistory.resAccountDesc2.includes(word))) return true;
        if (stopWords.some((word) => codefBillingHistory.resAccountDesc3.includes(word))) return true;
        if (stopWords.some((word) => codefBillingHistory.resAccountDesc4.includes(word))) return true;

        return false;
    })();

    if (hide) return <></>;

    return (
        <div className={isHidden ? 'hidden' : 'flex items-center gap-1 5'}>
            <div className="flex-1">
                <div className="grid grid-cols-12 text-12 h-[22px]">
                    <div className="col-span-2 flex items-center gap-1">
                        <span
                            className="tooltip tooltip-primary"
                            data-tip={`등록일: ${yyyy_mm_dd_hh_mm(codefBillingHistory.createdAt)}`}
                        >
                            {yyyymmdd}
                        </span>
                    </div>
                    <div className="flex items-center">{hhmmss}</div>
                    <div className="col-span-2 flex items-center">
                        <div>
                            <CodefBankAccountTagUI
                                codefBankAccount={codefBillingHistory.codefBankAccount}
                                onClick={onSelect}
                                render={(item) => item.title}
                            />
                        </div>
                    </div>
                    <div
                        className="col-span-5 flex items-center gap-3"
                        onClick={() => console.log(codefBillingHistory)}
                    >
                        <div className="w-full whitespace-nowrap overflow-scroll no-scrollbar">
                            <span>{content.trim()}</span>
                        </div>
                        <div className="">
                            {!preventHidden && (
                                <EyeOff
                                    onClick={() => setIsHidden(true)}
                                    className="text-gray-400 hover:text-red-500 transition-all cursor-pointer"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`col-span-2 flex items-center justify-end whitespace-nowrap ${
                            finalPrice < 0 ? 'text-red-500' : ''
                        } ${status && 'opacity-50 line-through'}`}
                    >
                        {codefBillingHistory.billingHistoryId && (
                            <div data-tip="파서로 연동된 결제내역" className="tooltip tooltip-primary">
                                <Check className="text-green-400 mr-1 cursor-pointer" />
                            </div>
                        )}
                        <span>{currencyFormat(roundNumber(finalPrice, 2), '')}</span>{' '}
                        <small>({currency || '원'})</small>{' '}
                        {status ? (
                            <span className="text-red-500 font-semibold whitespace-nowrap">{status}</span>
                        ) : (
                            <span></span>
                        )}
                    </div>
                </div>
            </div>

            <div>
                <div className="text-12">
                    {codefBillingHistory.resAccountIn > 0 ? (
                        <span className="text-gray-400">입금</span>
                    ) : (
                        <mark>출금</mark>
                    )}
                </div>
            </div>
        </div>
    );
});
SearchedCodefBillingHistoryItem.displayName = 'SearchedCodefBillingHistoryItem';
