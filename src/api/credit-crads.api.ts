import {Paginated} from '^types/utils/paginated.dto';
import {api} from './api';
import {CreditCardDto} from '^types/credit-cards.type';
import {paginatedDtoOf} from '^types/utils/response-of';

export const getCreditCards = (orgId: number) => {
    return api
        .get<Paginated<CreditCardDto>>(`/organizations/${orgId}/credit-cards`)
        .then(paginatedDtoOf(CreditCardDto));
};
