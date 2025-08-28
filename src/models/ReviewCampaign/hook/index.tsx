import {useQuery} from '@tanstack/react-query';
import {reviewCampaignApi} from '^models/ReviewCampaign/api';
import {FindAllReviewCampaignsQueryDto} from '^models/ReviewCampaign/type/FindAllReviewCampaignsQuery.dto';
import {useState} from 'react';
import {Paginated} from '^types/utils/paginated.dto';
import {FindAllReviewCampaignSubscriptionsQueryDto} from '../type';
import {FindAllReviewResponseSubscriptionsQueryDto} from '^models/ReviewResponse/type';
import {usePaginateUtils} from '^hooks/usePagedResource';

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

    return usePaginateUtils({query, setQuery, queryResult});
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

export const useReviewCampaignSubscriptions = (
    orgId: number,
    id: number,
    params: FindAllReviewCampaignSubscriptionsQueryDto,
) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useReviewCampaignSubscriptions', orgId, id, query],
        queryFn: () => reviewCampaignApi.subscriptions.index(orgId, id, query).then((res) => res.data),
        enabled: !!orgId && !!id,
        initialData: Paginated.init(),
    });

    return {
        ...queryResult,
        query,
        search: setQuery,
    };
};

export const useReviewResponseSubscriptions = (
    orgId: number,
    id: number,
    params: FindAllReviewResponseSubscriptionsQueryDto,
) => {
    const [query, setQuery] = useState(params);
    const queryResult = useQuery({
        queryKey: ['useReviewResponseSubscriptions', orgId, id, query],
        queryFn: () => reviewCampaignApi.responseSubscriptions.index(orgId, id, query).then((res) => res.data),
        enabled: !!orgId && !!id,
        initialData: Paginated.init(),
    });

    return {
        ...queryResult,
        query,
        search: setQuery,
    };
};
