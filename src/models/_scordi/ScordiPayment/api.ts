import {
    CreateScordiPaymentWithCustomerKeyRequestDto,
    DPayFindAllScordiPaymentQueryDto,
    FindAllScordiPaymentQueryDto,
    ScordiPaymentDto,
} from '^models/_scordi/ScordiPayment/type';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import axios from 'axios';

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

export const postDirectPayApi = async (data: CreateScordiPaymentWithCustomerKeyRequestDto) => {
    const url = `/d-pay/payments/with-customer-key`;

    try {
        const response = await api.post(url, {
            cardNumber: data.cardNumber,
            cardExpirationYear: data.cardExpirationYear,
            cardExpirationMonth: data.cardExpirationMonth,
            customerIdentityNumber: data.customerIdentityNumber,
            cardPassword: data.cardPassword,
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            planId: data.planId,
            customerPhone: data.customerPhone,
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
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
};
