import {SubscriptionSummaryIndexDto} from '^models/SubscsriptionSummary/types';
import {summaryAtom} from '^hooks/useSummary';
import {atom} from 'recoil';

export const dashboardSubscriptionSummaryAtom = summaryAtom<SubscriptionSummaryIndexDto>(
    'dashboardSubscriptionSummaryAtom',
);

export const subscriptionListSummaryAtom = {
    resultAtom: atom<SubscriptionSummaryIndexDto>({
        key: `subscriptionListSummaryAtom/resultAtom`,
        default: {} as SubscriptionSummaryIndexDto,
    }),

    isLoadingAtom: atom<boolean>({
        key: `subscriptionListSummaryAtom/isLoadingAtom`,
        default: false,
    }),
};
