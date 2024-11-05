import {api} from '^api/api';
import {
    CreateMembershipInviteDto,
    CreateMembershipRequestDto,
    FindAllMembershipQuery,
    MembershipDto,
    UpdateMembershipRequestDto,
    UpdateMyMembershipRequestDto,
} from 'src/models/Membership/types';
import {Paginated} from '^types/utils/paginated.dto';
import {oneDtoOf} from '^types/utils/response-of';

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
    validate(orgId: number, email: string) {
        const params = {orgId, email};
        return api.get<MembershipDto>(`/${NAMESPACE}/invite/validate`, {params}).then(oneDtoOf(MembershipDto));
    },

    create(data: CreateMembershipInviteDto) {
        return api.post<MembershipDto>(`/${NAMESPACE}/invite`, data);
    },

    confirm(id: number) {
        return api.patch<MembershipDto>(`/${NAMESPACE}/${id}/invite/confirm`);
    },
};

export const myMembershipApi = {
    update(id: number, data: UpdateMyMembershipRequestDto) {
        return api.patch<MembershipDto>(`my/${NAMESPACE}/${id}`, data);
    },
};
