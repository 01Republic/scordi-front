import { api } from '^api/api';
import { ApplicationPrototypeDto, FindAllAppPrototypeQuery } from '^types/applicationPrototype.type';
import { Paginated } from '^types/utils/paginated.dto';

const NAMESPACE = 'application_prototypes';

export const getApplicationPrototypes = (params: FindAllAppPrototypeQuery) => {
  return api.get<Paginated<ApplicationPrototypeDto>>(`/${NAMESPACE}`, { params });
};

export const getApplicationPrototype = (id: number) => {
  return api.get<ApplicationPrototypeDto>(`/${NAMESPACE}/${id}`);
};
