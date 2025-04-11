import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {ReviewResponseDto} from '^models/ReviewResponse/type/ReviewResponse.dto';
import {FindAllReviewResponsesQueryDto} from '../type/FindAllReviewResponsesQuery.dto';
import {CreateReviewResponseRequestDto} from '../type/CreateReviewResponseRequest.dto';
import {UpdateReviewResponseRequestDto} from '../type/UpdateReviewResponseRequest.dto';

/**
 * [요청] 요청 캠페인 응답 API
 */
export const reviewResponseApi = {
    /**
     * 요청 캠페인 하위의 응답 조회
     * - 페이지네이션을 기본
     * - 검색 기능 지원
     */
    index(orgId: number, campaignId: number, params: FindAllReviewResponsesQueryDto) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses`;
        return api.get(url, {params}).then(paginatedDtoOf(ReviewResponseDto));
    },

    /**
     * 응답폼 상세 조회
     * - 응답자 기능
     * - 응답자가 응답폼 화면을 이용하기 위해 프론트에서 상세 조회를 요청이 필요할 경우 사용
     * - 요청자도 함께 이용
     * - 요청자가 응답자의 제출된 응답을 확인하기 위하여 상세페이지를 열어보는 경우에도 사용
     * - Public (로그인 체크 대신 헤더 유효성으로 체크)
     */
    // submitToken: string,
    show(orgId: number, campaignId: number, id: number, verifyToken: string) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses/${id}`;
        const headers = {'x-scordi-verify-token': verifyToken};
        return api.get(url, {headers}).then(oneDtoOf(ReviewResponseDto));
    },

    /**
     * 신규 응답폼 추가
     * - 요청자의 기능
     * - 이미 만들어진 요청 캠페인에서, 누락 등 기타 사유로 추가적인 구성원의 응답지를 만들고 전송이 필요할 때
     */
    create(orgId: number, campaignId: number, dto: CreateReviewResponseRequestDto) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses`;
        return api.post(url, dto).then(oneDtoOf(ReviewResponseDto));
    },

    // 응답자에게 알림 재전송
    resend(orgId: number, campaignId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses/${id}/resend`;
        return api.post<void>(url);
    },

    /**
     * 응답폼 제출
     * - 응답자의 기능
     * - Public (로그인 체크 대신 헤더 유효성으로 체크)
     */
    // submitToken: string
    submit(orgId: number, campaignId: number, id: number, verifyToken: string, data: UpdateReviewResponseRequestDto) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses/${id}`;
        const headers = {'x-scordi-verify-token': verifyToken};
        return api.post(url, data, {headers}).then(oneDtoOf(ReviewResponseDto));
    },

    /**
     * 응답폼 수정
     * - 요청자의 기능
     * - 상태 변경
     * - 기타 개별 응답건의 세부 속성정보 변경 (지원예정)
     */
    update(orgId: number, campaignId: number, id: number, dto: UpdateReviewResponseRequestDto) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses/${id}`;
        return api.patch(url, dto).then(oneDtoOf(ReviewResponseDto));
    },

    // 응답폼 삭제
    destroy(orgId: number, campaignId: number, id: number) {
        const url = `/organizations/${orgId}/review_campaigns/${campaignId}/responses/${id}`;
        return api.delete(url).then(oneDtoOf(ReviewResponseDto));
    },
};
