import {memo} from 'react';
import {useQuery, useMutation} from '@tanstack/react-query';
import {WithChildren} from '^types/global.type';
import {IntegrationSlackMemberDto} from '^models/integration/IntegrationSlackMember/type/IntegrationSlackMember.dto';
import {useOrgIdParam} from '^atoms/common';
import {teamMemberApi} from '^models/TeamMember/api';
import {Dropdown} from '^components/pages/v3/share/Dropdown/Dropdown';
import { TeamMemberDto } from '^models/TeamMember';
import { integrationSlackMemberApi } from '^models/integration/IntegrationSlackMember/api';
import {TeamMemberConnectTrigger} from './TeamMemberConnectTrigger';
import {TeamMemberConnectDropdownContent} from './TeamMemberConnectDropdownContent';

interface TeamMemberConnectDropdownProps extends WithChildren {
    item: IntegrationSlackMemberDto;
    reload?: () => any;
}


export const TeamMemberConnectDropdown = memo((props: TeamMemberConnectDropdownProps) => {
    const {item, reload} = props;
    const orgId = useOrgIdParam();

    // 팀멤버 목록 API 호출
    const {data: teamMembers, isLoading } = useQuery({
        queryKey: ['teamMembers', orgId],
        queryFn: () => teamMemberApi.index(orgId, {page: 1, itemsPerPage: 0, relations: ['slackMember']}).then(res => res.data.items),
        enabled: !!orgId,
    });

    const linkTeamMemberMutation = useMutation({
        mutationFn: async (teamMemberId: number) => {
            const result = await integrationSlackMemberApi.linkTeamMember(orgId, item.integrationWorkspaceId, item.id, teamMemberId);
            return result.data;
        },
        onSuccess: (data) => {
            handleReload();
        },
        onError: (error) => {
            console.error(error);
            handleReload();
        }
    });

    const unlinkTeamMemberMutation = useMutation({
        mutationFn: async () => {
            return await integrationSlackMemberApi.unlinkTeamMember(orgId, item.integrationWorkspaceId, item.id);
        },
        onSuccess: () => {
            handleReload();
        },
        onError: (error) => {
            console.error(error);
            handleReload();
        }
    });

    const handleReload = () => {
        reload?.();
    };

    // 선택된 유저를 상단으로 정렬
    const sortedTeamMembers: TeamMemberDto[] = teamMembers ? [...teamMembers].sort((a, b) => {
        if (item.teamMemberId) {
            if (a.id === item.teamMemberId) return -1;
            if (b.id === item.teamMemberId) return 1;
        }
        return 0;
    }) : [];

    const handleSelectTeamMember = (teamMember: TeamMemberDto) => {
        if (item.teamMemberId === teamMember.id) {
            unlinkTeamMemberMutation.mutate();
        } else {
            linkTeamMemberMutation.mutate(teamMember.id);
        }
    };

    return (
        <Dropdown
            className="w-full min-w-[10rem]"
            placement="bottom-start"
            Trigger={() => (
                <TeamMemberConnectTrigger item={item} isLoading={isLoading} />
            )}
        >
            {({ hide }) => (
                <TeamMemberConnectDropdownContent
                    isLoading={isLoading}
                    sortedTeamMembers={sortedTeamMembers}
                    item={item}
                    onSelectTeamMember={(teamMember) => {
                        handleSelectTeamMember(teamMember);
                        hide();
                    }}
                />
            )}
        </Dropdown>
    );
});
TeamMemberConnectDropdown.displayName = 'TeamMemberConnectDropdown';

