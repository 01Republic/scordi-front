import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {useCurrentCreditCard} from '../atom';
import {UsingStatusTag} from '^models/CreditCard/components';
import {CreditCard} from 'lucide-react';

export const CreditCardProfilePanel = memo(function CreditCardProfilePanel() {
    const {currentCreditCard} = useCurrentCreditCard();

    if (!currentCreditCard) return <></>;

    const endNumber = currentCreditCard.noMaskingEndNumber;
    const company = currentCreditCard.company;

    return (
        <div>
            <div className="flex items-start gap-6">
                <Avatar className="w-14 h-14">
                    {company ? (
                        <img src={company.logo} alt={company.displayName} />
                    ) : (
                        <CreditCard size={20} className="h-full w-full p-[6px]" />
                    )}
                </Avatar>

                <div className="flex flex-col gap-0.5 overflow-hidden text-left">
                    <p
                        className={`flex gap-2 text-18 font-semibold items-center group-hover:text-scordi leading-none py-1`}
                    >
                        <span className="truncate">{currentCreditCard.name}</span>
                    </p>
                    {endNumber && (
                        <p className="block text-14 font-normal text-gray-400 group-hover:text-scordi-300 leading-none">
                            끝자리: <span>{endNumber || '알수없음'}</span>
                        </p>
                    )}

                    <div className="flex items-center gap-3 pt-3">
                        <div>
                            <UsingStatusTag value={currentCreditCard.usingStatus} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
