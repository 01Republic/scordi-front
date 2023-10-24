import {CreditCardDto} from '^types/credit-cards.type';
import {atom} from 'recoil';

export const creditCardListAtom = atom({
    key: 'creditCardList',
    default: <CreditCardDto[]>[],
});
