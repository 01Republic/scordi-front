import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {
    CodefBankAccountParserDto,
    CreateCodefBankAccountParserRequestDto,
    UpdateCodefBankAccountParserRequestDto,
} from './type';

export const adminCodefBankAccountParserApi = {
    index(params: FindAllQueryDto<CodefBankAccountParserDto>) {
        const url = `/admin/codef-bank-account-parsers`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefBankAccountParserDto));
    },

    migration(codefCardParserId: number) {
        const url = `/admin/codef-bank-account-parsers/r/${codefCardParserId}`;
        return api.post(url).then(oneDtoOf(CodefBankAccountParserDto));
    },

    create(dto: CreateCodefBankAccountParserRequestDto) {
        const url = `/admin/codef-bank-account-parsers`;
        return api.post(url, dto).then(oneDtoOf(CodefBankAccountParserDto));
    },

    clone(id: number) {
        const url = `/admin/codef-bank-account-parsers/${id}/clone`;
        return api.post(url).then(oneDtoOf(CodefBankAccountParserDto));
    },

    show(id: number) {
        const url = `/admin/codef-bank-account-parsers/${id}`;
        return api.get(url).then(oneDtoOf(CodefBankAccountParserDto));
    },

    update(id: number, dto: UpdateCodefBankAccountParserRequestDto) {
        const url = `/admin/codef-bank-account-parsers/${id}`;
        return api.patch(url, dto).then(oneDtoOf(CodefBankAccountParserDto));
    },

    toggleActive(id: number) {
        const url = `/admin/codef-card-parsers/${id}/toggleActive`;
        return api.patch(url).then(oneDtoOf(CodefBankAccountParserDto));
    },

    destroy(id: number) {
        const url = `/admin/codef-bank-account-parsers/${id}`;
        return api.delete(url).then(oneDtoOf(CodefBankAccountParserDto));
    },
};
