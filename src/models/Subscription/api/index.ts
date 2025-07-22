import {
    SubscriptionDto,
    CreateSubscriptionByInvoicesRequestDto,
    CreateSubscriptionRequestDto,
    FindAllSubscriptionsQuery,
    FindOneSubscriptionQueryDto,
    UpdateSubscriptionRequestDto,
    CreateSubscriptionRequestDto2,
} from 'src/models/Subscription/types';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {downloadBlobFromAxios} from '^utils/Blob';
import {
    CreateSubscriptionSeatRequestDto,
    FindAllSubscriptionSeatQueryDto,
    SubscriptionSeatDto,
    UpdateSubscriptionSeatRequestDto,
} from '^models/SubscriptionSeat/type';
import {MergeSubscriptionRequestDto} from '^models/Subscription/types/MergeSubscription.request.dto';
import {TeamMemberDto} from '^models/TeamMember';

const NAMESPACE = 'subscriptions';

export const createSubscription = (dto: CreateSubscriptionRequestDto) => {
    return api.post<SubscriptionDto>(`/${NAMESPACE}`, dto).then(oneDtoOf(SubscriptionDto));
};

export const subscriptionApi = {
    index: (params?: FindAllSubscriptionsQuery) => {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<SubscriptionDto>>(url, {params}).then(paginatedDtoOf(SubscriptionDto));
    },

    // 구독 조회 - 결과 다운로드
    download: (params?: FindAllSubscriptionsQuery, filename?: string) => {
        const url = `/${NAMESPACE}/download/xlsx`;
        return api
            .get(url, {params, responseType: 'blob'})
            .then(downloadBlobFromAxios(`${filename || '구독 조회 - 결과 다운로드'}.xls`));
    },

    show: (id: number, params?: FindOneSubscriptionQueryDto) => {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<SubscriptionDto>(url, {params}).then(oneDtoOf(SubscriptionDto));
    },

    create: (dto: CreateSubscriptionRequestDto) => {
        return api.post<SubscriptionDto>(`/${NAMESPACE}`, dto).then(oneDtoOf(SubscriptionDto));
    },

    create2: (workspaceId: number, productId: number, dto: CreateSubscriptionRequestDto2) => {
        return api
            .post<SubscriptionDto>(`/${NAMESPACE}`, {workspaceId, productId, dto})
            .then(oneDtoOf(SubscriptionDto));
    },

    update: (id: number, data: UpdateSubscriptionRequestDto) => {
        const url = `/subscriptions/${id}`;
        return api.patch<SubscriptionDto>(url, data).then(oneDtoOf(SubscriptionDto));
    },

    // 구독 병합 (id 의 구독(본구독)에 다른 구독(게스트구독) 병합)
    merge(id: number, data: MergeSubscriptionRequestDto) {
        const url = `/subscriptions/${id}/merge`;
        return api.patch<SubscriptionDto[]>(url, data).then(listDtoOf(SubscriptionDto));
    },

    destroy: (id: number) => {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<Omit<SubscriptionDto, 'id'>>(url);
    },

    createByInvoice: (data: CreateSubscriptionByInvoicesRequestDto) => {
        const url = `/${NAMESPACE}/byInvoices`;
        return api.post<SubscriptionDto>(url, data).then(oneDtoOf(SubscriptionDto));
    },

    // [구독서비스] 구독별 운영중인 시트 API
    seatsApi: {
        index(orgId: number, subscriptionId: number, params?: FindAllSubscriptionSeatQueryDto) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats`;
            return api.get(url, {params}).then(paginatedDtoOf(SubscriptionSeatDto));
        },

        // 조건에 따른 시트 수량 조회
        count(orgId: number, subscriptionId: number, params?: FindAllSubscriptionSeatQueryDto) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats/i/count`;
            return api.get<number>(url, {params});
        },

        show(orgId: number, subscriptionId: number, id: number, params?: FindAllSubscriptionSeatQueryDto) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats/${id}`;
            return api.get(url, {params}).then(oneDtoOf(SubscriptionSeatDto));
        },

        create(orgId: number, subscriptionId: number, dto: CreateSubscriptionSeatRequestDto) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats`;
            return api.post(url, dto).then(oneDtoOf(SubscriptionSeatDto));
        },

        update(orgId: number, subscriptionId: number, id: number, dto: UpdateSubscriptionSeatRequestDto) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats/${id}`;
            return api.patch(url, dto).then(oneDtoOf(SubscriptionSeatDto));
        },

        destroy(orgId: number, subscriptionId: number, id: number) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats/${id}`;
            return api.delete(url).then(oneDtoOf(SubscriptionSeatDto));
        },

        destroyAll(orgId: number, subscriptionId: number, ids: number[]) {
            const controllerPath = `/organization/${orgId}/subscriptions/${subscriptionId}`;
            const url = `${controllerPath}/seats`;
            return api.delete(url, {params: {ids}});
        },
    },
};
