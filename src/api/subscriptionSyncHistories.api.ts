import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    SyncHistoryDto,
    CreateSyncHistoryDto,
    FindAllSyncHistoryQuery,
    UpdateSyncHistoryDto,
} from '^types/subscriptionSyncHistory.type';

const NAMESPACE = 'subscriptions';

export const syncHistory = {
    index: (subscriptionId: number, params?: FindAllSyncHistoryQuery) => {
        const url = `/${NAMESPACE}/${subscriptionId}/sync-histories`;
        return api.get<Paginated<SyncHistoryDto>>(url, {params});
    },

    show: (subscriptionId: number, id: number) => {
        const url = `/${NAMESPACE}/${subscriptionId}/sync-histories/${id}`;
        return api.get<SyncHistoryDto>(url);
    },

    // Sync now / Restart sync
    create: (subscriptionId: number, data: CreateSyncHistoryDto) => {
        const url = `/${NAMESPACE}/${subscriptionId}/sync-histories`;
        return api.post<SyncHistoryDto>(url, data);
    },

    update: (subscriptionId: number, id: number, data: UpdateSyncHistoryDto) => {
        const url = `/${NAMESPACE}/${subscriptionId}/sync-histories/${id}`;
        return api.patch<SyncHistoryDto>(url, data);
    },

    destroy: (subscriptionId: number, id: number) => {
        const url = `/${NAMESPACE}/${subscriptionId}/sync-histories/${id}`;
        return api.delete<SyncHistoryDto>(url);
    },
};
