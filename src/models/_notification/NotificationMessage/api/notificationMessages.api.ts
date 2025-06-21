import {
    CreateNotificationMessageRequestDto,
    FindAllNotificationMessagesQueryDto,
    NotificationMessageDto,
    UpdateNotificationMessageRequestDto,
} from '^models/_notification/NotificationMessage/types';
import {api} from '^api/api';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

/**
 * [알림] 알림 메세지 API
 */
export const notificationMessagesApi = {
    /**
     * 목록 (워크스페이스 알림 조회)
     * - ex. 워크스페이스 알림 드롭다운
     */
    index(orgId: number, params: FindAllNotificationMessagesQueryDto) {
        const url = `/organizations/${orgId}/notification-messages`;
        return api.get(url, {params}).then(paginatedDtoOf(NotificationMessageDto));
    },

    /** 읽지않은 메세지 수 조회 */
    unreadCount(orgId: number) {
        const url = `/organizations/${orgId}/notification-messages/count-by/unread`;
        return api.get<number>(url);
    },

    /** 상세 */
    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/notification-messages/${id}`;
        return api.get(url).then(oneDtoOf(NotificationMessageDto));
    },

    /** 추가 */
    create(orgId: number, dto: CreateNotificationMessageRequestDto) {
        const url = `/organizations/${orgId}/notification-messages`;
        return api.post(url, dto).then(oneDtoOf(NotificationMessageDto));
    },

    /**
     * 수정
     * - 알림 읽음처리
     */
    update(orgId: number, id: number, dto: UpdateNotificationMessageRequestDto) {
        const url = `/organizations/${orgId}/notification-messages/${id}`;
        return api.patch(url, dto).then(oneDtoOf(NotificationMessageDto));
    },

    /**
     * Bulk 수정
     * - 알림 읽음처리
     */
    updateAll(orgId: number, params: FindAllNotificationMessagesQueryDto, dto: UpdateNotificationMessageRequestDto) {
        const url = `/organizations/${orgId}/notification-messages`;
        return api.patch(url, dto, {params}).then(listDtoOf(NotificationMessageDto));
    },

    /**
     * 삭제
     * - 알림 지우기
     */
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/notification-messages/${id}`;
        return api.delete(url).then(oneDtoOf(NotificationMessageDto));
    },
};
