import React, {memo, useEffect, useState} from 'react';
import {useCreditCards} from '^models/CreditCard/hook';
import Select from 'react-select';
import {CreditCardDto} from '^models/CreditCard/type';
import {CardComponents, selectStylesOptions} from '^v3/share/Select/CardSelector/selectOpions';

interface CardSelectProps {
    onChange: (cardId?: number) => void;
}

type Option = {
    value: number; // cardId
    label: string;
    name?: string | null;
};

const makeCardOption = (card: CreditCardDto): Option => {
    const value = card.id;
    const label = card.fullNumber;
    const name = card.name;

    return {value, label, name};
};

export const CardSingleSelect = memo(function CardSelect(props: CardSelectProps) {
    const {onChange} = props;
    const [isOptionLoaded, setIsOptionLoaded] = useState(false);
    const {isLoading, reload, result} = useCreditCards();

    useEffect(() => {
        if (isOptionLoaded || isLoading) return;
        setIsOptionLoaded(true);
        reload();
    }, [isLoading, isOptionLoaded]);

    return (
        <Select<Option>
            isMulti={false}
            placeholder="카드 선택하기"
            components={CardComponents()}
            styles={selectStylesOptions}
            options={result.items.map(makeCardOption)}
            onChange={(newValue, actionMeta) => onChange(newValue?.value)}
        />
    );
});
