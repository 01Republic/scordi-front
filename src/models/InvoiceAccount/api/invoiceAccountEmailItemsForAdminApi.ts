import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllGmailItemQueryDto, GmailItemDto, UpdateGmailItemRequestDto} from '../type';

// [어드민] 인보이스 계정 이메일 내역 API
export const invoiceAccountEmailItemsForAdminApi = {
    // 이메일 목록
    index(params: FindAllGmailItemQueryDto) {
        const url = `/admin/gmail_items`;
        return api.get(url, {params}).then(paginatedDtoOf(GmailItemDto));
    },

    // 이메일 상세
    show(mailId: string) {
        const url = `/admin/gmail_items/${mailId}`;
        return api.get(url).then(oneDtoOf(GmailItemDto));
    },

    // 이메일 수정
    update(mailId: string, dto: UpdateGmailItemRequestDto) {
        const url = `/admin/gmail_items/${mailId}`;
        return api.patch(url, dto).then(oneDtoOf(GmailItemDto));
    },

    // 이메일 삭제
    destroy(mailId: string) {
        const url = `/admin/gmail_items/${mailId}`;
        return api.delete(url).then(oneDtoOf(GmailItemDto));
    },
};
