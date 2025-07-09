import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    FindAllProductSimilarNameQuery,
    ProductSimilarNameDto,
    CreateProductSimilarNameRequestDto,
    UpdateProductSimilarNameRequestDto,
} from '../type';

export const productSimilarNameApi = {
    index(params?: FindAllProductSimilarNameQuery) {
        const url = `/products-similar-names`;
        return api.get(url, {params}).then(paginatedDtoOf(ProductSimilarNameDto));
    },

    create(data: CreateProductSimilarNameRequestDto) {
        const url = `/products-similar-names`;
        return api.post(url, data).then(oneDtoOf(ProductSimilarNameDto));
    },

    update(id: number, data: UpdateProductSimilarNameRequestDto) {
        const url = `/products-similar-names/${id}`;
        return api.patch(url, data).then(oneDtoOf(ProductSimilarNameDto));
    },

    destroy(id: number) {
        const url = `/products-similar-names/${id}`;
        return api.delete(url).then(oneDtoOf(ProductSimilarNameDto));
    },
};
