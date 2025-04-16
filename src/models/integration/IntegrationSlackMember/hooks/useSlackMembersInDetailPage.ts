import {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useIdParam} from '^atoms/common';
import {Paginated} from '^types/utils/paginated.dto';
import {integrationSlackMemberApi} from '../api';
import {FindAllIntegrationSlackMemberQueryDto} from '../type/FindAllIntegrationSlackMember.query.dto';

const defaultParams: FindAllIntegrationSlackMemberQueryDto = {
    relations: ['teamMember'],
    where: {isDeleted: false},
    order: {isDeleted: 'ASC', id: 'DESC'},
    itemsPerPage: 15,
};

export const useSlackMembersInDetailPage = (params: FindAllIntegrationSlackMemberQueryDto = defaultParams) => {
    const [_params, setParams] = useState(params);
    const orgId = useIdParam('id');
    const workspaceId = useIdParam('slackWorkspaceId');
    const result = useQuery({
        queryKey: ['SlackWorkspaceMemberList', orgId, workspaceId, _params],
        enabled: !!orgId && !!workspaceId,
        queryFn: () => integrationSlackMemberApi.index(orgId, workspaceId, _params).then((res) => res.data),
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
