import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {
    CreateNotificationTemplateRequestDto,
    NotificationTemplateDto,
    UpdateNotificationTemplateRequestDto,
} from '^models/_notification/NotificationTemplate/types';
import {api} from '^api/api';
import {listDtoOf, oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

/**
 * [알림] 알림 템플릿 API
 */
export const adminNotificationTemplatesApi = {
    /** 알림 템플릿 조회 */
    index(params?: FindAllQueryDto<NotificationTemplateDto>) {
        const url = `/admin/notification-templates`;
        return api.get(url, {params}).then(paginatedDtoOf(NotificationTemplateDto));
    },

    /** 상세 */
    show(id: number) {
        const url = `/admin/notification-templates/${id}`;
        return api.get(url).then(oneDtoOf(NotificationTemplateDto));
    },

    /** 추가 */
    create(dto: CreateNotificationTemplateRequestDto) {
        const url = `/admin/notification-templates`;
        return api.post(url, dto).then(oneDtoOf(NotificationTemplateDto));
    },

    /** 수정 */
    update(id: number, dto: UpdateNotificationTemplateRequestDto) {
        const url = `/admin/notification-templates/${id}`;
        return api.patch(url, dto).then(oneDtoOf(NotificationTemplateDto));
    },

    /** 삭제 */
    destroy(id: number) {
        const url = `/admin/notification-templates/${id}`;
        return api.delete(url).then(oneDtoOf(NotificationTemplateDto));
    },

    /** Bulk 수정 */
    updateAll(params: FindAllQueryDto<NotificationTemplateDto>, dto: UpdateNotificationTemplateRequestDto) {
        const url = `/admin/notification-templates`;
        return api.patch(url, dto, {params}).then(listDtoOf(NotificationTemplateDto));
    },

    /** Bulk 삭제 */
    destroyAll(params: FindAllQueryDto<NotificationTemplateDto>) {
        const url = `/admin/notification-templates`;
        return api.delete(url, {params}).then(listDtoOf(NotificationTemplateDto));
    },
};
