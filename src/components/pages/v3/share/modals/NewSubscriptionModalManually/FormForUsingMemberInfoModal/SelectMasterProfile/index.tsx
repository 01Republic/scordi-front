import React, {memo, useEffect} from 'react';
import Select from 'react-select';
import {
    Components,
    selectStylesOptions,
} from '^v3/share/modals/NewSubscriptionModalManually/FormForUsingMemberInfoModal/SelectMasterProfile/SelectOptions';
import {TeamMemberDto, TeamMemberManager, useTeamMembers} from '^models/TeamMember';
import {useSetRecoilState} from 'recoil';
import {newSubscriptionManualFormData} from '^v3/share/modals/NewSubscriptionModalManually/atom';
import {CreateSubscriptionRequestDto} from '^models/Subscription/types';
import {UseFormReturn} from 'react-hook-form';

type TeamMemberOption = {
    label: string;
    value: number; // teamMember.id
    email?: string | null;
    profileImgUrl?: string | null;
};

interface SelectMasterProfileProps {
    onChange: (selectedOption: TeamMemberOption) => any;
}

export const SelectMasterProfile = memo((props: SelectMasterProfileProps) => {
    const {
        result: {items: members},
        search: getTeamMembers,
    } = useTeamMembers();
    const TeamMember = TeamMemberManager.init(members || []);
    const {onChange} = props;

    useEffect(() => {
        getTeamMembers({
            relations: ['membership', 'membership.user', 'organization', 'teams', 'subscriptions'],
            order: {id: 'DESC'},
            itemsPerPage: 10,
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
            options={TeamMember.all().map(toOption)}
            placeholder="담당자를 선택해주세요"
            styles={selectStylesOptions}
            components={Components()}
            onChange={onChange}
        />
    );
});
