import {pagedResourceAtom} from '^hooks/usePagedResource';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';

export const accountListAtom = pagedResourceAtom<AccountDto, FindAllAccountsQueryDto>({
    key: 'accountListAtom',
});
