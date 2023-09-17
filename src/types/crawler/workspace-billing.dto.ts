import {BillingCycleTerm} from '^types/subscriptionBillingCycle.type';
import {CurrencyDto} from '^types/crawler/currency.dto';

export class WorkspaceBillingDto {
    planName!: string;
    currentCycleBillAmount!: CurrencyDto;
    nextPaymentDue!: string;
    cycleTerm!: BillingCycleTerm | null;
    isFreeTier!: boolean;
    isPerUser!: boolean;
    paidMemberCount!: number;
    usedMemberCount!: number;
    unitPrice!: CurrencyDto | null;
    billingInfoPageUrl!: string;
    planComparePageUrl!: string;
    upgradePlanPageUrl!: string;
    updatePayMethodUrl!: string;

    getWorkspaceInfo() {
        return {
            billingInfoPageUrl: this.billingInfoPageUrl,
            planComparePageUrl: this.planComparePageUrl,
            upgradePlanPageUrl: this.upgradePlanPageUrl,
            updatePayMethodUrl: this.updatePayMethodUrl,
        };
    }
}
