import React, {memo} from 'react';
import {RiBankFill} from '@react-icons/all-files/ri/RiBankFill';
import {UsingStatusTag} from '^models/CreditCard/components';
import {Avatar} from '^components/Avatar';
import {useCurrentBankAccount} from '../atom';

export const BankAccountProfilePanel = memo(function CreditCardProfilePanel() {
    const {currentBankAccount} = useCurrentBankAccount();

    if (!currentBankAccount) return <></>;

    const endNumber = currentBankAccount.endNumber();
    const company = currentBankAccount.company;
    const bankName = currentBankAccount.bankName;

    return (
        <div>
            <div className="flex items-start gap-6">
                <Avatar className="w-14 h-14">
                    {company ? (
                        <img src={company.logo} alt={company.displayName || ''} />
                    ) : (
                        <RiBankFill size={20} className="h-full w-full p-[6px]" />
                    )}
                </Avatar>

                <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                    <p
                        className={`flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1`}
                    >
                        <span className="truncate">
                            {currentBankAccount.title} ({endNumber})
                        </span>
                    </p>
                    {currentBankAccount.displayNumber && (
                        <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                            {currentBankAccount.name && company && <span>{bankName} </span>}
                            <span>{currentBankAccount.displayNumber || '(알수없음)'}</span>
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
