import {UseFormReturn} from 'react-hook-form';
import {UpdateSubscriptionRequestDto} from '^types/subscription.type';
import React, {memo, useEffect, useMemo, useState} from 'react';
import AsyncSelect from 'react-select/async';
import {CreditCardDto} from '^types/credit-cards.type';
import {useCreditCardsOfOrganization} from '^hooks/useCreditCards';
import {FormatOptionLabelMeta} from 'react-select';
import {CreditCardOption} from '^v3/share/modals/ConnectCreditCardModal/SelectCreditCard/CreditCardOption';
import {CreditCardOptionMenu} from '^v3/share/modals/ConnectCreditCardModal/SelectCreditCard/CreditCardOptionMenu';
import {CreditCardSelectedValue} from '^v3/share/modals/ConnectCreditCardModal/SelectCreditCard/CreditCardSelectedValue';

interface SelectCreditCardProps {
    form: UseFormReturn<UpdateSubscriptionRequestDto>;
}

function toOption(card: CreditCardDto): CreditCardOption {
    return {
        label: card.name || card.issuerCompany || card.networkCompany || '',
        value: card.id,
    };
}
export const SelectCreditCard = memo((props: SelectCreditCardProps) => {
    const {form} = props;
    const [creditCardId, setCreditCardId] = useState<number>();
    const {CreditCard} = useCreditCardsOfOrganization(true);

    const creditCard = useMemo(() => {
        if (!CreditCard || !creditCardId) return;
        return CreditCard.findById(creditCardId);
    }, [creditCardId]);

    useEffect(() => {
        const exist = form.getValues('creditCardId');
        if (exist && !creditCard) {
            setCreditCardId(exist);
        }
    }, []);

    useEffect(() => {
        if (creditCardId) form.setValue('creditCardId', creditCardId);
    }, [creditCardId]);

    if (!CreditCard) return <></>;

    const search = async (inputValue: string): Promise<CreditCardOption[]> => {
        const value = (inputValue || '').toLowerCase();
        const filtered = CreditCard.all().filter((card) => {
            if (card.name?.toLowerCase().includes(value)) return true;
            if (card.issuerCompany?.toLowerCase().includes(value)) return true;
            if (card.networkCompany?.toLowerCase().includes(value)) return true;

            return false;
        });
        return filtered.map(toOption);
    };

    const CreditCardOptionLabel = (
        option: CreditCardOption,
        formatOptionLabel: FormatOptionLabelMeta<CreditCardOption>,
    ) => {
        const creditCardId = option.value;
        const creditCard = CreditCard.findById(creditCardId);

        if (formatOptionLabel.context === 'menu') {
            return (
                <CreditCardOptionMenu
                    creditCard={creditCard}
                    option={option}
                    formatOptionLabel={formatOptionLabel}
                ></CreditCardOptionMenu>
            );
        } else {
            return (
                <CreditCardSelectedValue
                    creditCard={creditCard}
                    option={option}
                    formatOptionLabel={formatOptionLabel}
                ></CreditCardSelectedValue>
            );
        }
    };

    return (
        <>
            <input type="hidden" {...form.register('creditCardId')} />

            <AsyncSelect
                value={creditCard ? toOption(creditCard) : null}
                loadOptions={search}
                defaultOptions={CreditCard.all().map(toOption)}
                className="select-underline input-underline"
                placeholder="카드를 선택해주세요"
                onChange={(value, actionMeta) => {
                    switch (actionMeta.action) {
                        case 'select-option':
                            return value ? setCreditCardId(value.value) : null;
                    }
                }}
                formatOptionLabel={CreditCardOptionLabel}
            />
        </>
    );
});
