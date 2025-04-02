import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {ReviewCampaignDto} from '^models/ReviewCampaign/type/ReviewCampaign.dto';
import {FindAllReviewCampaignsQueryDto} from '../type/FindAllReviewCampaignsQuery.dto';
import {CreateReviewCampaignRequestDto} from '../type/CreateReviewCampaignRequest.dto';
import {UpdateReviewCampaignRequestDto} from '../type/UpdateReviewCampaignRequest.dto';

/**
 * [요청] 요청 캠페인 API
 */
export const reviewCampaignApi = {
    // 요청 캠페인 조회
    index(orgId: number, params: FindAllReviewCampaignsQueryDto) {
        const url = `/organizations/${orgId}/review_campaigns`;
        return api.get(url, {params}).then(paginatedDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 상세
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${id}`;
        return api.get(url).then(oneDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 생성
    create(orgId: number, dto: CreateReviewCampaignRequestDto) {
        const url = `/organizations/${orgId}/review_campaigns`;
        return api.post(url, dto).then(oneDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 수정
    update(orgId: number, id: number, dto: UpdateReviewCampaignRequestDto) {
        const url = `/organizations/${orgId}/review_campaigns/${id}`;
        return api.patch(url, dto).then(oneDtoOf(ReviewCampaignDto));
    },

    // TODO: 요청 캠페인 최종 승인
    approve(orgId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${id}/approve`;
        // return api.patch(url, dto).then(oneDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 삭제d
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${id}`;
        return api.delete(url).then(oneDtoOf(ReviewCampaignDto));
    },
};
