import React, {memo} from 'react';
import Select, {components, InputActionMeta, OptionProps, SingleValueProps, StylesConfig} from 'react-select';
import {SelectComponents} from 'react-select/dist/declarations/src/components';
import {debounce} from 'lodash';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';
import {getColor} from '^components/util/palette';
import {Avatar} from '^components/Avatar';

type TeamMemberOption = {
    label: string;
    value: number; // teamMember.id
    email?: string | null;
    profileImgUrl?: string | null;
};

interface MemberSelectProps {
    label?: string;
    onChange: (e: TeamMemberOption) => any;
    styles?: StylesConfig<any, false, any>; // select styles option
    components?: Partial<SelectComponents<any, false, any>>; // select components
    defaultValue?: any;
    placeholder?: string;
}
export const MemberSelect = memo((props: MemberSelectProps) => {
    const {result, search: getTeamMembers} = useTeamMembers();

    const {label, styles, components, onChange, defaultValue, placeholder} = props;

    const toOption = (member: TeamMemberDto): TeamMemberOption => {
        const label = member.name;
        const value = member.id;
        const email = member.email;
        const profileImgUrl = member.profileImgUrl;
        return {label, value, email, profileImgUrl};
    };

    const loadTeamMembers = debounce((keyword?: string) => {
        getTeamMembers({
            keyword,
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, 500);

    return (
        <>
            <label className="text-gray-500">{label}</label>
            <Select
                options={result.items.map(toOption)}
                styles={styles}
                components={{...components, Option, SingleValue}}
                onInputChange={(newValue, {action}: InputActionMeta) => {
                    if (action === 'input-change') loadTeamMembers(newValue);
                }}
                onChange={onChange}
                defaultValue={defaultValue}
                onMenuOpen={() => loadTeamMembers()}
                placeholder={placeholder ? placeholder : ''}
            />
        </>
    );
});

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
