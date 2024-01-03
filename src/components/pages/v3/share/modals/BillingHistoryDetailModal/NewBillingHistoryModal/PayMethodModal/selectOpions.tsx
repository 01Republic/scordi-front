import {components, ContainerProps, ControlProps, MenuListProps, OptionProps} from 'react-select';
import React from 'react';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';

export const selectStylesOptions = {
    dropdownIndicator: () => ({display: 'none'}),
    NoOptionsMessage: () => ({display: 'none'}),
};

export const CardComponents = () => {
    const SelectContainer = (props: ContainerProps<any>) => {
        return <components.SelectContainer {...props}>{props.children}</components.SelectContainer>;
    };

    const Control = (props: ControlProps<any>) => {
        return (
            <components.Control {...props} className="!select !select-bordered !w-full focus:outline-none">
                {props.children}
            </components.Control>
        );
    };

    const MenuList = (props: MenuListProps<any>) => {
        const {open} = useModal(newCardModalState);

        return (
            <components.MenuList {...props}>
                <div
                    onClick={open}
                    className="text-sm text-center text-gray-500 py-2 cursor-pointer transition-all hover:bg-scordi-100 hover:text-scordi"
                >
                    새로운 카드 등록하기
                </div>
                {props.children}
            </components.MenuList>
        );
    };

    const Option = (props: OptionProps<any>) => {
        const card = props.data;
        return (
            <components.Option {...props}>
                <div>
                    <p className="text-sm text-gray-500"> {card.name}</p>
                    <p>{card.label}</p>
                </div>
            </components.Option>
        );
    };

    const NoOptionsMessage = (props: any) => {
        return <components.NoOptionsMessage {...props} className="hidden"></components.NoOptionsMessage>;
    };

    return {SelectContainer, Control, MenuList, Option, NoOptionsMessage};
};
