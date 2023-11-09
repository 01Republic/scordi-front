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
