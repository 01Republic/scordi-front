import {atom, selector} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo} from '^models/CreditCard/credit-cards.type';
import {creditCardApi} from '^api/credit-cards.api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';

export const cardIdParamState = atom<number | null>({
    key: 'cardIdAtom',
    default: null,
});

export const currentCreditCardAtom = atom<CreditCardDto>({
    key: 'currentCreditCardAtom',
    default: {} as CreditCardDto,
});

export const creditCardListAtom = atom({
    key: 'creditCardList',
    default: <CreditCardDto[]>[],
});

// 카드 sign 정보
export const creditCardSignAtom = atom({
    key: 'creditCardSignAtom',
    default: <CreditCardSecretInfo>{},
});

export const creditCardListSelector = selector({
    key: 'creditCardListSelector',
    get: () => {
        const orgId = useRouterIdParamState('orgId', orgIdParamState);

        const res = creditCardApi.index(orgId).then((res) => res.data.items);

        return res;
    },
});
