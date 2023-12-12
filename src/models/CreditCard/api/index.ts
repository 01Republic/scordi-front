import {Paginated} from '^types/utils/paginated.dto';
import {api} from '^api/api';
import {oneDtoOf, paginatedDtoOf} from '^types/utils/response-of';
import {CreateCreditCardDto, CreditCardDto, FindAllCreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/type';

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

    destroy(orgId: number, id: number) {
        const url = `/${NAMESPACE}/${orgId}/credit-cards/${id}`;
        return api.delete<CreditCardDto>(url);
    },
};
