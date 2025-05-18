import {CodefCardDto} from '^models/CodefCard/type/CodefCard.dto';
import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {GroupingMethod} from '../../../CodefParserFactory/CreateCodefParserDto';

export interface CodefBillingHistoriesGroup {
    metadata: {
        groupKey: string;
        groupMethod: GroupingMethod;
        codefCardId: number;
        codefCard: CodefCardDto;
        billingCycleType: BillingCycleOptions;
    };
    entries: CodefBillingHistoryDto[];
}

export interface GroupContainerKey {
    codefCardId: number;
    groupKey: string;
}
