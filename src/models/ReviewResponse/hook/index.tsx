import {getToken} from '^api/api';
import {
    orgIdParamState,
    reviewCampaignIdParamState,
    reviewResponseIdParamState,
    useRouterIdParamState,
} from '^atoms/common';
import {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useQuery} from '@tanstack/react-query';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {FindAllReviewResponsesQueryDto} from '^models/ReviewResponse/type/FindAllReviewResponsesQuery.dto';
import {ReviewResponseDto} from '^models/ReviewResponse/type/ReviewResponse.dto';
import {Paginated} from '^types/utils/paginated.dto';

export const useReviewResponses = (orgId: number, campaignId: number, params: FindAllReviewResponsesQueryDto) => {
    const [_params, setParams] = useState(params);
    const queryResult = useQuery<Paginated<ReviewResponseDto>>({
        queryKey: ['reviewResponses', orgId, campaignId, params],
        queryFn: () => reviewResponseApi.index(orgId, campaignId, params).then((res) => res.data),
        enabled: !!orgId && !!campaignId,
        initialData: Paginated.init(),
    });

    const nextPage = () => setParams((prev) => ({...prev, page: (prev.page || 0) + 1}));

    return {
        ...queryResult,
        params: _params,
        search: setParams,
        nextPage,
    };
};

export const useReviewResponse = (orgId: number, campaignId: number, id: number, verifyToken: string) => {
    return useQuery<ReviewResponseDto>({
        queryKey: ['reviewResponse', id, verifyToken],
        queryFn: () => reviewResponseApi.show(orgId, campaignId, id, verifyToken).then((res) => res.data),
        enabled: !!orgId && !!campaignId && !!id && !!verifyToken,
    });
};

export const useReviewRequest = (orgId: number, campaignId: number, id: number, token: string) => {
    return useQuery({
        queryKey: ['useReviewRequest', orgId, campaignId, id, token],
        queryFn: () => reviewResponseApi.show(orgId, campaignId, id, token).then((res) => res.data),
        enabled: !!orgId && !!campaignId && !!id && !!token,
    });
};
