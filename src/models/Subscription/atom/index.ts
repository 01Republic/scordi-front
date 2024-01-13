import {atom, selector, selectorFamily} from 'recoil';
import {SubscriptionDto, FindAllSubscriptionsQuery} from 'src/models/Subscription/types';
import {orgIdParamState, subscriptionIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {errorNotify} from '^utils/toast-notify';
import {Paginated} from '^types/utils/paginated.dto';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const subscriptionListAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'subscriptionListAtom',
});

// 대시보드 / SummarySection 전용 조회
export const subscriptionsForSummaryState = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'subscriptionsForSummaryState',
});

// 대시보드 / 구독현황 테이블 - 구독목록조회
export const dashboardSubscriptionSearchResultAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'dashboardSubscriptionSearchResultAtom',
});

// 구독리스트 / SummarySection 전용 조회
export const subscriptionsForSummaryPanelAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'subscriptionsForSummaryPanelAtom',
});

// 구독리스트 / 구독목록조회
export const subscriptionTableListAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'subscriptionTableListAtom',
});

// 팀멤버 상세모달 / 이용중인 서비스 목록
export const subscriptionsInTeamMemberShowModalAtom = pagedResourceAtom<SubscriptionDto, FindAllSubscriptionsQuery>({
    key: 'pagedSubscriptions_TeamMemberShowModal/Atom',
});

/**
 * 이 아래는 단일 구독에 관한 쿼리입니다.
 * 구독 리스트에 관한 쿼리에서 selector 는 전부 제거했지만
 * 단일 구독에 관한 쿼리는 아직 완벽하게 대체되지 않아서 남겨둡니다.
 */

export const getCurrentSubscriptionQueryTrigger = atom({
    key: 'getCurrentSubscriptionQueryTrigger',
    default: 0,
});

export const getCurrentSubscriptionQuery = selector({
    key: 'getCurrentSubscriptionQuery1',
    get: async ({get}) => {
        get(getCurrentSubscriptionQueryTrigger);
        const id = get(subscriptionIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await subscriptionApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {
        set(getCurrentSubscriptionQueryTrigger, (v) => v + 1);
    },
});

export const getSubscriptionQueryTrigger = atom({
    key: 'getSubscriptionQueryTrigger',
    default: 0,
});

export const getSubscriptionQuery = selector({
    key: 'getSubscriptionQuery',
    get: async ({get}) => {
        get(getSubscriptionQueryTrigger);
        const id = get(subscriptionIdParamState);
        if (isNaN(id)) return;
        try {
            const res = await subscriptionApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
    set: ({get, set}) => {
        set(getSubscriptionQueryTrigger, (v) => v + 1);
    },
});

export const fetchSubscriptionQueryById = selectorFamily({
    key: 'fetchSubscriptionQueryById',
    get: (id: number) => async () => {
        try {
            const res = await subscriptionApi.show(id);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});
