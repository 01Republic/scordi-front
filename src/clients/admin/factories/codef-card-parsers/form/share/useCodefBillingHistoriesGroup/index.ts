import {useState} from 'react';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBillingHistoriesGroup} from './types';
import {makeGroupByDate} from './makeGroupByDate';
import {makeGroupByCard} from './makeGroupByCard';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {GroupingMethod} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';

export * from './types';

export function useCodefBillingHistoriesGroup() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<CodefBillingHistoriesGroup[]>([]);

    const run = (
        codefBillingHistories: CodefBillingHistoryDto[],
        method: GroupingMethod,
        fixedRecurringType?: BillingCycleOptions,
    ) => {
        setIsLoading(true);
        switch (method) {
            case GroupingMethod.byMessage:
                break;
            case GroupingMethod.byCard:
                setData(makeGroupByCard(codefBillingHistories, method, fixedRecurringType));
                break;
            case GroupingMethod.byDate:
            default:
                setData(makeGroupByDate(codefBillingHistories, method));
                break;
        }
        setIsLoading(false);
    };

    return {isLoading, data, run};
}
