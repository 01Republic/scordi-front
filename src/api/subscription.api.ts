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

const NAMESPACE = 'subscriptions';

export const getSubscriptions = (params?: FindAllSubscriptionsQuery) => {
    return api.get<Paginated<SubscriptionDto>>(`/${NAMESPACE}`, {params});
};

export const getSubscription = (id: number) => {
    return api.get<SubscriptionDto>(`/${NAMESPACE}/${id}`);
};

export const createSubscription = (dto: CreateSubscriptionRequestDto) => {
    return api.post<SubscriptionDto>(`/${NAMESPACE}`, dto);
};

export const createSubscriptionByInvoices = (dto: CreateSubscriptionByInvoicesRequestDto) => {
    return api.post<SubscriptionDto>(`/${NAMESPACE}/byInvoices`, dto);
};

export const updateSubscription = (id: number, dto: UpdateSubscriptionRequestDto) => {
    return api.patch<SubscriptionDto>(`/${NAMESPACE}/${id}`, dto);
};

export const destroySubscription = (id: number) => {
    return api.delete<Omit<SubscriptionDto, 'id'>>(`/${NAMESPACE}/${id}`);
};

export const subscriptionApi = {
    createSubscription: (workspaceId: number, productId: number, dto: CreateSubscriptionRequestDto2) => {
        return api.post<SubscriptionDto>(`/${NAMESPACE}`, {workspaceId, productId, dto});
    },
};
