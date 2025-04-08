import {useQuery} from '@tanstack/react-query';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';

// // 이 코드는 아래의 useReviewCampaigns 으로 대체됩니다.
// // 아래의 useReviewCampaigns 은 몇 가지 기능상 구현이 미비한 부분이 남아있어
// // 기존 usePagedResource 의 모든 기능을 포함하고 있지 않습니다.
// // 제 때에 usePagedResource 의 기능을 대체하지 못한 상태에서
// // 만일 시급히 필요한 경우, 다음 주석처리된 코드를 풀어서 사용할 수 있습니다.
// export const useReviewCampaigns2 = (atoms: PagedResourceAtoms<ReviewCampaignDto, FindAllReviewCampaignsQueryDto>) => {
//     return usePagedResource(atoms, {
//         endpoint: (params, orgId) => reviewCampaignApi.index(orgId, params),
//         useOrgId: true,
//         buildQuery: (params, orgId) => {
//             params.where = {organizationId: orgId, ...params.where};
//             return params;
//         },
//         mergeMode: false,
//         getId: 'id',
//     });
// };

export const useReviewCampaigns = (orgId: number, params: FindAllReviewCampaignsQueryDto = {}) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useReviewCampaigns', orgId, query],
        queryFn: () => reviewCampaignApi.index(orgId, params).then((res) => res.data),
        enabled: !!orgId,
        initialData: Paginated.init(),
    });

    const search = setQuery;
    const movePage = (page: number, append = false) => {
        return search((q) => ({...q, page}));
    };

    return {
        ...queryResult,
        query,
        result: queryResult.data,
        search,
        movePage,
    };
};

export const useReviewCampaign = (orgId: number, id: number) => {
    return useQuery<ReviewCampaignDto>({
        queryKey: ['reviewCampaign', orgId, id],
        queryFn: () => reviewCampaignApi.show(orgId, id).then((res) => res.data),
        enabled: !!orgId && !!id,
    });
};
