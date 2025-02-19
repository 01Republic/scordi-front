import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {Paginated} from '^types/utils/paginated.dto';
import {CreateCreditCardDto, CreditCardDto, FindAllCreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/type';
import {FindAllTeamQueryDto, TeamDto} from '^models/Team/type';
import {TeamCreditCardDto} from '^models/TeamCreditCard/type/TeamCreditCard.dto';

const NAMESPACE = 'organizations';

export const creditCardApi = {
    index(orgId: number, params?: FindAllCreditCardDto) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards`;
        return api.get<Paginated<CreditCardDto>>(url, {params}).then(paginatedDtoOf(CreditCardDto));
    },

    show(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards/${id}`;
        return api.get<CreditCardDto>(url).then(oneDtoOf(CreditCardDto));
    },

    create(orgId: number, data: CreateCreditCardDto) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards`;
        return api.post<CreditCardDto>(url, data).then(oneDtoOf(CreditCardDto));
    },

    update(orgId: number, id: number, data: UpdateCreditCardDto) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards/${id}`;
        return api.patch<CreditCardDto>(url, data).then(oneDtoOf(CreditCardDto));
    },

    // 카드 병합
    // id 의 카드(본카드)를 hostCardId 의 카드(호스트카드)에 병합
    mergeCard(orgId: number, id: number, hostCardId: number) {
        const url = `/organizations/${orgId}/credit-cards/${id}/mergeCard/${hostCardId}`;
        return api.patch(url);
    },

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards/${id}`;
        return api.delete<CreditCardDto>(url);
    },

    teamsApi: {
        // 카드에 연결된 팀 목록
        index(cardId: number, params?: FindAllTeamQueryDto) {
            const url = `/credit-cards/${cardId}/teams`;
            return api.get(url, {params}).then(paginatedDtoOf(TeamDto));
        },

        // 카드에 팀 연결
        create(cardId: number, teamId: number) {
            const url = `/credit-cards/${cardId}/teams/${teamId}`;
            return api.post(url).then(oneDtoOf(TeamCreditCardDto));
        },

        // 카드에 팀 연결 해제
        destroy(cardId: number, teamId: number) {
            const url = `/credit-cards/${cardId}/teams/${teamId}`;
            return api.delete<void>(url);
        },
    },
};
