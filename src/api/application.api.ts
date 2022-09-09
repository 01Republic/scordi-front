import {
  ApplicationDto,
  CreateApplicationRequestDto,
  FindAllAppsQuery,
  UpdateApplicationRequestDto,
} from '^types/application.type';
import { api } from '^api/api';
import { Paginated } from '^types/utils/paginated.dto';

const NAMESPACE = 'applications';

export const getApplications = (params: FindAllAppsQuery) => {
  return api.get<Paginated<ApplicationDto>>(`/${NAMESPACE}`, { params });
};

export const getApplication = (id: number) => {
  return api.get<ApplicationDto>(`/${NAMESPACE}/${id}`);
};

export const createApplication = (dto: CreateApplicationRequestDto) => {
  return api.post<ApplicationDto>(`/${NAMESPACE}`, dto);
};

export const updateApplication = (id: number, dto: UpdateApplicationRequestDto) => {
  return api.patch<ApplicationDto>(`/${NAMESPACE}/${id}`, dto);
};

export const destroyApplication = (id: number) => {
  return api.delete<Omit<ApplicationDto, 'id'>>(`/${NAMESPACE}/${id}`);
}
