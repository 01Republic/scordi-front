import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {UpdateCodefParserDto} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefCardParserDto} from './type/CodefCardParser.dto';
import {CreateCodefCardParserRequestDto} from './type/CreateCodefCardParser.request.dto';
import {UpdateCodefCardParserRequestDto} from './type/UpdateCodefCardParser.request.dto';

export const adminCodefCardParserApi = {
    index(params: FindAllQueryDto<CodefCardParserDto>) {
        const url = `/admin/codef-card-parsers`;
        return api.get(url, {params}).then(paginatedDtoOf(CodefCardParserDto));
    },

    migration(serviceName: string, dto?: UpdateCodefParserDto) {
        const url = `/admin/codef-card-parsers/r/${serviceName}`;
        return api.post(url, dto).then(oneDtoOf(CodefCardParserDto));
    },

    create(dto: CreateCodefCardParserRequestDto) {
        const url = `/admin/codef-card-parsers`;
        return api.post(url, dto).then(oneDtoOf(CodefCardParserDto));
    },

    show(id: number) {
        const url = `/admin/codef-card-parsers/${id}`;
        return api.get(url).then(oneDtoOf(CodefCardParserDto));
    },

    update(id: number, dto: UpdateCodefCardParserRequestDto) {
        const url = `/admin/codef-card-parsers/${id}`;
        return api.patch(url, dto).then(oneDtoOf(CodefCardParserDto));
    },

    toggleActive(id: number) {
        const url = `/admin/codef-card-parsers/${id}/toggleActive`;
        return api.patch(url).then(oneDtoOf(CodefCardParserDto));
    },

    destroy(id: number) {
        const url = `/admin/codef-card-parsers/${id}`;
        return api.delete(url).then(oneDtoOf(CodefCardParserDto));
    },
};
