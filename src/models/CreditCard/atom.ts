import {atom} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo} from '^models/CreditCard/credit-cards.type';

export const creditCardListAtom = atom({
    key: 'creditCardList',
    default: <CreditCardDto[]>[],
});

// 카드 sign 정보
export const creditCardSignAtom = atom({
    key: 'creditCardSignAtom',
    default: <CreditCardSecretInfo>{},
});
