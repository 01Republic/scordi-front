import {api} from '^api/api';
import {
    CreateMembershipInviteDto,
    CreateMembershipRequestDto,
    FindAllMembershipQuery,
    MembershipDto,
    UpdateMembershipRequestDto,
} from 'src/models/Membership/types';
import {Paginated} from '^types/utils/paginated.dto';

const NAMESPACE = 'memberships';

export const membershipApi = {
    index(params: FindAllMembershipQuery) {
        return api.get<Paginated<MembershipDto>>(`/${NAMESPACE}`, {params});
    },

    create(data: CreateMembershipRequestDto) {
        return api.post<MembershipDto>(`/${NAMESPACE}`, data);
    },

    update(id: number, data: UpdateMembershipRequestDto) {
        return api.patch<MembershipDto>(`/${NAMESPACE}/${id}`, data);
    },

    destroy(id: number) {
        return api.delete<MembershipDto>(`${NAMESPACE}/${id}`);
    },
};

export const inviteMembershipApi = {
    index(orgId: number, email: string) {
        return api.get<MembershipDto>(`/${NAMESPACE}/invite/validate?orgId=${orgId}&email=${email}`);
    },

    create(data: CreateMembershipInviteDto) {
        return api.post<MembershipDto>(`/${NAMESPACE}/invite`, data);
    },

    confirm(id: number) {
        return api.patch<MembershipDto>(`/${NAMESPACE}/${id}/invite/confirm`);
    },
};
