import {SubscriptionSummaryIndexDto, SubscriptionSummaryQueryDto} from '^models/SubscsriptionSummary/types';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {SubscriptionDto} from '^models/Subscription/types';

const namespace = 'summary/subscription';

export const subscriptionSummaryApi = {
    index: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}`;
        return api.get(url, {params}).then(oneDtoOf(SubscriptionSummaryIndexDto));
    },

    free: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}/free`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    paying: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}/paying`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    checkRequired: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}/check_required`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    billingUpdated: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}/billing_updated`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    // 동작 X
    information: (params: SubscriptionSummaryQueryDto) => {
        const url = `/${namespace}/information`;
        return api.get(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },
};
