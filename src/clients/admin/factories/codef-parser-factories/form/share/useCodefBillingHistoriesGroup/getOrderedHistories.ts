import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';

export function getOrderedHistories(codefBillingHistories: CodefBillingHistoryDto[], direct: 'ASC' | 'DESC' = 'ASC') {
    return codefBillingHistories.slice().sort((a, b) => {
        if (direct === 'DESC') {
            return b.usedAt.getTime() - a.usedAt.getTime(); // asc
        } else {
            return a.usedAt.getTime() - b.usedAt.getTime(); // asc (default)
        }
    });
}
