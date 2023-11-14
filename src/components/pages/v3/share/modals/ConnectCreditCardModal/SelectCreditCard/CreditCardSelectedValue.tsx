import {CreditCardOption} from '^v3/share/modals/ConnectCreditCardModal/SelectCreditCard/CreditCardOption';
import {FormatOptionLabelMeta} from 'react-select';
import React, {memo} from 'react';
import {BsCreditCard2Back} from 'react-icons/bs';
import {CreditCardDto} from '^models/CreditCard/type';

interface CreditCardSelectedValueProps {
    option: CreditCardOption;
    formatOptionLabel: FormatOptionLabelMeta<CreditCardOption>;
    creditCard?: CreditCardDto;
}

export const CreditCardSelectedValue = memo((props: CreditCardSelectedValueProps) => {
    const {creditCard} = props;

    return (
        <div className={`!w-auto flex items-center gap-6 btn-like py-2 px-4 no-selectable`}>
            <div>
                <BsCreditCard2Back />
                {/*<Avatar src={creditCard?.image} draggable={false} className="w-6 ring ring-offset-2" loading="lazy" />*/}
            </div>
            <div className="flex-1">
                <p className="leading-none text-[18px] font-semibold mb-1">{creditCard?.name}</p>
            </div>
        </div>
    );
});
