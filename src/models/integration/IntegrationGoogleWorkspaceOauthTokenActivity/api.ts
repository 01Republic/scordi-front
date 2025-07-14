import {api} from '^api/api';
import {paginatedDtoOf} from '^types/utils/response-of';
import {FindAllGoogleWorkspaceOauthTokenActivityQueryDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type/FindAllGoogleWorkspaceOauthTokenActivity.query.dto';
import {GoogleWorkspaceOauthTokenActivityDto} from '^models/integration/IntegrationGoogleWorkspaceOauthTokenActivity/type';

export const integrationGoogleWorkspaceActivityAdminApi = {
    index(workspaceId: number, params: FindAllGoogleWorkspaceOauthTokenActivityQueryDto) {
        const url = `admin/google-workspace/workspaces/${workspaceId}/activities`;
        return api.get(url, {params}).then(paginatedDtoOf(GoogleWorkspaceOauthTokenActivityDto));
    },
};
