import {ApplicationTagDto, FindAllAppTagQuery} from '^types/applicationTag.type';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'application_tags';

export const getApplicationTags = (params: FindAllAppTagQuery) => {
    return api.get<Paginated<ApplicationTagDto>>(`/${NAMESPACE}`, {params});
};
