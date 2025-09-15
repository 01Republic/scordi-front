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

/**
 * 주어진 설정으로 타입 안전한 CRUD REST API 클라이언트를 생성한다.
 *
 * config.basePath를 기준으로 HTTP 요청(path: GET/POST/PATCH/DELETE)을 수행하고,
 * 응답은 제공된 DtoClass로 변환하여 반환한다.
 *
 * 중요한 동작:
 * - index(params?) : GET basePath, 페이징된 결과를 DtoClass 인스턴스로 매핑하여 반환
 * - show(id)       : GET basePath/:id, 단일 DtoClass 인스턴스 반환
 * - create(dto)    : POST basePath, 생성된 리소스를 DtoClass 인스턴스로 반환
 * - update(id,dto) : PATCH basePath/:id, 업데이트된 리소스를 DtoClass 인스턴스로 반환
 * - destroy(id)    : DELETE basePath/:id, 삭제된(또는 관련) 리소스를 DtoClass 인스턴스로 반환
 *
 * 모든 메서드는 내부적으로 중앙 api 클라이언트를 사용하며, 네트워크/응답 오류는 호출자에게 그대로 전파된다.
 *
 * @param config - REST 클라이언트 구성. 최소한 basePath와 응답 매핑에 사용할 `DtoClass`를 포함해야 함.
 */
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
