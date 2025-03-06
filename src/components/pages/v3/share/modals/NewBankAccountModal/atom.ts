import {atom} from 'recoil';
import {CreateBankAccountRequestDto, UpdateBankAccountRequestDto} from '^models/BankAccount/type';

export const createBankAccountDtoAtom = atom<CreateBankAccountRequestDto>({
    key: 'createBankAccountDtoAtom',
    default: {} as CreateBankAccountRequestDto,
});

export const updateBankAccountDtoAtom = atom<UpdateBankAccountRequestDto>({
    key: 'updateBankAccountDtoAtom',
    default: {} as UpdateBankAccountRequestDto,
});
