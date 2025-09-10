import { integrationSlackMemberApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UsePatchSlackMemberTeamMemberLinkProps {
    orgId: number;
    workspaceId: number;
    slackMemberId: number;
}

interface UsePatchSlackMemberTeamMemberLinkParams {
    teamMemberId: number | null;
}

// 팀멤버를 슬랙 멤버에 연결 혹은 해제
export const usePatchSlackMemberTeamMemberLink = ({ orgId, workspaceId, slackMemberId }: UsePatchSlackMemberTeamMemberLinkProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ teamMemberId }: UsePatchSlackMemberTeamMemberLinkParams) => {
            if (teamMemberId === null) {
                const result = await integrationSlackMemberApi.unlinkTeamMember(orgId, workspaceId, slackMemberId);
                return result.data;
            } 

            const result = await integrationSlackMemberApi.linkTeamMember(orgId, workspaceId, slackMemberId, teamMemberId);
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['SlackWorkspaceMemberList', orgId, workspaceId]});
        },
        onError: (error) => {
            console.error(error);
        }
    });
};
