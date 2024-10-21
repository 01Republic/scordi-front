import {api} from '^api/api';
import {listDtoOf} from '^types/utils/response-of';
import {ScordiPlanDto} from './type';

export const scordiPlanApi = {
    index() {
        const url = `/scordi-plans`;
        return api.get(url).then(listDtoOf(ScordiPlanDto));
    },
};
