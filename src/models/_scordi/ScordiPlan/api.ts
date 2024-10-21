import {api} from '^api/api';
import {listDtoOf} from '^types/utils/response-of';
import {ScordiPlanDto, FindAllScordiPlanQueryDto} from './type';

export const scordiPlanApi = {
    index(params?: FindAllScordiPlanQueryDto) {
        const url = `/scordi-plans`;
        return api.get(url, {params}).then(listDtoOf(ScordiPlanDto));
    },
};
