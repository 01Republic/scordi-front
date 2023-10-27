import {UpdateCreditCardDto} from './../types/credit-cards.type';
import {Paginated} from '^types/utils/paginated.dto';
import {api} from './api';
import {CreateCreditCardDto, CreditCardDto} from '^types/credit-cards.type';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';

export const creditCardApi = {
    index(orgId: number) {
        const url = `/organizations/${orgId}/credit-cards`;
        return api.get<Paginated<CreditCardDto>>(url).then(paginatedDtoOf(CreditCardDto));
    },

    show(orgId: number, id: number) {
        const url = `/organizations/${orgId}/credit-cards/${id}`;
        return api.get<CreditCardDto>(url);
    },

    create(orgId: number, data: CreateCreditCardDto) {
        const url = `/organizations/${orgId}/credit-cards`;
        return api.post<CreditCardDto>(url, data).then(oneDtoOf(CreditCardDto));
    },

    update(orgId: number, id: number, data: UpdateCreditCardDto) {
        const url = `/organizations/${orgId}/credit-cards/${id}`;
        return api.patch<CreditCardDto>(url, data).then(oneDtoOf(CreditCardDto));
    },

    destory(orgId: number, id: number) {
        const url = `/organizations/${orgId}/credit-cards/${id}`;
        return api.delete<CreditCardDto>(url);
    },
};
