import {atom} from 'recoil';
import {CreditCardDto} from '^models/CreditCard/type';
import {BankAccountDto} from '^models/BankAccount/type';

export const connectedAssetsAtom = atom<(CreditCardDto | BankAccountDto)[]>({
    key: 'subscriptions/connections/connectedAssets',
    default: [],
});
