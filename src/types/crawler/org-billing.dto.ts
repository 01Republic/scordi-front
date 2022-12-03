import {BillingCycleTerm} from '^types/applicationBillingCycle.type';
import {CurrencyDto} from '^types/crawler/currency.dto';

export class OrgBillingDto {
    planName!: string;
    currentCycleBillAmount!: CurrencyDto;
    nextPaymentDue!: string;
    cycleTerm!: BillingCycleTerm | null;
    isFreeTier!: boolean;
    isPerUser!: boolean;
    paidMemberCount!: number;
    usedMemberCount!: number;
    unitPrice!: CurrencyDto | null;
}
