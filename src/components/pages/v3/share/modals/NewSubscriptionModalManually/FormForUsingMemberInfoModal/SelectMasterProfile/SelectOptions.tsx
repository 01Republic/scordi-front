import React from 'react';
import {components, ContainerProps, ControlProps, MenuListProps, OptionProps, SingleValueProps} from 'react-select';
import {Avatar} from '^components/Avatar';
import {getColor} from '^components/util/palette';

export const selectStylesOptions = {
    dropdownIndicator: () => ({display: 'none'}),
    NoOptionsMessage: () => ({display: 'none'}),
};

export const Components = () => {
    const SelectContainer = (props: ContainerProps<any>) => {
        return <components.SelectContainer {...props}>{props.children}</components.SelectContainer>;
    };

    const Control = (props: ControlProps<any>) => {
        return (
            <components.Control {...props} className="!select !select-bordered !w-full !focus:outline-none">
                {props.children}
            </components.Control>
        );
    };

    const MenuList = (props: MenuListProps<any>) => {
        return <components.MenuList {...props}>{props.children}</components.MenuList>;
    };

    const Option = (props: OptionProps<any>) => {
        const member = props.data;

        return (
            <components.Option {...props}>
                <MemberProfile data={member} />
            </components.Option>
        );
    };

    const SingleValue = (props: SingleValueProps<any>) => {
        const member = props.data;

        return (
            <components.SingleValue {...props}>
                <MemberProfile data={member} />
            </components.SingleValue>
        );
    };

    return {SelectContainer, Control, MenuList, Option, SingleValue};
};

const MemberProfile = ({data}: {data: any}) => {
    const {label, email, profileImgUrl, value} = data;

    const avatarColor = getColor(email.length + value);

    return (
        <div className="flex items-center gap-4 px-4 -mx-4">
            <Avatar src={profileImgUrl} className={`${profileImgUrl ? '' : avatarColor}`}>
                <div title={label || email} className="w-8 h-8 flex items-center justify-center text-white">
                    {`${label || email}`.toUpperCase()[0]}
                </div>
            </Avatar>
            <div className="flex-1">
                <p className="font-semibold text-gray-800 max-w-[20rem] overflow-x-auto no-scrollbar leading-none mb-1">
                    {label}
                </p>
                <p className="text-xs text-gray-400">{email || <i className="opacity-70">no email</i>}</p>
            </div>
        </div>
    );
};
