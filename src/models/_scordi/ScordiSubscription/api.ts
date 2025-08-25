import {api} from '^api/api';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    CreateScordiSubscriptionRequestDto,
    FindAllScordiSubscriptionsForAdminDto,
    FindAllScordiSubscriptionsQueryDto,
    ScordiSubscriptionDto,
    UpdateScordiSubscriptionRequestDto,
} from '^models/_scordi/ScordiSubscription/type';
import {plainToInstance} from 'class-transformer';

/**
 * [Billing] 스코디 구독 API
 */
export const scordiSubscriptionApi = {
    // 스코디 구독 대기열 조회 *
    scheduledItems(orgId: number) {
        const url = `/orgs/${orgId}/billing/subscription/scheduled-items`;
        return api.get(url).then(listDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 상세조회 *
    show(orgId: number) {
        const url = `/orgs/${orgId}/billing/subscription`;
        return api.get<ScordiSubscriptionDto | null>(url).then((res) => {
            res.data = res.data ? plainToInstance(ScordiSubscriptionDto, res.data) : null;
            return res;
        });
    },

    // 스코디 구독 등록 *
    create(orgId: number, planId: number) {
        const url = `/orgs/${orgId}/billing/subscription`;
        const data = {planId};
        return api.post(url, data).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 해지 *
    cancel(orgId: number) {
        const url = `/orgs/${orgId}/billing/subscription/cancel`;
        return api.patch(url).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 복구 (해지된 구독의 해지 취소) *
    revoke(orgId: number) {
        const url = `/orgs/${orgId}/billing/subscription/revoke`;
        return api.patch(url).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // // 스코디 구독 수정 *
    // update(orgId: number) {
    //     const url = `/orgs/${orgId}/billing/subscription`;
    //     return api.patch(url).then(oneDtoOf(ScordiSubscriptionDto));
    // },
};

// [Admin] 스코디 구독관리 API
export const adminScordiSubscriptionsApi = {
    index(params: FindAllScordiSubscriptionsForAdminDto) {
        const url = `/admin/billing/subscriptions`;
        return api.get(url, {params}).then(paginatedDtoOf(ScordiSubscriptionDto));
    },
};

// [Admin] 스코디 구독 API
export const scordiSubscriptionsApi = {
    // 스코디 구독 조회
    index(orgId: number, params: FindAllScordiSubscriptionsQueryDto) {
        const url = `/admin/orgs/${orgId}/billing/subscriptions`;
        return api.get(url, {params}).then(paginatedDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 상세
    show(orgId: number, id: number) {
        const url = `/admin/orgs/${orgId}/billing/subscriptions/${id}`;
        return api.get(url).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 생성
    create(orgId: number, dto: CreateScordiSubscriptionRequestDto) {
        const url = `/admin/orgs/${orgId}/billing/subscriptions`;
        return api.post(url, dto).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 수정
    update(orgId: number, id: number, dto: UpdateScordiSubscriptionRequestDto) {
        const url = `/admin/orgs/${orgId}/billing/subscriptions/${id}`;
        return api.patch(url, dto).then(oneDtoOf(ScordiSubscriptionDto));
    },

    // 스코디 구독 삭제
    destroy(orgId: number, id: number) {
        const url = `/admin/orgs/${orgId}/billing/subscriptions/${id}`;
        return api.delete(url).then(oneDtoOf(ScordiSubscriptionDto));
    },
};
