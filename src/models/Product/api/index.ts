import {api} from '^api/api';
import {
    ProductDto,
    ApplyToAddDto,
    CreateProductRequestDto,
    FindAllProductQuery,
    UpdateProductRequestDto,
} from '^models/Product/type';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {plainToInstance} from 'class-transformer';

const NAMESPACE = 'products';

export const productApi = {
    index(params?: FindAllProductQuery) {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<ProductDto>>(url, {params}).then(paginatedDtoOf(ProductDto));
    },

    sortBySubscription(organizationId: number, params?: FindAllProductQuery) {
        const url = `/${NAMESPACE}/sort-by-subscription/${organizationId}`;
        return api.get<Paginated<ProductDto>>(url, {params}).then(paginatedDtoOf(ProductDto));
    },

    show(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<ProductDto>(url).then(oneDtoOf(ProductDto));
    },

    create(data: CreateProductRequestDto) {
        const url = `/${NAMESPACE}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.tagIds) body.tagIds = data.tagIds.join(',');
        return api.post<ProductDto>(url, body, {headers}).then(oneDtoOf(ProductDto));
    },

    update(id: number, data: UpdateProductRequestDto) {
        const url = `/${NAMESPACE}/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.tagIds) body.tagIds = data.tagIds.join(',');
        return api.patch<ProductDto>(url, body, {headers}).then(oneDtoOf(ProductDto));
    },

    destroy(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<ProductDto>(url).then(oneDtoOf(ProductDto));
    },

    recommend() {
        const url = `/${NAMESPACE}/recommend`;
        return api.get<Paginated<ProductDto>>(url);
    },

    apply(data: ApplyToAddDto) {
        const url = `/${NAMESPACE}/applies/add`;
        return api.post(url, data);
    },

    alert(prototypeId: number) {
        const url = `${NAMESPACE}/${prototypeId}/added-alerts`;
        return api.post<boolean>(url);
    },
};
