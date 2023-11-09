import {atom, selector} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo} from '^models/CreditCard/credit-cards.type';
import {creditCardApi} from '^api/credit-cards.api';
import {orgIdParamState, useRouterIdParamState, useRouterParamState} from '^atoms/common';

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