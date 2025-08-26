import {pagedResourceAtom} from '^hooks/usePagedResource';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {FindAllAccountQueryDto} from '^models/CodefAccount/type/find-all-account.query.dto';
import {atom} from 'recoil';

/** 구독 불러오기 (연동페이지) 에서, 연결된 카드사 계정 리스트를 보여줄 때 사용 */
export const codefAccountsInConnector = pagedResourceAtom<CodefAccountDto, FindAllAccountQueryDto>({
    key: 'codefAccountsInConnector',
});

/** 구독 불러오기 (연동페이지) 계정등록 페이지 입력 폼 에서, 카드사 계정 연결 여부를 체크 할 때 사용 */
export const codefAccountsAlreadyIs = pagedResourceAtom<CodefAccountDto, FindAllAccountQueryDto>({
    key: 'codefAccountsAlreadyIs',
});

export const codefAccountAtom = atom<CodefAccountDto | null>({
    key: 'codefAccountAtom',
    default: null,
});
