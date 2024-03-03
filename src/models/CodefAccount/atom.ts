import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {atom} from 'recoil';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const codefAccountsInConnector = pagedResourceAtom<CodefAccountDto, FindAllAccountQueryDto>({
    key: 'codefAccountsInConnector',
});

export const codefAccountAtom = atom<CodefAccountDto | null>({
    key: 'codefAccountAtom',
    default: null,
});
