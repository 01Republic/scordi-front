import {memo, useState} from 'react';
import {useQuery, useMutation} from '@tanstack/react-query';
import {WithChildren} from '^types/global.type';
import {IntegrationGoogleWorkspaceMemberDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/IntegrationGoogleWorkspaceMember.dto';
import {useOrgIdParam} from '^atoms/common';
import {teamMemberApi} from '^models/TeamMember/api';
import {Dropdown} from '^components/pages/v3/share/Dropdown/Dropdown';
import { TeamMemberDto } from '^models/TeamMember';
import { integrationGoogleWorkspaceMemberApi } from '^models/integration/IntegrationGoogleWorkspaceMember/api';
import {TeamMemberConnectTrigger} from './TeamMemberConnectTrigger';
import {TeamMemberConnectDropdownContent} from './TeamMemberConnectDropdownContent';

interface TeamMemberConnectDropdownProps extends WithChildren {
    item: IntegrationGoogleWorkspaceMemberDto;
    reload?: () => any;
}

export const TeamMemberConnectDropdown = memo((props: TeamMemberConnectDropdownProps) => {
    const {item, reload} = props;
    const orgId = useOrgIdParam();
    const [isLoading, setIsLoading] = useState(false);

    // 팀멤버 목록 API 호출
    const {data: teamMembers, isLoading: isTeamMembersLoading} = useQuery({
        queryKey: ['teamMembers', orgId],
        queryFn: () => teamMemberApi.index(orgId, {page: 1, itemsPerPage: 0, relations: ['googleWorkspaceMember']}).then(res => res.data.items),
        enabled: !!orgId,
    });

    const linkTeamMemberMutation = useMutation({
        mutationFn: async (teamMemberId: number) => {
            setIsLoading(true);
            const result = await integrationGoogleWorkspaceMemberApi.linkTeamMember(orgId, item.integrationWorkspaceId, item.id, teamMemberId);
            return result.data;
        },
        onSuccess: () => {
            // 1초 후 로딩 해제 및 새로고침
            setTimeout(() => {
                setIsLoading(false);
                handleReload();
            }, 1000);
        },
        onError: (error) => {
            setIsLoading(false);
            console.error(error);
            handleReload();
        }
    });

    const unlinkTeamMemberMutation = useMutation({
        mutationFn: async () => {
            // 팀멤버가 연결되어 있지 않으면 무시
            if (!item.teamMemberId) return;

            setIsLoading(true);
            return await integrationGoogleWorkspaceMemberApi.unlinkTeamMember(orgId, item.integrationWorkspaceId, item.id, item.teamMemberId);
        },
        onSuccess: () => {
            // 1초 후 로딩 해제 및 새로고침
            setTimeout(() => {
                setIsLoading(false);
                handleReload();
            }, 1000);
        },
        onError: (error) => {
            setIsLoading(false);
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
                    isLoading={isTeamMembersLoading}
                    sortedTeamMembers={sortedTeamMembers}
                    item={item}
                    onSelectTeamMember={(teamMember: TeamMemberDto) => {
                        handleSelectTeamMember(teamMember);
                        hide();
                    }}
                />
            )}
        </Dropdown>
    );
});
TeamMemberConnectDropdown.displayName = 'TeamMemberConnectDropdown';
