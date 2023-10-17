import {
    SubscriptionDto,
    CreateSubscriptionByInvoicesRequestDto,
    CreateSubscriptionRequestDto,
    FindAllSubscriptionsQuery,
    UpdateSubscriptionRequestDto,
    CreateSubscriptionRequestDto2,
} from '^types/subscription.type';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

const NAMESPACE = 'subscriptions';

export const getSubscriptions = (params?: FindAllSubscriptionsQuery) => {
    return api.get<Paginated<SubscriptionDto>>(`/${NAMESPACE}`, {params}).then(paginatedDtoOf(SubscriptionDto));
};

export const getSubscription = (id: number) => {
    return api.get<SubscriptionDto>(`/${NAMESPACE}/${id}`).then(oneDtoOf(SubscriptionDto));
};

export const createSubscription = (dto: CreateSubscriptionRequestDto) => {
    return api.post<SubscriptionDto>(`/${NAMESPACE}`, dto).then(oneDtoOf(SubscriptionDto));
};

export const createSubscriptionByInvoices = (dto: CreateSubscriptionByInvoicesRequestDto) => {
    return api.post<SubscriptionDto>(`/${NAMESPACE}/byInvoices`, dto).then(oneDtoOf(SubscriptionDto));
};

export const updateSubscription = (id: number, dto: UpdateSubscriptionRequestDto) => {
    return api.patch<SubscriptionDto>(`/${NAMESPACE}/${id}`, dto).then(oneDtoOf(SubscriptionDto));
};

export const destroySubscription = (id: number) => {
    return api.delete<Omit<SubscriptionDto, 'id'>>(`/${NAMESPACE}/${id}`);
};

export const subscriptionApi = {
    index: (params?: FindAllSubscriptionsQuery) => {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<SubscriptionDto>>(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    create: (workspaceId: number, productId: number, dto: CreateSubscriptionRequestDto2) => {
        return api
            .post<SubscriptionDto>(`/${NAMESPACE}`, {workspaceId, productId, dto})
            .then(oneDtoOf(SubscriptionDto));
    },

    update(id: number, data: UpdateSubscriptionRequestDto) {
        const url = `/subscriptions/${id}`;
        return api.patch<SubscriptionDto>(url, data).then(oneDtoOf(SubscriptionDto));
    },
};
