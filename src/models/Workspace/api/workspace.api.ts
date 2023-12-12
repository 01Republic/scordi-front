import {
    CreateWorkspaceMemberRequestDto,
    CreateWorkspaceRequestDto,
    FindAllWorkspaceMembersQuery,
    FindAllWorkspacesQuery,
    UpdateWorkspaceMemberRequestDto,
    UpdateWorkspaceRequestDto,
    WorkspaceDto,
    WorkspaceMemberDto,
} from '^models/Workspace/type/workspace.type';
import {api} from '^api/api';

const NAMESPACE = 'workspace';

export const workspaceApi = {
    show: (id: number) => {
        return api.get<WorkspaceDto>(`/${NAMESPACE}/${id}`);
    },

    index: (params?: FindAllWorkspacesQuery) => {
        return api.get<WorkspaceDto[]>(`/${NAMESPACE}`, {params});
    },

    create: (dto: CreateWorkspaceRequestDto) => {
        return api.post<WorkspaceDto>(`/${NAMESPACE}`, dto);
    },

    update: (id: number, dto: UpdateWorkspaceRequestDto) => {
        return api.patch<WorkspaceDto>(`/${NAMESPACE}/${id}`, dto);
    },

    destroy: (id: number) => {
        return api.delete(`/${NAMESPACE}/${id}`);
    },
};

export const workspaceMemberApi = {
    show: (id: number) => {
        return api.get<WorkspaceMemberDto>(`/${NAMESPACE}/${id}`);
    },

    index: (params?: FindAllWorkspaceMembersQuery) => {
        return api.get<WorkspaceMemberDto[]>(`/${NAMESPACE}`, {params});
    },

    create: (workspaceId: number, dto: CreateWorkspaceMemberRequestDto) => {
        return api.post<WorkspaceMemberDto>(`/${NAMESPACE}`, {workspaceId, dto});
    },

    update: (id: number, dto: UpdateWorkspaceMemberRequestDto) => {
        return api.patch<WorkspaceMemberDto>(`/${NAMESPACE}/${id}`, dto);
    },

    destroy: (id: number) => {
        return api.delete(`/${NAMESPACE}/${id}`);
    },
};
