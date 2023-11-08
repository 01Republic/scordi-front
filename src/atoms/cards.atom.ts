import {atom} from 'recoil';
import {Paginated} from '^types/utils/paginated.dto';
import {CreditCardDto} from '^models/CreditCard/credit-cards.type';

export const cardListResultAtom = atom<Paginated<CreditCardDto>>({
    key: 'cardListResultAtom',
    default: {
        items: [],
        pagination: {
            totalItemCount: 0,
            currentItemCount: 0,
            totalPage: 1,
            currentPage: 1,
            itemsPerPage: 30,
        },
    },
});
