import React, {memo} from 'react';
import Select, {GroupBase, OptionsOrGroups} from 'react-select';
import {CardComponents, selectStylesOptions} from '^v3/share/Select/CardSelector/selectOpions';

type CardOption = {
    value: number;
    label: string;
    name: string | null | undefined;
};

interface CardSelectorProps {
    options: OptionsOrGroups<any, GroupBase<any>> | undefined;
    onChange: (e: number) => void;
    defaultValue?: CardOption | undefined;
}
export const CardSelector = memo((props: CardSelectorProps) => {
    const {options, onChange, defaultValue} = props;

    return (
        <Select
            placeholder="카드 선택하기"
            components={CardComponents()}
            styles={selectStylesOptions}
            options={options}
            onChange={(e) => onChange(e.value)}
            defaultValue={defaultValue}
        />
    );
});
