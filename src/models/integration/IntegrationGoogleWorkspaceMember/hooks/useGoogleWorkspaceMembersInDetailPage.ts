import {useState} from 'react';
import {useIdParam, useOrgIdParam} from '^atoms/common';
import {useQuery} from '@tanstack/react-query';
import {Paginated} from '^types/utils/paginated.dto';
import {integrationGoogleWorkspaceMemberApi} from '^models/integration/IntegrationGoogleWorkspaceMember/api';
import {FindAllIntegrationGoogleWorkspaceMemberQueryDto} from '^models/integration/IntegrationGoogleWorkspaceMember/type/FindAllIntegrationGoogleWorkspaceMember.query.dto';

const defaultParams: FindAllIntegrationGoogleWorkspaceMemberQueryDto = {
    relations: ['teamMember'],
    where: {isDeleted: false},
    order: {isDeleted: 'ASC', id: 'DESC'},
    itemsPerPage: 15,
};

export const useGoogleWorkspaceMembersInDetailPage = (
    params: FindAllIntegrationGoogleWorkspaceMemberQueryDto = defaultParams,
) => {
    const [_params, setParams] = useState(params);
    const orgId = useOrgIdParam();
    const workspaceId = useIdParam('workspaceId');
    const result = useQuery({
        queryKey: ['GoogleWorkspaceMemberList', orgId, workspaceId, _params],
        enabled: !!orgId && !!workspaceId,
        queryFn: () => integrationGoogleWorkspaceMemberApi.index(orgId, workspaceId, _params).then((res) => res.data),
        initialData: Paginated.init(),
    });

    const movePage = (page: number) => {
        setParams((p) => ({...p, page}));
    };

    const prevPage = () => {
        const page = _params.page || 1;
        movePage(page > 1 ? page - 1 : page);
    };

    const nextPage = () => {
        const page = _params.page || 1;
        movePage(page + 1);
    };

    return {
        ...result,
        params: _params,
        search: setParams,
        movePage,
        prevPage,
        nextPage,
    };
};
