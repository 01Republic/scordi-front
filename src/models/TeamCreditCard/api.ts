import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CreateTeamCreditCardDto, FindAllTeamCreditCardQueryDto, TeamCreditCardDto} from '^models/TeamCreditCard/type';

export const teamCreditCardApi = {
    // 팀과 카드의 연결 목록
    index(orgId: number, params?: FindAllTeamCreditCardQueryDto) {
        const url = `/organizations/${orgId}/team-credit-cards`;
        return api.get(url, {params}).then(paginatedDtoOf(TeamCreditCardDto));
    },

    // 팀과 카드의 연결 생성
    create(orgId: number, dto: CreateTeamCreditCardDto) {
        const url = `/organizations/${orgId}/team-credit-cards`;
        return api.post(url, dto).then(oneDtoOf(TeamCreditCardDto));
    },

    // 팀과 카드의 연결 삭제
    destroy(orgId: number, id: number) {
        const url = `/organizations/${orgId}/team-credit-cards/${id}`;
        return api.delete(url);
    },
};
