import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';

// export function getRecurringType(codefBillingHistories: CodefBillingHistoryDto[]) {
//     const [later, earlier] = getOrderedHistories(codefBillingHistories, 'DESC');
//
//     if (!earlier) return BillingCycleOptions.Onetime;
//
//     const d1 = earlier.usedAt;
//     const d2 = later.usedAt;
//
//     const yearDiff = d2.getFullYear() - d1.getFullYear();
//     const monthDiff = d2.getMonth() - d1.getMonth() + yearDiff * 12;
//
//     if (monthDiff === 12) return BillingCycleOptions.Yearly;
//     if ([1, 2].includes(monthDiff)) return BillingCycleOptions.Monthly;
//
//     return BillingCycleOptions.None;
// }

// 계좌내역의 반복결제 주기성 추론
export function getRecurringType(codefBillingHistories: CodefBillingHistoryDto[]): BillingCycleOptions {
    const dates = codefBillingHistories.map((h) => h.usedAt);

    // 날짜가 없으면 기타로 판단
    if (dates.length === 0) return BillingCycleOptions.None;

    // 하나만 있으면 일회성
    if (dates.length === 1) return BillingCycleOptions.Onetime;

    // 날짜를 오름차순으로 정렬
    const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());

    // 날짜 간격(일 단위) 계산
    const intervals: number[] = [];
    for (let i = 1; i < sortedDates.length; i++) {
        const diffMs = sortedDates[i].getTime() - sortedDates[i - 1].getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        intervals.push(diffDays);
    }

    // 평균 간격 계산
    const avg = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;

    // 표준편차 계산
    const stdDev = Math.sqrt(intervals.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / intervals.length);

    // 월간 판단: 평균이 28~32일, 표준편차 작음
    const isMonthly = avg >= 28 && avg <= 32 && stdDev <= 5;

    // 연간 판단: 평균이 360~370일, 표준편차 작음
    const isYearly = avg >= 360 && avg <= 370 && stdDev <= 10;

    if (isMonthly) return BillingCycleOptions.Monthly;
    if (isYearly) return BillingCycleOptions.Yearly;

    return BillingCycleOptions.None;
}
