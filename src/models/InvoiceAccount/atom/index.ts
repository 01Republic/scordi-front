import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';
import {pagedResourceAtom} from '^hooks/usePagedResource';
import {atom} from 'recoil';

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

// 인보이스계정 생성 모달에서, 이미 등록된 인보이스 계정인지 확인 할 때 사용
export const invoiceAccountsSearchAtom = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountsSearchAtom',
});

/** 구독 불러오기 (연동페이지) 에서, 연결된 지메일 인보이스 계정 리스트를 보여줄 때 사용 */
export const invoiceAccountsInConnector = pagedResourceAtom<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>({
    key: 'invoiceAccountsInConnector',
});
