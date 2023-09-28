import {api} from '^api/api';
import {
    ProductDto,
    ApplyToAddDto,
    CreateProductRequestDto,
    FindAllProductQuery,
    UpdateProductRequestDto,
} from '^types/product.type';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

const NAMESPACE = 'products';

export const getProducts = (params?: FindAllProductQuery) => {
    return api.get<Paginated<ProductDto>>(`/${NAMESPACE}`, {params}).then(paginatedDtoOf(ProductDto));
};

export const getProduct = (id: number) => {
    return api.get<ProductDto>(`/${NAMESPACE}/${id}`).then(oneDtoOf(ProductDto));
};

export const createProduct = (data: CreateProductRequestDto) => {
    return api
        .post<ProductDto>(`/${NAMESPACE}`, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(oneDtoOf(ProductDto));
};

export const updateProduct = (id: number, data: UpdateProductRequestDto) => {
    return api
        .patch<ProductDto>(`/${NAMESPACE}/${id}`, data, {
            headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(oneDtoOf(ProductDto));
};

export const deleteProduct = (id: number) => {
    return api.delete<null>(`/${NAMESPACE}/${id}`);
};

export const getProductRecommend = () => {
    return api.get<Paginated<ProductDto>>(`/${NAMESPACE}/recommend`);
};

export const applyNewProduct = (data: ApplyToAddDto) => {
    return api.post(`${NAMESPACE}/applies/add`, data);
};

export const applyProductAddedAlert = (prototypeId: number) => {
    return api.post<boolean>(`${NAMESPACE}/${prototypeId}/added-alerts`);
};

export const productApi = {
    index(params?: FindAllProductQuery) {
        const url = `/${NAMESPACE}`;
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
};
