import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {getOrderedHistories} from './getOrderedHistories';

export function getRecurringType(codefBillingHistories: CodefBillingHistoryDto[]) {
    const [later, earlier] = getOrderedHistories(codefBillingHistories, 'DESC');

    if (!earlier) return BillingCycleOptions.Onetime;

    const d1 = earlier.usedAt;
    const d2 = later.usedAt;

    const yearDiff = d2.getFullYear() - d1.getFullYear();
    const monthDiff = d2.getMonth() - d1.getMonth() + yearDiff * 12;

    if (monthDiff === 12) return BillingCycleOptions.Yearly;
    if ([1, 2].includes(monthDiff)) return BillingCycleOptions.Monthly;

    return BillingCycleOptions.None;
}
