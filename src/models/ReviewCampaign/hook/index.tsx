import {useQuery} from '@tanstack/react-query';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';

export const useReviewCampaigns = (orgId: number, params: FindAllReviewCampaignsQueryDto = {}) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useReviewCampaigns', orgId, query],
        queryFn: () => reviewCampaignApi.index(orgId, query).then((res) => res.data),
        enabled: !!orgId,
        initialData: Paginated.init(),
    });

    const movePage = (page: number) => {
        return setQuery((q) => ({...q, page}));
    };

    return {
        ...queryResult,
        query,
        result: queryResult.data,
        search: setQuery,
        movePage,
    };
};

export const useReviewCampaign = (orgId: number, id: number) => {
    return useQuery({
        queryKey: ['reviewCampaign', orgId, id],
        queryFn: () => reviewCampaignApi.show(orgId, id).then((res) => res.data),
        enabled: !!orgId && !!id,
    });
};

export const useReviewCampaignAuthor = (orgId: number, id: number) => {
    return useQuery({
        queryKey: ['useReviewCampaignAuthor', orgId, id],
        queryFn: () => reviewCampaignApi.author(orgId, id).then((res) => res.data),
        enabled: !!orgId && !!id,
    });
};
