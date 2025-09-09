import { integrationGoogleWorkspaceMemberApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UsePatchGoogleWorkspaceMemberTeamMemberLinkProps {
    orgId: number;
    workspaceId: number;
    googleWorkspaceMemberId: number;
}

interface UsePatchGoogleWorkspaceMemberTeamMemberLinkParams {
    teamMemberId: number | null;
}

// 팀멤버를 슬랙 멤버에 연결 혹은 해제
export const usePatchGoogleWorkspaceMemberTeamMemberLink = ({ orgId, workspaceId, googleWorkspaceMemberId }: UsePatchGoogleWorkspaceMemberTeamMemberLinkProps) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ teamMemberId }: UsePatchGoogleWorkspaceMemberTeamMemberLinkParams) => {
            if (teamMemberId === null) {
                const result = await integrationGoogleWorkspaceMemberApi.unlinkTeamMember(orgId, workspaceId, googleWorkspaceMemberId);
                return result.data;
            } 

            const result = await integrationGoogleWorkspaceMemberApi.linkTeamMember(orgId, workspaceId, googleWorkspaceMemberId, teamMemberId);
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['GoogleWorkspaceMemberList', orgId, workspaceId]});
        },
        onError: (error) => {
            console.error(error);
        }
    });
};