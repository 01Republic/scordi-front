import {api} from '^api/api';
import {restApi} from '^lib/rest-api';
import {listDtoOf} from '^types/utils/response-of';
import {ScordiPlanDto, FindAllScordiPlanQueryDto, CreateScordiPlanRequestDto, UpdateScordiPlanRequestDto} from './type';
import {FindAllQueryDto} from '^types/utils/findAll.query.dto';

export const scordiPlanApi = {
    index(params?: FindAllScordiPlanQueryDto) {
        const url = `/scordi-plans`;
        return api.get(url, {params}).then(listDtoOf(ScordiPlanDto));
    },
};

export const adminScordiPlansApi = restApi({
    basePath: '/admin/scordi-plans',
    DtoClass: ScordiPlanDto,
    QueryClass: FindAllQueryDto<ScordiPlanDto>,
    CreateDtoClass: CreateScordiPlanRequestDto,
    UpdateDtoClass: UpdateScordiPlanRequestDto,
});
