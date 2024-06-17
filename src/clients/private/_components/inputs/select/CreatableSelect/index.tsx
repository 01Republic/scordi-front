import React, {ComponentType, memo, ReactNode, useState} from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import {customStyle} from './customStyle';
import {SelectMenuList} from '^clients/private/orgs/team/OrgTeamMemberNewPage/SelectMenuList';
import {ActionMeta, GroupBase, MenuListProps, OptionProps, SingleValue} from 'react-select';
import {Option} from '^components/util/react-select';
import {FormatOptionLabelMeta} from 'react-select/dist/declarations/src/Select';

interface CreatableSelectProps<T, V, O extends Option = {label: string; value: V}> {
    className?: string;
    placeholder?: ReactNode;
    toOption: (obj: T) => O;
    defaultItems?: T[];
    items?: T[];
    searchItems: (inputValue?: string) => Promise<T[]>;
    onSelect: (selectedOption?: SingleValue<O>, actionMeta?: ActionMeta<O>) => any;
    Option: ComponentType<OptionProps<O, false, GroupBase<O>>>;
    CreateOption: ComponentType<OptionProps<Option, false, GroupBase<Option>>>;
    MenuList?: ComponentType<MenuListProps<Option, false, GroupBase<Option>>>;
    formatOptionLabel?: (item: T, formatOptionLabelMeta: FormatOptionLabelMeta<O>) => ReactNode;
}

export const CreatableSelect = <T, V, O extends Option>(props: CreatableSelectProps<T, V, O>) => {
    const {
        toOption,
        searchItems,
        defaultItems = [],
        items = [],
        className = '',
        placeholder = '선택해주세요',
        MenuList = SelectMenuList,
        Option,
        CreateOption,
        onSelect,
        formatOptionLabel,
    } = props;

    const search = async (inputValue?: string) => {
        return searchItems(inputValue).then((items) => items.map(toOption));
    };

    return (
        <div>
            <AsyncCreatableSelect
                isClearable
                className={`select select-underline input-underline !bg-slate-100 w-full ${className}`}
                placeholder={placeholder}
                styles={customStyle}
                defaultValue={defaultItems.map(toOption)}
                defaultOptions={items.map(toOption)}
                loadOptions={search}
                onMenuOpen={() => search()}
                loadingMessage={({inputValue}) => <span>'{inputValue}'를 찾는 중</span>}
                noOptionsMessage={({inputValue}) => <span>'{inputValue}'는 없네요</span>}
                components={{
                    Option: (props) =>
                        props.data['__isNew__'] ? (
                            <CreateOption {...(props as unknown as OptionProps<Option, false, GroupBase<Option>>)} />
                        ) : (
                            <Option {...(props as unknown as OptionProps<O, false, GroupBase<O>>)} />
                        ),
                    MenuList,
                }}
                onChange={(option, actionMeta) =>
                    option
                        ? onSelect(option as unknown as SingleValue<O>, actionMeta as ActionMeta<O>)
                        : onSelect(undefined, actionMeta as ActionMeta<O>)
                }
                formatOptionLabel={(data, formatOptionLabelMeta) => {
                    return formatOptionLabel
                        ? formatOptionLabel(data.value, formatOptionLabelMeta as FormatOptionLabelMeta<O>)
                        : data.label;
                }}
            />
            <span />
        </div>
    );
};
CreatableSelect.displayName = 'CreatableSelect';

// function onSelect(selectedOption, actionMeta) {
//     if (selectedOption) {
//         const teams = [...selectedItems, selectedOption.value];
//         setSelectedItems(teams);
//         onChange && onChange(teams);
//     } else {
//         const options = actionMeta?.removedValues || [];
//         const exceptIds = options.map((o) => o.value.id);
//         const teams = [...selectedItems].filter((team) => !exceptIds.includes(team.id));
//         setSelectedItems(teams);
//         onChange && onChange(teams);
//     }
// }
