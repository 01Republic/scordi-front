import {api} from '^api/api';
import {listDtoOf, oneDtoOf} from '^types/utils/response-of';
import {ScordiSubscriptionDto} from '^models/_scordi/ScordiSubscription/type';
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

    // // 스코디 구독 수정 *
    // update(orgId: number) {
    //     const url = `/orgs/${orgId}/billing/subscription`;
    //     return api.patch(url).then(oneDtoOf(ScordiSubscriptionDto));
    // },
};
