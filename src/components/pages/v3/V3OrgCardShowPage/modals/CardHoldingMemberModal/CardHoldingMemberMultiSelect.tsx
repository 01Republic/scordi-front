import {UseFormReturn} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {TeamMemberDto} from '^types/team-member.type';
import {useTeamMemberMultiSelect} from '^hooks/useTeamMembers';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {MultiSelect} from '^components/util/select/MultiSelect';
import {IdDto} from '^components/pages/v3/V3OrgCardShowPage/modals/CardHoldingMemberModal/CardHoldingMemberModal';

interface CardHoldingMemberMultiSelectProps {
    form: UseFormReturn<IdDto>;
}
export const CardHoldingMemberMultiSelect = (props: CardHoldingMemberMultiSelectProps) => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const {form} = props;
    const [selectedMembers, setSelectedMembers] = useState<TeamMemberDto[]>([]);

    const addMember = (member: TeamMemberDto) => {
        const oldIds = form.getValues().id ?? [];
        form.setValue('id', member.id);
        setSelectedMembers((old) => [...old, member]);
    };

    const removeMember = (member: TeamMemberDto) => {
        const oldIds = form.getValues().id ?? [];
        // const filteredIds = oldIds.filter((id) => id !== member.id);
        // form.setValue('id', filteredId);
        setSelectedMembers((oldMember) => oldMember.filter((oldMember) => oldMember.id !== member.id));
    };

    const resetMember = () => {
        form.setValue('id', 0);
        setSelectedMembers([]);
    };

    // const defaultMember = () => {};

    const {loadOptions, onChange, style, mapper} = useTeamMemberMultiSelect(orgId, {
        add: addMember,
        remove: removeMember,
        reset: resetMember,
    });

    return (
        <MultiSelect value={selectedMembers.map(mapper)} loadOptions={loadOptions} onChange={onChange} style={style} />
    );
};
