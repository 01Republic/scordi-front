import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {
    CreateTeamInvoiceAccountDto,
    FindAllTeamInvoiceAccountQueryDto,
    TeamInvoiceAccountDto,
    UpdateTeamInvoiceAccountDto,
} from '^models/TeamInvoiceAccount/type';

export const teamInvoiceAccountApi = {
    // 팀과 인보이스계정의 연결 목록
    index(orgId: number, params?: FindAllTeamInvoiceAccountQueryDto) {
        const url = `/organizations/${orgId}/team-invoice-accounts`;
        return api.get(url, {params}).then(paginatedDtoOf(TeamInvoiceAccountDto));
    },

    // 팀과 인보이스계정의 연결 생성
    create(orgId: number, dto: CreateTeamInvoiceAccountDto) {
        const url = `/organizations/${orgId}/team-invoice-accounts`;
        return api.post(url, dto).then(oneDtoOf(TeamInvoiceAccountDto));
    },

    // // 팀과 인보이스계정의 연결 수정
    // update(orgId: number, id: number, dto: UpdateTeamInvoiceAccountDto) {
    //     const url = `/organizations/${orgId}/team-invoice-accounts/${id}`;
    //     return api.patch(url, dto).then(oneDtoOf(TeamInvoiceAccountDto));
    // },

    // 팀과 인보이스계정의 연결 삭제
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team-invoice-accounts/${id}`;
        return api.delete(url);
    },
};
