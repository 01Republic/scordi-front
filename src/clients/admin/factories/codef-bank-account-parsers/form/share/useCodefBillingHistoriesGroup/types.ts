import {BillingCycleOptions} from '^models/Subscription/types/BillingCycleOptions';
import {CodefBillingHistoryDto} from '^models/CodefBillingHistory/type';
import {GroupingMethod} from '^clients/admin/factories/codef-parser-factories/CodefParserFactory/CreateCodefParserDto';
import {CodefBankAccountDto} from '^models/CodefBankAccount/type/CodefBankAccount.dto';

export interface CodefBillingHistoriesGroup {
    metadata: {
        groupKey: string;
        groupMethod: GroupingMethod;
        codefBankAccountId: number;
        codefBankAccount: CodefBankAccountDto;
        billingCycleType: BillingCycleOptions;
    };
    entries: CodefBillingHistoryDto[];
}

export interface GroupContainerKey {
    codefBankAccountId: number;
    groupKey: string;
}
