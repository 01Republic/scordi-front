import {api} from '^api/api';
import {FindAllProductSimilarNameQuery, ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {Paginated} from '^types/utils/paginated.dto';

const namespace = 'products-similar-names';
export const productSimilarNameApi = {
    index(params?: FindAllProductSimilarNameQuery) {
        const url = `${namespace}`;
        return api.get<Paginated<ProductSimilarNameDto>>(url, {params}).then(paginatedDtoOf(ProductSimilarNameDto));
    },

    destroy(id: number) {
        const url = `${namespace}/${id}`;
        return api.delete<ProductSimilarNameDto>(url).then(oneDtoOf(ProductSimilarNameDto));
    },
};
