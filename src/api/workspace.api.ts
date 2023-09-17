import {
    CreateWorkspaceMemberRequestDto,
    CreateWorkspaceRequestDto,
    FindAllWorkspaceMembersQuery,
    FindAllWorkspacesQuery,
    UpdateWorkspaceMemberRequestDto,
    UpdateWorkspaceRequestDto,
    WorkspaceDto,
    WorkspaceMemberDto,
} from '^types/workspace.type';
import {api} from '^api/api';

const NAMESPACE = 'workspace';

export const workspaceApi = {
    getWorkspace: (id: number) => {
        return api.get<WorkspaceDto>(`/${NAMESPACE}/${id}`);
    },

    getWorkspaces: (params?: FindAllWorkspacesQuery) => {
        return api.get<WorkspaceDto[]>(`/${NAMESPACE}`, {params});
    },

    createWorkspace: (dto: CreateWorkspaceRequestDto) => {
        return api.post<WorkspaceDto>(`/${NAMESPACE}`, dto);
    },

    updateWorkspace: (id: number, dto: UpdateWorkspaceRequestDto) => {
        return api.patch<WorkspaceDto>(`/${NAMESPACE}/${id}`, dto);
    },

    destroyWorkspace: (id: number) => {
        return api.delete(`/${NAMESPACE}/${id}`);
    },
};

export const workspaceMemberApi = {
    getWorkspaceMember: (id: number) => {
        return api.get<WorkspaceMemberDto>(`/${NAMESPACE}/${id}`);
    },

    getWorkspaceMembers: (params?: FindAllWorkspaceMembersQuery) => {
        return api.get<WorkspaceMemberDto[]>(`/${NAMESPACE}`, {params});
    },

    createWorkspaceMember: (workspaceId: number, dto: CreateWorkspaceMemberRequestDto) => {
        return api.post<WorkspaceMemberDto>(`/${NAMESPACE}`, {workspaceId, dto});
    },

    updateWorkspaceMember: (id: number, dto: UpdateWorkspaceMemberRequestDto) => {
        return api.patch<WorkspaceMemberDto>(`/${NAMESPACE}/${id}`, dto);
    },

    destroyWorkspaceMember: (id: number) => {
        return api.delete(`/${NAMESPACE}/${id}`);
    },
};
