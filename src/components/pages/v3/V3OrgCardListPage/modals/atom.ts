import {atom} from 'recoil';
import {CreateCreditCardDto, CreditCardDto, UpdateCreditCardDto} from '^models/CreditCard/credit-cards.type';

export const createCreditCardDtoAtom = atom<CreateCreditCardDto>({
    key: 'createCreditCardDtoAtom',
    default: {} as CreateCreditCardDto,
});

export const updateCreditCardDtoAtom = atom<UpdateCreditCardDto>({
    key: 'updateCreditCardDtoAtom',
    default: {} as UpdateCreditCardDto,
});
