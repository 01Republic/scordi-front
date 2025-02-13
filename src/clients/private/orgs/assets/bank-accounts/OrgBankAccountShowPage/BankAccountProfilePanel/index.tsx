import React, {memo} from 'react';
import {FaRegCreditCard} from 'react-icons/fa6';
import {UsingStatusTag} from '^models/CreditCard/components';
import {CodefBankCode} from '^models/CodefAccount/type/enums';
import {getBankLogo} from '^models/CodefAccount/bank-account-static-data';
import {Avatar} from '^components/Avatar';
import {useCurrentBankAccount} from '../atom';

export const BankAccountProfilePanel = memo(function CreditCardProfilePanel() {
    const {currentBankAccount} = useCurrentBankAccount();

    if (!currentBankAccount) return <></>;

    return (
        <div>
            <div className="flex items-start gap-6">
                <Avatar className="w-14 h-14">
                    {currentBankAccount.bank ? (
                        <img
                            src={getBankLogo(CodefBankCode[currentBankAccount.bank as keyof typeof CodefBankCode])}
                            alt={currentBankAccount.bank || ''}
                        />
                    ) : (
                        <FaRegCreditCard size={20} className="h-full w-full p-[6px]" />
                    )}
                </Avatar>

                <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                    <p
                        className={`flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1`}
                    >
                        <span className="truncate">{currentBankAccount.bank}</span>
                    </p>
                    {currentBankAccount.displayNumber && (
                        <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                            끝자리: <span>{currentBankAccount.displayNumber.slice(-3) || '알수없음'}</span>
                        </p>
                    )}

                    <div className="flex items-center gap-3 pt-3">
                        <div>
                            <UsingStatusTag value={currentBankAccount.usingStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
