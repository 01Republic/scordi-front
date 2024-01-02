import {components, ContainerProps, ControlProps, MenuListProps, OptionProps} from 'react-select';
import React from 'react';
import {useModal} from '^v3/share/modals';
import {inputCardNumberModal} from '^v3/share/modals/NewCardModal/CardNumberModal/atom';

export const selectStylesOptions = {
    dropdownIndicator: () => ({display: 'none'}),
    NoOptionsMessage: () => ({display: 'none'}),
};

// 결제 수단 select 보류로 지금은 사용하지 않음
export const PayMethodComponents = () => {
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
        return <components.MenuList {...props}>{props.children}</components.MenuList>;
    };

    const Option = (props: OptionProps<any>) => {
        const isCard = props.label === '카드';
        return (
            <components.Option
                {...props}
                className={`${isCard ? '' : '!text-gray-500 !cursor-default !bg-gray-100 !border-b'} `}
            ></components.Option>
        );
    };

    return {SelectContainer, Control, MenuList, Option};
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
        const {open} = useModal(inputCardNumberModal);
        const onClick = () => {
            open();
        };

        return (
            <components.MenuList {...props}>
                <div
                    onClick={onClick}
                    className="text-sm text-center text-gray-500 py-2 cursor-pointer transition-all hover:bg-scordi-100 hover:text-scordi"
                >
                    새로운 카드 등록하기
                </div>
                {props.children}
            </components.MenuList>
        );
    };

    const Option = (props: OptionProps<any>) => {
        return <components.Option {...props}></components.Option>;
    };

    const NoOptionsMessage = (props: any) => {
        return <components.NoOptionsMessage {...props} className="hidden"></components.NoOptionsMessage>;
    };

    return {SelectContainer, Control, MenuList, Option, NoOptionsMessage};
};
