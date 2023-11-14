import {atom, selector, selectorFamily} from 'recoil';
import {SubscriptionDto, FindAllSubscriptionsQuery} from 'src/models/Subscription/types';
import {subscriptionIdParamState} from '^atoms/common';
import {subscriptionApi} from '^models/Subscription/api';
import {errorNotify} from '^utils/toast-notify';
import {Paginated} from '^types/utils/paginated.dto';

export const subscriptionsState = atom({
    key: 'subscriptionsState',
    default: [] as SubscriptionDto[],
});

export const getSubscriptionsParamsState = atom<FindAllSubscriptionsQuery>({
    key: 'getSubscriptionsParamsState',
    default: {},
});

export const getSubscriptionsQueryAtom = atom<FindAllSubscriptionsQuery>({
    key: 'getSubscriptionsQueryAtom',
    default: {},
});

export const subscriptionsSearchResultAtom = atom<Paginated<SubscriptionDto>>({
    key: 'subscriptionsSearchResultAtom',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});

export const getSubscriptionsQuery = selector({
    key: 'getSubscriptionsQuery',
    get: async ({get}) => {
        const params = get(getSubscriptionsParamsState);
        if (!params.where?.organizationId) return;

        try {
            const res = await subscriptionApi.index(params);
            return res.data;
        } catch (e) {
            errorNotify(e);
        }
    },
});

export const getCurrentSubscriptionQueryTrigger = atom({
    key: 'getCurrentSubscriptionQueryTrigger',
    default: 0,
});

export const getCurrentSubscriptionQuery = selector({
    key: 'getCurrentSubscriptionQuery',
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
