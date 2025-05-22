import {useState} from 'react';
import {GroupingMethod} from '^admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {CodefBillingHistoriesGroup} from './types';
import {makeGroupByDate} from './makeGroupByDate';
import {makeGroupByBankAccount} from './makeGroupByBankAccount';

export * from './types';

/**
 * 계좌파서 > 그룹화 로직 핸들러
 */
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
                setData(makeGroupByBankAccount(codefBillingHistories, method, fixedRecurringType));
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
