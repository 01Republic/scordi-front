import {api} from '^api/api';
import {
    ApplicationPrototypeDto,
    ApplyToAddDto,
    CreateApplicationPrototypeRequestDto,
    FindAllAppPrototypeQuery,
    UpdateApplicationPrototypeRequestDto,
} from '^types/applicationPrototype.type';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'application_prototypes';

export const getApplicationPrototypes = (params?: FindAllAppPrototypeQuery) => {
    return api.get<Paginated<ApplicationPrototypeDto>>(`/${NAMESPACE}`, {params});
};

export const getApplicationPrototype = (id: number) => {
    return api.get<ApplicationPrototypeDto>(`/${NAMESPACE}/${id}`);
};

export const createApplicationPrototype = (data: CreateApplicationPrototypeRequestDto) => {
    return api.post<ApplicationPrototypeDto>(`/${NAMESPACE}`, data, {
        headers: {'Content-Type': 'multipart/form-data'},
    });
};

export const updateApplicationPrototype = (id: number, data: UpdateApplicationPrototypeRequestDto) => {
    return api.patch<ApplicationPrototypeDto>(`/${NAMESPACE}/${id}`, data, {
        headers: {'Content-Type': 'multipart/form-data'},
    });
};

export const deleteApplicationPrototype = (id: number) => {
    return api.delete<null>(`/${NAMESPACE}/${id}`);
};

export const getApplicationPrototypeRecommend = () => {
    return api.get<Paginated<ApplicationPrototypeDto>>(`/${NAMESPACE}/recommend`);
};

export const applyNewApplicationPrototype = (data: ApplyToAddDto) => {
    return api.post(`${NAMESPACE}/applies/add`, data);
};

export const applyApplicationPrototypeAddedAlert = (prototypeId: number) => {
    return api.post<boolean>(`${NAMESPACE}/${prototypeId}/added-alerts`);
};

export const applicationPrototypeApi = {
    index(params?: FindAllAppPrototypeQuery) {
        const url = `/${NAMESPACE}`;
        return api.get<Paginated<ApplicationPrototypeDto>>(url, {params});
    },

    show(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.get<ApplicationPrototypeDto>(url);
    },

    create(data: CreateApplicationPrototypeRequestDto) {
        const url = `/${NAMESPACE}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.tagIds) body.tagIds = data.tagIds.join(',');
        return api.post<ApplicationPrototypeDto>(url, body, {headers});
    },

    update(id: number, data: UpdateApplicationPrototypeRequestDto) {
        const url = `/${NAMESPACE}/${id}`;
        const headers = {'Content-Type': 'multipart/form-data'};
        const body = {...data};
        // @ts-ignore
        if (data.tagIds) body.tagIds = data.tagIds.join(',');
        return api.patch<ApplicationPrototypeDto>(url, body, {headers});
    },

    destroy(id: number) {
        const url = `/${NAMESPACE}/${id}`;
        return api.delete<ApplicationPrototypeDto>(url);
    },
};
