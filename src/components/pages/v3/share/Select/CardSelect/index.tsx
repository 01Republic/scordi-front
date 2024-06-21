import React, {memo, useEffect, useState} from 'react';
import Select, {InputActionMeta, StylesConfig} from 'react-select';
import {CardComponents} from '^v3/share/Select/CardSelect/selectOpions';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {CreditCardProfileOption2} from '^models/CreditCard/hook/components/CreditCardProfile';
import {debounce} from 'lodash';
import {useRecoilValue} from 'recoil';
import {orgIdParamState} from '^atoms/common';
import {useToast} from '^hooks/useToast';

interface CardSelectorProps {
    onChange: (cardId: number | null) => void;
    defaultValue?: CreditCardDto;
}

export const CardSelector = memo((props: CardSelectorProps) => {
    const {search, result, reload} = useCreditCards();
    const [isLoading, setIsLoading] = useState(false);
    const {onChange, defaultValue} = props;

    useEffect(() => {
        loadCards();
    }, []);

    const resetCards = () => {
        setIsLoading(true);
        reload().finally(() => setIsLoading(false));
    };

    const loadCards = debounce((keyword?: string) => {
        setIsLoading(true);
        return search({
            keyword,
            itemsPerPage: 30,
            order: {id: 'DESC'},
        }).finally(() => setIsLoading(false));
    }, 500);

    const customStyles: StylesConfig<CardOptionData, false> = {
        control: (base) => ({
            ...base,
            height: '100%',
            border: 'none',
            borderRadius: 'inherit',
            '&:hover': {},
        }),
        option: (base) => ({
            ...base,
            padding: 0,
            background: 'inherit !important',
            color: 'initial',
            '&:hover': {},
        }),
    };

    const {MenuList, MenuListLoading} = CardComponents();

    return (
        <Select
            isClearable={true}
            options={result.items.map(toOptionData)}
            defaultValue={defaultValue ? toOptionData(defaultValue) : undefined}
            placeholder="카드 선택하기"
            styles={customStyles}
            className="input input-bordered px-0"
            onInputChange={(newValue, {action}: InputActionMeta) => {
                if (action === 'input-change') loadCards(newValue);
            }}
            onChange={(option, actionMeta) => {
                switch (actionMeta.action) {
                    case 'select-option':
                        option && onChange(option.value);
                        return;
                    case 'clear':
                        onChange(null);
                        return;
                    default:
                        option && onChange(option.value);
                }
            }}
            noOptionsMessage={({inputValue}) => {
                return <p>선택할 수 있는 카드가 없어요 :(</p>;
            }}
            onMenuOpen={() => resetCards()}
            components={{Option: CardOption, MenuList: isLoading ? MenuListLoading : MenuList}}
        />
    );
});

type CardOptionData = {
    value: number | null;
    label: string;
    data: CreditCardDto;
};

const toOptionData = (card: CreditCardDto): CardOptionData => {
    return {value: card.id, label: card.name || '', data: card};
};

const CardOption = (props: SelectOptionProps<CardOptionData>) => {
    const orgId = useRecoilValue(orgIdParamState);
    const {reload, deleteCreditCard} = useCreditCards();
    const {toast} = useToast();

    const {data, isFocused, isSelected} = props;

    const onDelete = () => {
        deleteCreditCard(data.data, orgId).then((res) => {
            if (res) reload();
        });
    };

    return (
        <SelectOptionNotionStyledLayout {...props} onDelete={onDelete}>
            <CreditCardProfileOption2 item={data.data} />
        </SelectOptionNotionStyledLayout>
    );
};
