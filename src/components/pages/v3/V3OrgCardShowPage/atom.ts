import {SubscriptionDto} from '^types/subscription.type';
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

// 선택된 앱 정보
export const selectedAppsAtom = atom({
    key: 'selectedAppsAtom',
    default: <ProductDto[]>[],
});

export const subscriptionsAtom = atom({
    key: 'subscriptionsAtom',
    default: <SubscriptionDto[]>[],
});
