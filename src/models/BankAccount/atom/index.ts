import {pagedResourceAtom} from '^hooks/usePagedResource';
import {BankAccountDto, FindAllBankAccountQueryDto} from '^models/BankAccount/type';

export const bankAccountListResultAtom = pagedResourceAtom<BankAccountDto, FindAllBankAccountQueryDto>({
    key: 'bankAccountListResultAtom',
});
