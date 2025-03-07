import React, {memo} from 'react';
import {CreditCardDto} from '^models/CreditCard/type';
import {CreditCardProfileOption2} from '^models/CreditCard/components/CreditCardProfile';
import {Check} from 'lucide-react';

interface CreditCardSelectItemProps {
    creditCard: CreditCardDto;
    onClick?: (selected: CreditCardDto) => any;
    isSelected?: boolean;
}

export const CreditCardSelectItem = memo((props: CreditCardSelectItemProps) => {
    const {creditCard, onClick, isSelected = false} = props;

    return (
        <div
            onClick={() => onClick && onClick(creditCard)}
            className="flex items-center justify-between px-4 py-3 -mx-4 no-selectable hover:bg-scordi-light-50 rounded-btn cursor-pointer group"
        >
            <CreditCardProfileOption2 item={creditCard} />

            <div className="flex items-center">
                <button className="relative">
                    <Check
                        fontSize={16}
                        strokeWidth={0.3}
                        className={isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'}
                    />
                </button>
            </div>
        </div>
    );
});
CreditCardSelectItem.displayName = 'SubscriptionSelectItem';
