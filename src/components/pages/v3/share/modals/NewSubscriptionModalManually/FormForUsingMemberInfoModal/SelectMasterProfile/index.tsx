import React, {memo, useEffect, useState} from 'react';
import Select, {SingleValue} from 'react-select';
import {Components, selectStylesOptions} from './SelectOptions';
import {TeamMemberDto, useTeamMembers} from '^models/TeamMember';

type TeamMemberOption = {
    label: string;
    value: number; // teamMember.id
    email?: string | null;
    profileImgUrl?: string | null;
};

interface SelectMasterProfileProps {
    onChange: (selectedOption: TeamMemberOption | null) => any;
}

export const SelectMasterProfile = memo((props: SelectMasterProfileProps) => {
    const {result, search: getTeamMembers} = useTeamMembers();
    const [selectedMember, setSelectedMember] = useState<TeamMemberOption | null>(null);
    const {onChange} = props;

    useEffect(() => {
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 0,
        });
    }, []);

    const toOption = (member: TeamMemberDto): TeamMemberOption => {
        const label = member.name;
        const value = member.id;
        const email = member.email;
        const profileImgUrl = member.profileImgUrl;
        return {label, value, email, profileImgUrl};
    };

    return (
        <Select
            options={result.items.map(toOption)}
            placeholder="담당자를 선택해주세요"
            styles={selectStylesOptions}
            components={Components()}
            defaultValue={selectedMember}
            onChange={(option) => {
                const selected = option as SingleValue<TeamMemberOption>;
                setSelectedMember(selected);
                onChange(selected);
            }}
        />
    );
});
