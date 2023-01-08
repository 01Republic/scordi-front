import {useRecoilValue} from 'recoil';
import {getBillingHistoriesQuery, getBillingHistoryQuery, getBillingSchedulesQuery} from '^atoms/billingHistories.atom';

export const useBillingSchedules = () => useRecoilValue(getBillingSchedulesQuery);
export const useBillingHistories = () => useRecoilValue(getBillingHistoriesQuery);
export const useBillingHistory = () => useRecoilValue(getBillingHistoryQuery);
