import {atom, selector} from 'recoil';
import {CreditCardDto, CreditCardSecretInfo, FindAllCreditCardDto} from '^models/CreditCard/type';
import {creditCardApi} from '^models/CreditCard/api';
import {orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {pagedResourceAtom} from '^hooks/usePagedResource';

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

export const creditCardListResultAtom = pagedResourceAtom<CreditCardDto, FindAllCreditCardDto>({
    key: 'creditCardListResultAtom',
});

// 자산 > 결제수단 > 목록 페이지 테이블
export const creditCardListForCreditCardListPageAtom = pagedResourceAtom<CreditCardDto, FindAllCreditCardDto>({
    key: 'creditCardListForCreditCardListPageAtom',
});
