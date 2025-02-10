import {atom} from 'recoil';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';

// 어드민 / 연동관리 / 카드 / 카드목록 페이지에서 특정 계정을 기준으로 카드목록 필터링시 사용
export const selectedCodefAccountAtom = atom<CodefAccountDto | undefined>({
    key: 'admin/codef-cards/selectedCodefAccountAtom',
    default: undefined,
});

// 어드민 / 연동관리 / 카드 / 카드내역 페이지에서 특정 카드를 기준으로 결제내역 필터링시 사용
export const selectedCodefCardAtom = atom<CodefCardDto | undefined>({
    key: 'admin/codef-billing-histories/selectedCodefCardAtom',
    default: undefined,
});
