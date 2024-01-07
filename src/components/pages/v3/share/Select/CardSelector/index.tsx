import React, {memo} from 'react';
import Select, {GroupBase, InputActionMeta, OptionsOrGroups, StylesConfig} from 'react-select';
import {CardComponents, selectStylesOptions} from '^v3/share/Select/CardSelector/selectOpions';
import {useCreditCards} from '^models/CreditCard/hook';
import {CreditCardDto} from '^models/CreditCard/type';
import {SelectOptionNotionStyledLayout, SelectOptionProps} from '^v3/share/modals/_presenters/SelectInput';
import {CreditCardProfileOption} from '^models/CreditCard/hook/components/CreditCardProfile';
import {debounce} from 'lodash';

interface CardSelectorProps {
    onChange: (cardId: number) => void;
    defaultValue?: CreditCardDto;
}

export const CardSelector = memo((props: CardSelectorProps) => {
    const {result, search} = useCreditCards();
    const {onChange, defaultValue} = props;

    const loadCards = debounce((keyword?: string) => {
        return search({
            keyword,
            itemsPerPage: 30,
            order: {id: 'DESC'},
        });
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

    return (
        <Select
            options={result.items.map(toOptionData)}
            defaultValue={defaultValue ? toOptionData(defaultValue) : undefined}
            placeholder="카드 선택하기"
            styles={customStyles}
            className="input input-bordered px-0"
            onInputChange={(newValue, {action}: InputActionMeta) => {
                if (action === 'input-change') loadCards(newValue);
            }}
            onMenuOpen={() => loadCards()}
            onChange={(option) => {
                option && onChange(option.value);
            }}
            noOptionsMessage={({inputValue}) => {
                return <p>선택할 수 있는 카드가 없어요 :(</p>;
            }}
            components={{Option: CardOption, MenuList: CardComponents().MenuList}}
        />
    );
});

type CardOptionData = {
    value: number;
    label: string;
    data: CreditCardDto;
};

const toOptionData = (card: CreditCardDto): CardOptionData => {
    return {value: card.id, label: card.name || '', data: card};
};

const CardOption = (props: SelectOptionProps<CardOptionData>) => {
    const {data, isFocused, isSelected} = props;

    return (
        <SelectOptionNotionStyledLayout {...props}>
            <CreditCardProfileOption item={data.data} />
        </SelectOptionNotionStyledLayout>
    );
};
