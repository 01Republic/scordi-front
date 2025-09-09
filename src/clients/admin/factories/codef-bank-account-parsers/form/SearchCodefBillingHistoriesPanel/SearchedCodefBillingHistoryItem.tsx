import React, {memo, useState} from 'react';
import {Check, EyeOff} from 'lucide-react';
import {checkCodefBillingHistoryNeedToFixTimeZone, CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {BANK_ACCOUNT_STOP_WORDS} from '^models/CodefBillingHistory/types/bank-account-stop-words';
import {CodefBankAccountTagUI} from '^admin/factories/codef-bank-account-parsers/form/share/CodefBankAccountTagUI';
import {currencyFormat, roundNumber} from '^utils/number';
import {lpp} from '^utils/dateTime';
import {codefBillingHistoriesAdminApi} from '^models/CodefBillingHistory/api';
import {errorToast} from '^api/api';
import Tippy from '@tippyjs/react';

interface SearchedCodefBillingHistoryItemProps {
    data: CodefBillingHistoryDto;
    onSelect: (codefBankAccount?: CodefBankAccountDto) => any;
    preventHidden?: boolean;
    reload?: () => any;
}

/** 계좌 / 수시입출금 내역 항목 */
export const SearchedCodefBillingHistoryItem = memo((props: SearchedCodefBillingHistoryItemProps) => {
    const {data: codefBillingHistory, onSelect, preventHidden = false, reload} = props;
    const [isHidden, setIsHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const codefBankBillingHistory = codefBillingHistory.asBankAccount;
    const content = codefBankBillingHistory.content;
    const finalPrice = codefBankBillingHistory.amount;
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
        <div
            className={
                isHidden ? 'hidden' : `flex items-center gap-1 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`
            }
            onClick={() => console.log(codefBillingHistory)}
        >
            <div className="flex-1">
                <div className="grid grid-cols-12 text-12 h-[22px]">
                    <div
                        className="col-span-3 flex items-center gap-1"
                        onContextMenu={(e) => {
                            e.preventDefault();
                            setIsLoading(true);
                            codefBillingHistoriesAdminApi
                                .fixTimeZone({where: {id: codefBillingHistory.id}})
                                .then(() => reload && reload())
                                .catch(errorToast)
                                .finally(() => setIsLoading(false));
                        }}
                    >
                        <Tippy
                            content={`승인일시: ${codefBillingHistory.resUsedDate} ${codefBillingHistory.resUsedTime}`}
                        >
                            <div
                                className={`flex items-center w-full gap-1 ${
                                    checkCodefBillingHistoryNeedToFixTimeZone(codefBillingHistory) ? 'text-red-500' : ''
                                }`}
                            >
                                <div>{lpp(codefBillingHistory.usedAt, 'P')}</div>
                                <small>{lpp(codefBillingHistory.usedAt, 'p')}</small>
                            </div>
                        </Tippy>
                    </div>

                    <div className="col-span-2 flex items-center">
                        <div>
                            <CodefBankAccountTagUI
                                codefBankAccount={codefBillingHistory.codefBankAccount}
                                onClick={onSelect}
                                render={(item) => item.title}
                            />
                        </div>
                    </div>

                    <div className="col-span-5 flex items-center gap-3">
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
