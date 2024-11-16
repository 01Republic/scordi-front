import React from 'react';
import Tippy from '@tippyjs/react';
import {FaRegCreditCard} from 'react-icons/fa6';
import {ScordiPaymentMethodDto} from '^models/_scordi/ScordiPaymentMethod/type';
import {Avatar} from '^components/Avatar';

interface PaymentMethodCardProps {
    paymentMethod: ScordiPaymentMethodDto;
}

export const PaymentMethodCard = (props: PaymentMethodCardProps) => {
    const {paymentMethod} = props;
    const company = paymentMethod.asCardCompany();
    const card = paymentMethod.response.card;

    return (
        <div className="flex items-center gap-2 text-13">
            <Avatar className="w-4">
                {company ? (
                    <img src={company.logo} alt="" />
                ) : (
                    <FaRegCreditCard size={20} className="h-full w-full p-[2px]" />
                )}
            </Avatar>

            <Tippy content={paymentMethod.fullCardNumber}>
                <div className="flex items-center gap-1 font-semibold cursor-pointer">
                    <span>{company?.displayName || paymentMethod.cardCompany}</span>
                    <span>({paymentMethod.cardNumber.slice(-4)})</span>
                </div>
            </Tippy>

            <div className="text-gray-600">
                {card.ownerType} / {card.cardType}
            </div>
        </div>
    );
};
