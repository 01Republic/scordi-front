import {useQuery} from '@tanstack/react-query';
import {FindAllIntegrationWorkspaceQueryDto, IntegrationWorkspaceDto, IntegrationProvider} from './type';
import {integrationWorkspacesApi} from './api';
import {Paginated} from '^types/utils/paginated.dto';

export const useIntegrationWorkspaceInSettingPage = (orgId: number) => {
    // 정적인 params.
    const params: FindAllIntegrationWorkspaceQueryDto = {itemsPerPage: 0, order: {id: 'DESC'}};
    return useIntegrationWorkspaces('useIntegrationWorkspaceInSettingPage', orgId, params);
};

const useIntegrationWorkspaces = (name: string, orgId: number, params: FindAllIntegrationWorkspaceQueryDto) => {
    const {data, ...methods} = useQuery({
        queryKey: [name, orgId, params],
        queryFn: () => integrationWorkspacesApi.index(orgId, params).then((res) => res.data),
        initialData: Paginated.init(),
        enabled: !!orgId && !isNaN(orgId),
    });

    function findProvider<Provider extends IntegrationProvider>(
        provider: Provider,
    ): IntegrationWorkspaceDto<Provider, any, any> | undefined {
        return data.items.find((item) => {
            return item.provider === provider;
        }) as IntegrationWorkspaceDto<Provider, any, any> | undefined;
    }

    const findSlack = () => findProvider(IntegrationProvider.slack);
    const findGoogleWorkspace = () => findProvider(IntegrationProvider.googleWorkspace);

    return {
        data,
        ...methods,
        findSlack,
        findGoogleWorkspace,
    };
};
