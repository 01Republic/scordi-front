import {components, ContainerProps, ControlProps, MenuListProps, OptionProps, SingleValueProps} from 'react-select';
import React from 'react';
import {useModal} from '^v3/share/modals';
import {newCardModalState} from '^v3/share/modals/NewCardModal/NewCardModalV2/atom';
import {CreditCardDto} from '^models/CreditCard/type';

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
                <div onClick={open} className="px-[8px]">
                    <div className="py-2 mb-1 px-2 flex items-center rounded-md text-sm text-gray-500 cursor-pointer transition-all hover:bg-gray-100 active:bg-sky-100">
                        새로운 카드 등록하기
                    </div>
                </div>
                <hr className="mb-2" />
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

    const SingleValue = (props: SingleValueProps<any>) => {
        const card = props.data;

        return (
            <components.SingleValue {...props}>
                <div>
                    <p className="text-sm text-gray-500"> {card.name}</p>
                    <p>{card.label}</p>
                </div>
            </components.SingleValue>
        );
    };
    const NoOptionsMessage = (props: any) => {
        return <components.NoOptionsMessage {...props} className="hidden"></components.NoOptionsMessage>;
    };

    return {SelectContainer, Control, MenuList, Option, SingleValue, NoOptionsMessage};
};
