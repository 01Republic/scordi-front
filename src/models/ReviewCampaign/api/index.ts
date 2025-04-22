import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    ReviewCampaignDto,
    FindAllReviewCampaignsQueryDto,
    CreateReviewCampaignRequestDto,
    UpdateReviewCampaignRequestDto,
    ReviewCampaignSubscriptionDto,
    FindAllReviewCampaignSubscriptionsQueryDto,
} from '^models/ReviewCampaign/type';
import {ReviewResponseSubscriptionDto, FindAllReviewResponseSubscriptionsQueryDto} from '^models/ReviewResponse/type';
import {TeamMemberDto} from '^models/TeamMember';
import {UpdateReviewResponseSubscriptionRequestDto} from '^models/ReviewResponse/type/UpdateReviewResponseSubscriptionRequest.dto';

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
        return api.patch(url).then(oneDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 삭제
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${id}`;
        return api.delete(url).then(oneDtoOf(ReviewCampaignDto));
    },

    // 요청 캠페인 요청자 조회
    author(orgId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${id}/author`;
        return api.get(url).then(oneDtoOf(TeamMemberDto));
    },

    // 캠페인이 요청하는 대상 구독
    subscriptions: {
        index(orgId: number, id: number, params: FindAllReviewCampaignSubscriptionsQueryDto) {
            const url = `/organizations/${orgId}/review_campaigns/${id}/subscriptions`;
            return api.get(url, {params}).then(paginatedDtoOf(ReviewCampaignSubscriptionDto));
        },
    },

    // 요청 캠페인 응답지의 구독 응답
    responseSubscriptions: {
        index(orgId: number, id: number, params: FindAllReviewResponseSubscriptionsQueryDto) {
            const url = `/organizations/${orgId}/review_campaigns/${id}/response_subscriptions`;
            return api.get(url, {params}).then(paginatedDtoOf(ReviewResponseSubscriptionDto));
        },

        update(orgId: number, campaignId: number, id: number, dto: UpdateReviewResponseSubscriptionRequestDto) {
            const url = `/organizations/${orgId}/review_campaigns/${campaignId}/response_subscriptions/${id}`;
            return api.patch(url, dto).then(oneDtoOf(ReviewResponseSubscriptionDto));
        },
    },
};
