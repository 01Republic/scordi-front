import {UseFormReturn} from 'react-hook-form';
import {useEffect, useState} from 'react';
import {TeamMemberDto} from '^types/team-member.type';
import {useTeamMemberMultiSelect} from '^hooks/useTeamMembers';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {MultiSelect} from '^components/util/select/MultiSelect';
import {IdListDto} from '^v3/V3OrgCardShowPage/modals/CardHoldingMemberModal';

interface CardHoldingMemberMultiSelectProps {
    form: UseFormReturn<IdListDto>;
}
export const CardHoldingMemberMultiSelect = (props: CardHoldingMemberMultiSelectProps) => {
    const orgId = useRouterIdParamState('orgId', orgIdParamState);
    const {form} = props;
    const [selectedMembers, setSelectedMembers] = useState<TeamMemberDto[]>([]);

    const addMember = (member: TeamMemberDto) => {
        const oldIds = form.getValues().ids ?? [];
        form.setValue('ids', [...oldIds, member.id]);
        setSelectedMembers((old) => [...old, member]);
    };

    const removeMember = (member: TeamMemberDto) => {
        const oldIds = form.getValues().ids ?? [];
        const filteredIds = oldIds.filter((id) => id !== member.id);
        form.setValue('ids', filteredIds);
        setSelectedMembers((oldMember) => oldMember.filter((oldMember) => oldMember.id !== member.id));
    };

    const resetMember = () => {
        form.setValue('ids', []);
        setSelectedMembers([]);
    };

    const {loadOptions, onChange, style, mapper} = useTeamMemberMultiSelect(orgId, {
        add: addMember,
        remove: removeMember,
        reset: resetMember,
    });

    return (
        <MultiSelect value={selectedMembers.map(mapper)} loadOptions={loadOptions} onChange={onChange} style={style} />
    );
};
