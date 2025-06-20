import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';
import {FindAllBankAccountAdminQueryDto} from '^models/CodefBankAccount/type/find-all.bank-account.query.dto';

export const codefBankAccountsAdminAtom = pagedResourceAtom<CodefBankAccountDto, FindAllBankAccountAdminQueryDto>({
    key: 'codefBankAccountsAdminAtom',
});
