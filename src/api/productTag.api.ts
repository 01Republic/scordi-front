import {ProductTagDto, FindAllProductTagQuery} from '^types/productTag.type';
import {api} from '^api/api';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'tags';

export const getProductTags = (params: FindAllProductTagQuery) => {
    return api.get<Paginated<ProductTagDto>>(`/${NAMESPACE}`, {params});
};
