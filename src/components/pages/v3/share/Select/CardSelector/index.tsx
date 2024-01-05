import React, {memo} from 'react';
import Select, {GroupBase, OptionsOrGroups} from 'react-select';
import {CardComponents, selectStylesOptions} from '^v3/share/Select/CardSelector/selectOpions';

interface CardSelectorProps {
    options: OptionsOrGroups<any, GroupBase<any>> | undefined;
    onChange: (e: number) => void;
}
export const CardSelector = memo((props: CardSelectorProps) => {
    const {options, onChange} = props;

    return (
        <Select
            placeholder="카드 선택하기"
            components={CardComponents()}
            styles={selectStylesOptions}
            options={options}
            onChange={(e) => onChange(e.value)}
        />
    );
});
