import {memo} from 'react';
import {WithChildren} from '^types/global.type';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {useOrgIdParam} from '^atoms/common';
import { TeamMemberDto, useTeamMembers } from '^models/TeamMember';
import { useToast } from '^hooks/useToast';
import { TeamMemberProfileOption } from '^models/TeamMember/components/TeamMemberProfile';
import { TagUI } from '^components/pages/v3/share/table/columns/share/TagUI';
import { SelectColumn } from '^components/pages/v3/share/table/columns/SelectColumn';
import { usePatchGoogleWorkspaceMemberTeamMemberLink } from '^models/integration/IntegrationGoogleWorkspaceMember/hooks/usePatchGoogleWorkspaceMemberTeamMemberLink';

interface TeamMemberConnectDropdownProps extends WithChildren {
    item: IntegrationGoogleWorkspaceMemberDto;
    reload?: () => any;
}

export const GoogleWorkspaceTeamMemberConnectDropdown = memo((props: TeamMemberConnectDropdownProps) => {
    const {toast} = useToast();
    const {search} = useTeamMembers();
    const {item, reload} = props;
    const orgId = useOrgIdParam();

    const {mutateAsync} = usePatchGoogleWorkspaceMemberTeamMemberLink({
        orgId, 
        workspaceId: item.integrationWorkspaceId, 
        googleWorkspaceMemberId: item.id
    });
    
    const getOptions = async (keyword?: string) => {
        return search(
            {
                keyword,
                where: {organizationId: orgId},
                itemsPerPage: 0,
            },
            false,
            true,
        ).then((res) => res?.items || []);
    };

    const onSelect = async (teamMember: TeamMemberDto) => {
        if (teamMember.id === item.teamMemberId) return;

        return mutateAsync({teamMemberId: teamMember.id})
            .then(() => reload?.())
            .finally(() => toast.success('변경사항을 저장했어요.'));
    };

    const optionDetach = async () => {
        return mutateAsync({teamMemberId: null})
            .then(() => reload?.())
            .finally(() => toast.success('연결을 해제했어요.'));
    };

    return (
        <div className="w-40 overflow-x-hidden">
            <SelectColumn
                value={item.teamMember}
                getOptions={getOptions}
                ValueComponent={TeamMemberProfile}
                valueOfOption={(member) => member.id}
                textOfOption={(member) => member.name}
                keywordFilter={(member, keyword) => member.name.includes(keyword)}
                onSelect={onSelect}
                inputDisplay
                inputPlainText
                optionWrapperClass="!py-1.5"
                optionListBoxTitle="연결된 계정을 변경할까요?"
                optionDetach={optionDetach}
                detachableOptionBoxTitle="연결된 계정"
                EmptyComponent={() => <TagUI className="text-gray-300 w-40 !justify-start">비어있음</TagUI>}
            />
        </div>
    );
});
GoogleWorkspaceTeamMemberConnectDropdown.displayName = 'GoogleWorkspaceTeamMemberConnectDropdown';

const TeamMemberProfile = memo((props: {value: TeamMemberDto | string}) => {
    const {value} = props;

    if (typeof value === 'string') {
        return <p>{value}</p>;
    }

    return <TeamMemberProfileOption item={value} placeholder="연결된 계정 없음" />;
});
