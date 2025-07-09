import {api} from '^api/api';
import {FindAllProductSimilarNameQuery, ProductSimilarNameDto} from '^models/ProductSimilarName/type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {Paginated} from '^types/utils/paginated.dto';
import {CreateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type/CreateProductSimilarName.request.dto';
import {UpdateProductSimilarNameRequestDto} from '^models/ProductSimilarName/type/UpdateProductSimilarName.request.dto';

const namespace = 'products-similar-names';
export const productSimilarNameApi = {
    create(data: CreateProductSimilarNameRequestDto) {
        const url = `/${namespace}`;
        return api.post<ProductSimilarNameDto>(url, data).then(oneDtoOf(ProductSimilarNameDto));
    },

    index(params?: FindAllProductSimilarNameQuery) {
        const url = `${namespace}`;
        return api.get<Paginated<ProductSimilarNameDto>>(url, {params}).then(paginatedDtoOf(ProductSimilarNameDto));
    },

    update(id: number, data: UpdateProductSimilarNameRequestDto) {
        const url = `${namespace}/${id}`;
        return api.patch<ProductSimilarNameDto>(url, data).then(oneDtoOf(ProductSimilarNameDto));
    },

    destroy(id: number) {
        const url = `${namespace}/${id}`;
        return api.delete<ProductSimilarNameDto>(url).then(oneDtoOf(ProductSimilarNameDto));
    },
};
