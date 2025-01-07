//대시보드 - 결제수단 섹션에서 워크스페이스 결제수단 목록 불러오기
import {FromToQueryDto} from '^types/billing.type';
import {useQuery} from '@tanstack/react-query';
import {dashboardApi} from '^models/_dashboard/api';
import {getToday} from '^utils/dateTime';

//대시보드 - 결제수단 섹션
export const usePaymentMethodListInDashboard = (orgId: number, params?: FromToQueryDto) => {
    const defaultFrom = new Date(getToday().getFullYear(), getToday().getMonth(), 1, 12);

    const finalParams: FromToQueryDto = {
        from: params?.from || defaultFrom,
        to: params?.to || getToday(),
    };

    return useQuery({
        queryKey: ['paymentMethods', orgId],
        queryFn: () => dashboardApi.creditCardsSection(orgId, finalParams).then((res) => res.data),
        enabled: !!orgId || !isNaN(orgId),
    });
};
