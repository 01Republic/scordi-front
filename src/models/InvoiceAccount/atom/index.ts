import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';

export const invoiceAccountListAtom = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountListAtom',
});

// 구독상세모달에서, 해당 구독에 연결된 인보이스 계정 리스트를 보여줄 때 사용
export const invoiceAccountsOfSubscription = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountsOfSubscription',
});

// 인보이스계정 선택 모달에서, 선택할 수 있는 인보이스 계정 리스트를 보여줄 때 사용
export const invoiceAccountsInSelectModal = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountsInSelectModal',
});
