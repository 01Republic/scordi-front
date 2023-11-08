import {atom, selector} from 'recoil';
import {CreateCreditCardDto, CreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/credit-cards.type';
import {cardIdParamState, orgIdParamState, useRouterIdParamState} from '^atoms/common';
import {creditCardApi} from '^api/credit-cards.api';

export const createCreditCardDtoAtom = atom<CreateCreditCardDto>({
    key: 'createCreditCardDtoAtom',
    default: {} as CreateCreditCardDto,
});

export const updateCreditCardDtoAtom = atom<UpdateCreditCardDto>({
    key: 'updateCreditCardDtoAtom',
    default: {} as UpdateCreditCardDto,
});

export const currentCreditCardAtom = atom<CreditCardDto>({
    key: 'currentCreditCardAtom',
    default: {} as CreditCardDto,
});

export const currentCreditCardSelector = selector<CreditCardDto>({
    key: 'currentCreditCardSelector',
    get: async () => {
        const orgId = useRouterIdParamState('orgId', orgIdParamState);
        const cardId = useRouterIdParamState('cardId', cardIdParamState);

        try {
            // 현재 카드 정보 가져오기
            const res = await creditCardApi.show(orgId, cardId);
            return res.data;
        } catch (error) {
            throw error;
        }
    },
});
