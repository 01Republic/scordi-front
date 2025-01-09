import {api} from '^api/api';
import {FromToQueryDto} from '^types/billing.type';
import {DashboardCreditCardsSectionResultDto, DashboardInvoiceAccountsSectionResultDto} from '^models/_dashboard/type';
import {oneDtoOf} from '^types/utils/response-of';

export const dashboardApi = {
    // 결제수단 섹션 데이터 조회
    creditCardsSection(orgId: number, params: FromToQueryDto) {
        const url = `/dashboard/${orgId}/sections/credit-cards`;
        const ResultDto = DashboardCreditCardsSectionResultDto;
        return api.get<DashboardCreditCardsSectionResultDto>(url, {params}).then(oneDtoOf(ResultDto));
    },

    // 청구서계정 섹션 데이터 조회
    invoiceAccountsSection(orgId: number, params: FromToQueryDto) {
        const url = `/dashboard/${orgId}/sections/invoice-accounts`;
        const ResultDto = DashboardInvoiceAccountsSectionResultDto;
        return api.get<DashboardInvoiceAccountsSectionResultDto>(url, {params}).then(oneDtoOf(ResultDto));
    },
};
