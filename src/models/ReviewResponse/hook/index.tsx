import {useQuery} from '@tanstack/react-query';
import {reviewResponseApi} from '^models/ReviewResponse/api';
import {FindAllReviewResponsesQueryDto} from '^models/ReviewResponse/type/FindAllReviewResponsesQuery.dto';
import {ReviewResponseDto} from '^models/ReviewResponse/type/ReviewResponse.dto';
import {Paginated} from '^types/utils/paginated.dto';

export const useReviewResponses = (orgId: number, campaignId: number, params: FindAllReviewResponsesQueryDto) => {
    return useQuery<Paginated<ReviewResponseDto>>({
        queryKey: ['reviewResponses', orgId, campaignId, params],
        queryFn: () => reviewResponseApi.index(orgId, campaignId, params).then((res) => res.data),
        enabled: !!orgId && !!campaignId,
    });
};

export const useReviewResponse = (orgId: number, campaignId: number, id: number, verifyToken: string) => {
    return useQuery<ReviewResponseDto>({
        queryKey: ['reviewResponse', id, verifyToken],
        queryFn: () => reviewResponseApi.show(orgId, campaignId, id, verifyToken).then((res) => res.data),
        enabled: !!orgId && !!campaignId && !!id && !!verifyToken,
    });
};
