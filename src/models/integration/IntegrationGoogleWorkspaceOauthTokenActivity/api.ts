import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllGoogleWorkspaceOauthTokenActivityQueryDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type/FindAllGoogleWorkspaceOauthTokenActivity.query.dto';
import {GoogleWorkspaceOauthTokenActivityDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type';
import {UpdateGoogleWorkspaceActivityRequestDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type/UpdateGoogleWorkspaceActivity.request.dto';

export const integrationGoogleWorkspaceActivityAdminApi = {
    index(workspaceId: number, params: FindAllGoogleWorkspaceOauthTokenActivityQueryDto) {
        const url = `admin/google-workspace/workspaces/${workspaceId}/activities`;
        return api.get(url, {params}).then(paginatedDtoOf(GoogleWorkspaceOauthTokenActivityDto));
    },

    create(workspaceId: number) {
        const url = `admin/google-workspace/workspaces/${workspaceId}/activities`;
        return api.post(url).then(paginatedDtoOf(GoogleWorkspaceOauthTokenActivityDto));
    },

    update(workspaceId: number, id: number, data: UpdateGoogleWorkspaceActivityRequestDto) {
        const url = `admin/google-workspace/workspaces/${workspaceId}/activities/${id}`;
        return api.patch(url, data).then(oneDtoOf(GoogleWorkspaceOauthTokenActivityDto));
    },

    destroy(workspaceId: number, id: number) {
        const url = `admin/google-workspace/workspaces/${workspaceId}/activities${id}`;
        return api.delete(url).then(oneDtoOf(GoogleWorkspaceOauthTokenActivityDto));
    },
};
