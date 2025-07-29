import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {CreateEmailParserRequestDto, EmailParserDto, UpdateEmailParserRequestDto} from '^models/EmailParser/types';

export const gmailInvoiceParsersAdminApi = {
    index(params: FindAllQueryDto<EmailParserDto>) {
        const url = `/admin/gmail/invoice-email-parsers`;
        return api.get(url, {params}).then(paginatedDtoOf(EmailParserDto));
    },

    show(id: number) {
        const url = `/admin/gmail/invoice-email-parsers/${id}`;
        return api.get(url).then(oneDtoOf(EmailParserDto));
    },

    create(dto: CreateEmailParserRequestDto) {
        const url = `/admin/gmail/invoice-email-parsers`;
        return api.post(url, dto).then(oneDtoOf(EmailParserDto));
    },

    update(id: number, dto: UpdateEmailParserRequestDto) {
        const url = `/admin/gmail/invoice-email-parsers/${id}`;
        return api.patch(url, dto).then(oneDtoOf(EmailParserDto));
    },

    toggleActive(id: number) {
        const url = `/admin/gmail/invoice-email-parsers/${id}/toggleActive`;
        return api.patch(url).then(oneDtoOf(EmailParserDto));
    },

    destroy(id: number) {
        const url = `/admin/gmail/invoice-email-parsers/${id}`;
        return api.delete(url).then(oneDtoOf(EmailParserDto));
    },
};
