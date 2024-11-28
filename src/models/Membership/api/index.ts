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
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

const NAMESPACE = 'memberships';

export const membershipApi = {
    index(params: FindAllMembershipQuery) {
        return api.get<Paginated<MembershipDto>>(`/${NAMESPACE}`, {params}).then(paginatedDtoOf(MembershipDto));
    },

    create(data: CreateMembershipRequestDto) {
        return api.post<MembershipDto>(`/${NAMESPACE}`, data).then(oneDtoOf(MembershipDto));
    },

    update(id: number, data: UpdateMembershipRequestDto) {
        return api.patch<MembershipDto>(`/${NAMESPACE}/${id}`, data).then(oneDtoOf(MembershipDto));
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

/**
 * [회원] My API
 */
export const myMembershipApi = {
    // 내 멤버십 조회
    index(params: FindAllMembershipQuery) {
        const url = `my/memberships`;
        return api.get(url, {params}).then(paginatedDtoOf(MembershipDto));
    },

    // 내 멤버십 상세
    show(id: number) {
        const url = `my/memberships/${id}`;
        return api.get(url).then(oneDtoOf(MembershipDto));
    },

    // 내 멤버십 생성
    create() {
        const url = `my/memberships`;
        // return api.get(url, dto)
    },

    // 내 멤버십 수정
    update(id: number, data: UpdateMyMembershipRequestDto) {
        const url = `my/memberships/${id}`;
        return api.patch(url, data).then(oneDtoOf(MembershipDto));
    },

    // 내 멤버십 삭제
    destroy(id: number) {
        const url = `my/memberships/${id}`;
        return api.delete(url).then(oneDtoOf(MembershipDto));
    },
};
