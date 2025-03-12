import {
    CreateScordiPaymentWithCustomerKeyRequestDto,
    DPayFindAllScordiPaymentQueryDto,
    FindAllScordiPaymentQueryDto,
    ScordiPaymentDto,
} from '^models/_scordi/ScordiPayment/type';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

/**
 * [Billing] 스코디 결제 API
 */
export const scordiPaymentsApi = {
    // 스코디 결제 조회 *
    index(orgId: number, params?: FindAllScordiPaymentQueryDto) {
        const url = `/orgs/${orgId}/billing/payments`;
        return api.get(url, {params}).then(paginatedDtoOf(ScordiPaymentDto));
    },

    // 스코디 결제 상세 조회 *
    show(orgId: number, id: number) {
        const url = `/orgs/${orgId}/billing/payments/${id}`;
        return api.get(url).then(oneDtoOf(ScordiPaymentDto));
    },

    // 스코디 결제 생성 *
    create(orgId: number) {
        const url = `/orgs/${orgId}/billing/payments`;
        return api.post(url).then(oneDtoOf(ScordiPaymentDto));
    },

    // 스코디 결제 항목 삭제 *
    destroy(orgId: number, id: number) {
        const url = `/orgs/${orgId}/billing/payments/${id}`;
        return api.delete(url).then(oneDtoOf(ScordiPaymentDto));
    },
};

/**
 * [D-Pay] 비회원 결제 API
 */
export const dPayScordiPaymentsApi = {
    // 비회원 결제 조회
    index(params?: DPayFindAllScordiPaymentQueryDto) {
        const url = `/d-pay/payments`;
        return api.get(url, {params}).then(paginatedDtoOf(ScordiPaymentDto));
    },

    // 비회원 결제 (빌링키 발급 포함)
    createWithCustomerKey(data: CreateScordiPaymentWithCustomerKeyRequestDto) {
        const url = `/d-pay/payments/with-customer-key`;
        return api.post(url, data).then(oneDtoOf(ScordiPaymentDto));
    },

    // 비회원 결제 취소
    cancel(paymentId: number, secretCode: string) {
        const url = `/d-pay/payments/${paymentId}/${secretCode}/cancel`;
        return api.patch(url).then(oneDtoOf(ScordiPaymentDto));
    },
};
