import React, {memo} from 'react';
import {Avatar} from '^components/Avatar';
import {FaCheck} from 'react-icons/fa6';
import {CreditCardDto} from '^models/CreditCard/type';

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
            className="flex items-center gap-4 px-4 py-3 -mx-4 no-selectable hover:bg-scordi-light-50 rounded-btn cursor-pointer group"
        >
            <Avatar
                src={creditCard.company?.logo}
                className="w-7 h-7 outline outline-offset-1 outline-slate-100 rounded-full"
            />

            <div className="flex-1">
                <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar">
                    {creditCard.name}
                </p>
            </div>

            <div className="flex items-center">
                <button className="relative">
                    <FaCheck
                        fontSize={16}
                        strokeWidth={0.3}
                        className={isSelected ? `text-indigo-500` : 'text-transparent group-hover:text-indigo-200'}
                    />
                </button>
            </div>
        </div>
    );
});
