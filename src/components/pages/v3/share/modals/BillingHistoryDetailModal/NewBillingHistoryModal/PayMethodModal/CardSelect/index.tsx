import React, {memo, useState} from 'react';
import {FormControl} from '^components/util/form-control';
import Select from 'react-select';
import {
    CardComponents,
    selectStylesOptions,
} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/PayMethodModal/selectOpions';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreateCreditCardDto, CreditCardDto} from '^models/CreditCard/type';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {createBillingHistoryAtom} from '^v3/share/modals/BillingHistoryDetailModal/NewBillingHistoryModal/atoms';

type Option = {
    value: number;
    label: string;
    name: string;
};

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
            <Select
                placeholder="카드 선택하기"
                components={CardComponents()}
                styles={selectStylesOptions}
                options={result.items.map(toOption)}
                onChange={(e) => onChange(e.value)}
            />
        </FormControl>
    );
});
