import {api} from '^api/api';
import {
    CreateMembershipRequestDto,
    FindAllMembershipQuery,
    MembershipDto,
    UpdateMembershipRequestDto,
} from '^types/membership.type';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'memberships';

export const createMembership = (data: CreateMembershipRequestDto) => {
    return api.post<MembershipDto>(`/${NAMESPACE}`, data);
};

export const getMemberships = (params: FindAllMembershipQuery) => {
    return api.get<Paginated<MembershipDto>>(`/${NAMESPACE}`, {params});
};

export const patchMemberships = (data: UpdateMembershipRequestDto, id: number) => {
    return api.patch<MembershipDto>(`/${NAMESPACE}/${id}`, data);
};
