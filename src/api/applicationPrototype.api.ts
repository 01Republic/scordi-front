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
