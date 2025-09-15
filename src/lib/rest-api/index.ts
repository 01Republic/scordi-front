import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {FindAllScordiPlanQueryDto, ScordiPlanDto} from '^models/_scordi/ScordiPlan/type';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {ClassConstructor} from 'class-transformer';
import {PartialType} from '^types/utils/partial-type';

interface RestApiConfig<
    Dto,
    Query extends FindAllQueryDto<Dto> = FindAllQueryDto<Dto>,
    CreateDto extends object = object,
    UpdateDto extends Partial<CreateDto> = Partial<CreateDto>,
> {
    basePath: string;
    DtoClass: ClassConstructor<Dto>;
    QueryClass?: ClassConstructor<Query>;
    CreateDtoClass: ClassConstructor<CreateDto>;
    UpdateDtoClass?: ClassConstructor<UpdateDto>;
}

export function restApi<
    Dto,
    Query extends FindAllQueryDto<Dto> = FindAllQueryDto<Dto>,
    CreateDto extends object = object,
    UpdateDto extends Partial<CreateDto> = Partial<CreateDto>,
>(config: RestApiConfig<Dto, Query, CreateDto, UpdateDto>) {
    return {
        index(params?: Query) {
            const url = `${config.basePath}`;
            return api.get(url, {params}).then(paginatedDtoOf(config.DtoClass));
        },

        show(id: number) {
            const url = `${config.basePath}/${id}`;
            return api.get(url).then(oneDtoOf(config.DtoClass));
        },

        create(dto: CreateDto) {
            const url = `${config.basePath}`;
            return api.post(url, dto).then(oneDtoOf(config.DtoClass));
        },

        update(id: number, dto: UpdateDto) {
            const url = `${config.basePath}/${id}`;
            return api.patch(url, dto).then(oneDtoOf(config.DtoClass));
        },

        destroy(id: number) {
            const url = `${config.basePath}/${id}`;
            return api.delete(url).then(oneDtoOf(config.DtoClass));
        },
    };
}
