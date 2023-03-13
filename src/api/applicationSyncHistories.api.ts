import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';
import {
    SyncHistoryDto,
    CreateSyncHistoryDto,
    FindAllSyncHistoryQuery,
    UpdateSyncHistoryDto,
} from '^types/applicationSyncHistory.type';

export const getSyncHistories = (applicationId: number, params?: FindAllSyncHistoryQuery) => {
    return api.get<Paginated<SyncHistoryDto>>(`/applications/${applicationId}/sync-histories`, {params});
};

export const getSyncHistory = (applicationId: number, id: number) => {
    return api.get<SyncHistoryDto>(`/applications/${applicationId}/sync-histories/${id}`);
};

// Sync now / Restart sync
export const createSyncHistory = (applicationId: number, data: CreateSyncHistoryDto) => {
    return api.post<SyncHistoryDto>(`/applications/${applicationId}/sync-histories`, data);
};

export const updateSyncHistory = (applicationId: number, id: number, data: UpdateSyncHistoryDto) => {
    return api.patch<SyncHistoryDto>(`/applications/${applicationId}/sync-histories/${id}`, data);
};

export const deleteSyncHistory = (applicationId: number, id: number) => {
    return api.delete<SyncHistoryDto>(`/applications/${applicationId}/sync-histories/${id}`);
};
