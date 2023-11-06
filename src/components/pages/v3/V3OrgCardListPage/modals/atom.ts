import {atom} from 'recoil';
import {CreateCreditCardDto, CreditCardDto, UpdateCreditCardDto} from '^types/credit-cards.type';

// TODO: [to.진경님] 여기 있는 각각의 모달 관련 아톰들,
//  자기 해당하는 모달 폴더 내에 아톰파일들로 분리되어있는게 낫지 않나욥??
//  고민이 되긴 하는데 ㅎㅎ

export const inputCardNumberModal = {
    isShowAtom: atom({
        key: 'v3/inputCardNumberModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardNumberModal',
};

export const selectCardCompanyModal = {
    isShowAtom: atom({
        key: 'v3/selectCardCompanyModal',
        default: false,
    }),
    popStateSyncKey: 'selectCardCompanyModal',
};

export const inputCardNameModal = {
    isShowAtom: atom({
        key: 'v3/inputCardNameModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardNameModal',
};

export const inputCardHoldingMemberModal = {
    isShowAtom: atom({
        key: 'v3/inputCardHoldingMemberModal',
        default: false,
    }),
    popStateSyncKey: 'inputCardHoldingMemberModal',
};

export const selectAppModal = {
    isShowAtom: atom({
        key: 'v3/selectAppModal',
        default: false,
    }),
    popStateSyncKey: 'selectAppModal',
};

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
