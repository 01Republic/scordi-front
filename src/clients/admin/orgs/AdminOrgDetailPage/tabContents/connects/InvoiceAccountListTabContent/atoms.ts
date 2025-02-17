import {atom} from 'recoil';
import {InvoiceAccountDto} from '^models/InvoiceAccount/type';

// 어드민 / 연동관리 / 결제메일 / 청구서계정목록 페이지에서 특정 계정을 기준으로 이메일목록 필터링시 사용
export const selectedInvoiceAccountAtom = atom<InvoiceAccountDto | undefined>({
    key: 'admin/invoice-accounts/selectedInvoiceAccountAtom',
    default: undefined,
});
