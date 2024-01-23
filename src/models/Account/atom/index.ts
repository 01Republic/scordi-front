import {pagedResourceAtom} from '^hooks/usePagedResource';
import {AccountDto, FindAllAccountsQueryDto} from '^models/Account/types';

export const accountListAtom = pagedResourceAtom<AccountDto, FindAllAccountsQueryDto>({
    key: 'accountListAtom',
});

// 구독상세모달에서, 해당 구독에 연결된 계정 리스트를 보여줄 때 사용
export const accountsOfSubscriptionAtom = pagedResourceAtom<AccountDto, FindAllAccountsQueryDto>({
    key: 'accountsOfSubscriptionAtom',
});
