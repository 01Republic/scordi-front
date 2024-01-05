import React, {memo} from 'react';
import {FormControl} from '^components/util/form-control';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {useSetRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';
import {CardSelector} from '^v3/share/Select/CardSelector';

export const CardSelect = memo(() => {
    const {result} = useCreditCards();
    const setCreateBillingHistory = useSetRecoilState(createBillingHistoryAtom);
    const toOption = (card: CreditCardDto) => {
        const value = card.id;
        const label = card.fullNumber;
        const name = card.name;

        return {value, label, name};
    };

    const onChange = (cardId: number) => {
        if (!cardId) return;
        setCreateBillingHistory((prev) => ({...prev, creditCardId: cardId}));
    };

    return (
        <FormControl
            topLeftLabel={
                <p className="flex items-center gap-1">
                    어떤 카드로 결제하셨나요? <span className="text-red-500 self-center">*</span>
                </p>
            }
        >
            <CardSelector options={result.items.map(toOption)} onChange={(e) => onChange(e)} />
        </FormControl>
    );
});
