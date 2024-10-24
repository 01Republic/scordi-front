import {FindAllQueryDto} from '^types/utils/findAll.query.dto';
import {ScordiPlanDto} from './ScordiPlan.dto';

export class FindAllScordiPlanQueryDto extends FindAllQueryDto<ScordiPlanDto> {
    keyword?: string; // 검색 키워드
}
