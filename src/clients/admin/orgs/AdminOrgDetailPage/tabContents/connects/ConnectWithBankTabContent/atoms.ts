import {atom} from 'recoil';
import {CodefAccountDto} from '^models/CodefAccount/type/CodefAccountDto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

// 어드민 / 연동관리 / 계좌 / 계좌목록 페이지에서 특정 계정을 기준으로 계좌목록 필터링시 사용
export const selectedCodefAccountAtom = atom<CodefAccountDto | undefined>({
    key: 'admin/codef-bank-accounts/selectedCodefAccountAtom',
    default: undefined,
});

// 어드민 / 연동관리 / 계좌 / 거래내역 페이지에서 특정 계좌를 기준으로 결제내역 필터링시 사용
export const selectedCodefBankAccountAtom = atom<CodefBankAccountDto | undefined>({
    key: 'admin/codef-billing-histories/selectedCodefBankAccountAtom',
    default: undefined,
});
