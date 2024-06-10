import {FindAllInvoiceAccountQueryDto, InvoiceAccountDto} from '^models/InvoiceAccount/type';

import {PagedResourceAtoms, usePagedResource} from '^hooks/usePagedResource';
import {invoiceAccountApi} from '../api';
import {
    invoiceAccountListAtom,
    invoiceAccountsInConnector,
    invoiceAccountsInSelectModal,
    invoiceAccountsOfSubscription,
    invoiceAccountsSearchAtom,
} from '../atom';

export const useInvoiceAccounts = () => useInvoiceAccountsV3(invoiceAccountListAtom);

// 구독상세모달에서, 해당 구독에 연결된 인보이스 계정 리스트를 보여줄 때 사용
export const useInvoiceAccountsOfSubscription = () => useInvoiceAccountsV3(invoiceAccountsOfSubscription);

// 인보이스계정 선택 모달에서, 선택할 수 있는 인보이스 계정 리스트를 보여줄 때 사용
export const useInvoiceAccountListInSelectModal = () => useInvoiceAccountsV3(invoiceAccountsInSelectModal);

// 인보이스계정 생성 모달에서, 이미 등록된 인보이스 계정인지 확인 할 때 사용
export const useInvoiceAccountsSearch = () => useInvoiceAccountsV3(invoiceAccountsSearchAtom);

/** 구독 불러오기 (연동페이지) 에서, 연결된 지메일 인보이스 계정 리스트를 보여줄 때 사용 */
export const useInvoiceAccountListInConnector = () => useInvoiceAccountsV3(invoiceAccountsInConnector);

const useInvoiceAccountsV3 = (
    atoms: PagedResourceAtoms<InvoiceAccountDto, FindAllInvoiceAccountQueryDto>,
    mergeMode = false,
) => {
    return usePagedResource(atoms, {
        useOrgId: true,
        endpoint: (params, orgId) => invoiceAccountApi.index(orgId, params),
        getId: 'id',
        mergeMode,
    });
};

export * from './useInvoiceAccountCreate';
