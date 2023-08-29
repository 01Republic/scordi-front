import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    SyncHistoryDto,
    CreateSyncHistoryDto,
    FindAllSyncHistoryQuery,
    UpdateSyncHistoryDto,
} from '^types/subscriptionSyncHistory.type';

export const getSyncHistories = (subscriptionId: number, params?: FindAllSyncHistoryQuery) => {
    return api.get<Paginated<SyncHistoryDto>>(`/subscriptions/${subscriptionId}/sync-histories`, {params});
};

export const getSyncHistory = (subscriptionId: number, id: number) => {
    return api.get<SyncHistoryDto>(`/subscriptions/${subscriptionId}/sync-histories/${id}`);
};

// Sync now / Restart sync
export const createSyncHistory = (subscriptionId: number, data: CreateSyncHistoryDto) => {
    return api.post<SyncHistoryDto>(`/subscriptions/${subscriptionId}/sync-histories`, data);
};

export const updateSyncHistory = (subscriptionId: number, id: number, data: UpdateSyncHistoryDto) => {
    return api.patch<SyncHistoryDto>(`/subscriptions/${subscriptionId}/sync-histories/${id}`, data);
};

export const deleteSyncHistory = (subscriptionId: number, id: number) => {
    return api.delete<SyncHistoryDto>(`/subscriptions/${subscriptionId}/sync-histories/${id}`);
};
