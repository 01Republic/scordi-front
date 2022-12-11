import {api} from '^api/api';
import {CreateMembershipRequestDto, FindAllMembershipQuery, MembershipDto} from '^types/membership.type';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'memberships';

export const createMembership = (data: CreateMembershipRequestDto) => {
    return api.post<MembershipDto>(`/${NAMESPACE}`, data);
};

export const getMemberships = (params: FindAllMembershipQuery) => {
    return api.get<Paginated<MembershipDto>>(`/${NAMESPACE}`, {params});
};
