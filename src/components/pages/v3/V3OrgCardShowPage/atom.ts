import {atom} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo} from '^types/credit-cards.type';
import {ProductDto} from '^types/product.type';

export const creditCardListAtom = atom({
    key: 'creditCardList',
    default: <CreditCardDto[]>[],
});

// 카드 sign 정보
export const creditCardSignAtom = atom({
    key: 'creditCardSignAtom',
    default: <CreditCardSecretInfo>{},
});

// 카드 앱 정보
export const selectedAppsAtom = atom({
    key: 'selectedAppsAtom',
    default: <ProductDto[]>[],
});
