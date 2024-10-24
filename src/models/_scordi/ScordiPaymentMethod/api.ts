import {api} from '^api/api';
import {CreateScordiPaymentMethodRequestDto, FindAllScordiPaymentMethodQueryDto, ScordiPaymentMethodDto} from './type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

/**
 * [Billing] 결제수단 API
 */
export const scordiPaymentMethodApi = {
    // 스코디 결제수단 조회 *
    index(orgId: number, params?: FindAllScordiPaymentMethodQueryDto) {
        const url = `/orgs/${orgId}/billing/payment_methods`;
        return api.get(url, {params}).then(paginatedDtoOf(ScordiPaymentMethodDto));
    },

    // 결제수단(빌링키) 등록 *
    create(orgId: number, data: CreateScordiPaymentMethodRequestDto) {
        const url = `/orgs/${orgId}/billing/payment_methods`;
        return api.post(url, data).then(oneDtoOf(ScordiPaymentMethodDto));
    },
};
